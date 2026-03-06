import re
import time
import json
from datetime import datetime, timedelta

import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

EARLY_STOP_ON_CUTOFF = True
HEADLESS = False

_REL_RE = re.compile(
    r"(?P<num>\d+)\s*(?P<unit>"
    r"yr|year|years|"
    r"mo|month|months|"
    r"w|week|weeks|"
    r"d|day|days|"
    r"h|hour|hours|"
    r"min|minute|minutes|"
    r"s|sec|second|seconds"
    r")\b",
    re.I,
)

def _bucket(text):
    if not text:
        return None
    t = text.replace("•", " ").strip()
    m = _REL_RE.search(t)
    if not m:
        return None
    n = int(m.group("num"))
    u = m.group("unit").lower()
    if u in ("yr", "year", "years"):
        return n, "yr"
    if u in ("mo", "month", "months"):
        return n, "mo"
    if u in ("w", "week", "weeks"):
        return n, "w"
    if u in ("d", "day", "days"):
        return n, "d"
    if u in ("h", "hour", "hours"):
        return n, "h"
    if u in ("min", "minute", "minutes"):
        return n, "min"
    if u in ("s", "sec", "second", "seconds"):
        return n, "s"
    return None

def _norm_label(text):
    b = _bucket(text)
    if not b:
        return ""
    n, u = b
    return f"{n}{u}"

def _label_months(label):
    b = _bucket(label)
    if not b:
        return 0
    n, u = b
    if u == "mo":
        return n
    if u == "yr":
        return 12 * n
    return 0  

def _approx_dt_from_label(label, now):
    b = _bucket(label)
    if not b:
        return None
    n, u = b
    if u == "yr":
        return now - timedelta(days=30 * 12 * n)
    if u == "mo":
        return now - timedelta(days=30 * n)
    if u == "w":
        return now - timedelta(weeks=n)
    if u == "d":
        return now - timedelta(days=n)
    if u == "h":
        return now - timedelta(hours=n)
    if u == "min":
        return now - timedelta(minutes=n)
    if u == "s":
        return now - timedelta(seconds=n)
    return None

def new_driver(headless=False):
    opts = webdriver.ChromeOptions()
    if headless:
        opts.add_argument("--headless=new")
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1280,900")
    return webdriver.Chrome(options=opts)

def wait_for(drv, cond, timeout=30):
    return WebDriverWait(drv, timeout).until(cond)

def _get_time_label_from_card(card):
    picks = []
    for s in card.select("p.t-black--light.t-12 > span[aria-hidden='true'], p.t-black--light.t-12 > span:first-child"):
        t = s.get_text(" ", strip=True)
        if t:
            picks.append(t)
    for t in card.find_all("time"):
        txt = t.get_text(" ", strip=True)
        if txt:
            picks.append(txt)
    for s in card.select("span.visually-hidden, span[aria-hidden='true']"):
        t = s.get_text(" ", strip=True)
        if t:
            picks.append(t)
    for p in card.select("p.t-black--light.t-12"):
        t = p.get_text(" ", strip=True)
        if t:
            picks.append(t)
    for raw in picks:
        if _bucket(raw):
            return _norm_label(raw)
    return ""

def _months_exceeded_in_dom(driver, months_limit):
    labels = driver.execute_script("""
        const ps = Array.from(document.querySelectorAll('p.t-black--light.t-12'));
        const tail = ps.slice(-80);
        return tail.map(p => {
            const s = p.querySelector('span[aria-hidden="true"]') || p.querySelector('span:first-child');
            const text = (s ? s.textContent : p.textContent) || '';
            return text.trim();
        });
    """)
    if not labels:
        return False
    for raw in labels:
        lab = _norm_label(raw)
        if _label_months(lab) > months_limit:
            return True
    return False

def scroll_to_bottom(driver, max_idle=5, delay=1.6, months_limit=None):
    last = driver.execute_script("return document.scrollingElement.scrollHeight")
    idle = 0
    while idle < max_idle:
        driver.execute_script("window.scrollTo(0, document.scrollingElement.scrollHeight)")
        time.sleep(delay)
        new = driver.execute_script("return document.scrollingElement.scrollHeight")
        idle = idle + 1 if new == last else 0
        last = new
        if EARLY_STOP_ON_CUTOFF and months_limit and months_limit > 0:
            if _months_exceeded_in_dom(driver, months_limit):
                driver.execute_script("window.scrollTo(0, document.scrollingElement.scrollHeight)")
                time.sleep(delay)
                break

_BAD_AUTHOR = re.compile(r"(Status is (off|on)line|View .*? profile)", re.I)

def _clean_author(s):
    s = _BAD_AUTHOR.sub("", s or "")
    s = re.sub(r"\s{2,}", " ", s)
    return s.strip()

def _author_from_card(card):
    for a in card.select('a[href*="/in/"]'):
        span = a.select_one('span[dir="ltr"]') or a.select_one('span')
        txt = (span.get_text(" ", strip=True) if span else a.get_text(" ", strip=True)) or ""
        txt = _clean_author(txt)
        if txt:
            return txt
    for a in card.select('a[href*="/company/"]'):
        span = a.select_one('span[dir="ltr"]') or a.select_one('span')
        txt = (span.get_text(" ", strip=True) if span else a.get_text(" ", strip=True)) or ""
        txt = _clean_author(txt)
        if txt:
            return txt
    return ""

def _text_from_card(card):
    def clean(t):
        t = re.sub(r"\s*(see more|ver mais)\s*$", "", t or "", flags=re.I)
        t = re.sub(r"\s{2,}", " ", t)
        return t.strip()

    roots = card.select(
        'div.update-components-text,'
        'div.feed-shared-update-v2__commentary,'
        'div.feed-shared-inline-show-more-text,'
        'div.update-components-entity__commentary,'
        'div.feed-shared-update-v2__description-wrapper,'
        'div[aria-label="Post content"]'
    )

    for root in roots:
        parts = []
        for s in root.select('span[aria-hidden="true"]'):
            t = s.get_text(" ", strip=True)
            if t:
                parts.append(t)
        if not parts:
            for s in root.select('span[dir="ltr"], span.break-words, p, li'):
                t = s.get_text(" ", strip=True)
                if t:
                    parts.append(t)
        if not parts:
            t = root.get_text(" ", strip=True)
            if t:
                parts.append(t)
        txt = clean(" ".join(parts))
        if txt:
            return txt

    cands = []
    for p in card.select("p"):
        cls = p.get("class") or []
        if "t-black--light" in cls and "t-12" in cls:
            continue
        t = p.get_text(" ", strip=True)
        if t:
            cands.append(t)
    for s in card.select('span[dir="ltr"], span.break-words'):
        t = s.get_text(" ", strip=True)
        if t:
            cands.append(t)
    if cands:
        txt = clean(max(cands, key=len))
        if txt not in {"Home", "My Network", "Jobs", "Messaging", "Notifications"}:
            return txt

    el = card.select_one('[data-test-post-content]')
    if el:
        return clean(el.get_text(" ", strip=True))
    return ""

def _is_real_post_card(card):
    if not card.select_one('p.t-black--light.t-12'):
        return False
    if not card.select_one('a[href*="/feed/update/"], a[href*="/posts/"], a[href*="/pulse/"]'):
        return False
    return True

def extract_posts(html, now, months_limit):
    soup = BeautifulSoup(html, "html.parser")
    items = []
    raw_cards = soup.select('li, article[role="article"], div.feed-shared-update-v2')
    cards = [c for c in raw_cards if _is_real_post_card(c)]

    for c in cards:
        label = _get_time_label_from_card(c)
        if months_limit and months_limit > 0:
            if _label_months(label) > months_limit:
                continue

        author = _author_from_card(c)
        text = _text_from_card(c)

        if text in {"Home", "My Network", "Jobs", "Messaging", "Notifications"}:
            continue

        link = ""
        for a in c.select('a[href*="/feed/update/"], a[href*="/posts/"], a[href*="/pulse/"]'):
            href = a.get("href") or ""
            if any(p in href for p in ("/feed/update/", "/posts/", "/pulse/")):
                link = href.split("?")[0]
                break

        approx = _approx_dt_from_label(label, now)
        items.append({
            "author": author,
            "link": link,
            "text": text,
            "date_label": label,
            "date_approx": (approx.date().isoformat() if approx else ""),
            "extracted_on": now.date().isoformat(),
        })

    seen, uniq = set(), []
    for it in items:
        key = it.get("link") or (it.get("author", ""), (it.get("text", "")[:50] if it.get("text") else ""))
        if key in seen:
            continue
        seen.add(key)
        uniq.append(it)
    return uniq

def ask_months_limit():
    while True:
        raw = input("How many months back? (0 = all!!!) e.g. 1 or 12: ").strip()
        if not raw:
            print("Enter a non-negative integer.")
            continue
        try:
            m = int(raw)
            if m < 0:
                print("Enter 0 or a positive integer.")
                continue
            return m
        except ValueError:
            print("Invalid number.")

def main():
    now = datetime.now()
    months = ask_months_limit()
    if months > 0:
        print(f"OK, up to {months} month(s) old (includes labels like '{months}mo' and '1yr' when months=12).")
    else:
        print("No month limit.")

    ts = now.strftime("%m_%d_%Y_%H_%M")
    base = f"linkedin_saved_posts_today_{ts}"
    csv_path = f"{base}.csv"
    json_path = f"{base}.json"

    driver = new_driver(headless=HEADLESS)
    try:
        driver.get("https://www.linkedin.com/login")
        input("Complete login and then press ENTER here...")
        driver.get("https://www.linkedin.com/my-items/saved-posts/")
        wait_for(driver, EC.presence_of_element_located((By.TAG_NAME, "main")), timeout=60)
        time.sleep(2)
        scroll_to_bottom(driver, max_idle=5, delay=1.6, months_limit=months if months > 0 else None)

        html = driver.page_source
        posts = extract_posts(html, now=now, months_limit=months if months > 0 else None)

        df = pd.DataFrame(posts, columns=["author","link","text","date_label","date_approx","extracted_on"])
        df.to_csv(csv_path, index=False, encoding="utf-8-sig")  # Excel-friendly UTF-8
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(posts, f, ensure_ascii=False, indent=2)

        print(f"{len(posts)} posts saved")
        print(f"CSV  -> {csv_path}")
        print(f"JSON -> {json_path}")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
