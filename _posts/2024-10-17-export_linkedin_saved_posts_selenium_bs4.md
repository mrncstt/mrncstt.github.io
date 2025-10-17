---
title: Export your LinkedIn saved posts with Selenium and Beautiful Soup
description: Export your LinkedIn saved posts with Selenium and Beautiful Soup
date: 2025-10-10
categories: [tech, vs code, selenium, beautiful soup, linkedin]
tags: [tech, vs code, selenium, beautiful soup, linkedin]
---

##  Export your LinkedIn saved posts with Selenium and Beautiful Soup


We save things “to read later” and… rarely return. LinkedIn’s **Saved posts** helps, but curation inside the app can get messy. This walkthrough shows how to open your account, visit **Saved posts**, scroll the page, extract **author, link, text, and date**, and export everything to **CSV** and your reading list becomes searchable, shareable data.



![](https://i.imgflip.com/5w6kg5.jpg)
(same thing happens with ‘save to read latter’)

## What you will build
-  A Python script that opens a real Chrome window
-  You log in manually with your normal account and 2FA or passkeys
-  The script goes to your Saved posts
-  It scrolls to load items and collects titles authors links and snippets
-  It writes a clean CSV

Without structure, saved items sprawl. Automation helps you consolidate and search.

## Install the following:

-  **Python**: [python.org](https://www.python.org/downloads/)
-  **Selenium 4+**: [selenium.dev](https://www.selenium.dev/) (Selenium Manager auto-installs the browser driver)
-  **Beautiful Soup (bs4)**: [docs](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
-  **pandas**: [pandas.pydata.org](https://pandas.pydata.org/)
-  ** Use this link to your saved posts: https://www.linkedin.com/my-items/saved-posts/


## Important guardrails
- Respect LinkedIn rules. The platform forbids scraping and automated activity that abuses the service. This walkthrough is for personal archiving of your own Saved list with a human logging in. Do not run it unattended or at scale.
- Prefer headed mode for login and consent flows. If you later automate in CI test headless with care.
- Expect selectors to change over time. We rely on links and visible text to reduce breakage.


Install via pip:

```sh
pip install selenium beautifulsoup4 pandas
```

If you need a manual driver for edge cases, see [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/).

For editing, try **VS Code**: [code.visualstudio.com](https://code.visualstudio.com/).

## Account Security

Keep **2FA enabled** on your LinkedIn account. Prefer manual login in the real browser instead of storing passwords in plain text. Review LinkedIn’s policies on [Automated Activity](https://www.linkedin.com/help/linkedin/answer/a1342669), the [User Agreement](https://www.linkedin.com/legal/user-agreement), and how to [download your data](https://www.linkedin.com/psettings/member-data).

## The script!

Open LinkedIn, log in, visit **Saved posts**, scroll to load everything, extract fields, and export to CSV.



```python
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

def new_driver(headless=False):
    opts = webdriver.ChromeOptions()
    if headless:
        opts.add_argument("--headless=new")
    opts.add_argument("--window-size=1280,900")
    return webdriver.Chrome(options=opts)

def wait_for(driver, condition, timeout=30):
    return WebDriverWait(driver, timeout).until(condition)

def scroll_to_bottom(driver, max_idle=5, delay=1.6):
    last = driver.execute_script("return document.scrollingElement.scrollHeight")
    idle = 0
    while idle < max_idle:
        driver.execute_script("window.scrollTo(0, document.scrollingElement.scrollHeight)")
        time.sleep(delay)
        new = driver.execute_script("return document.scrollingElement.scrollHeight")
        idle = idle + 1 if new == last else 0
        last = new

def extract_posts(html):
    soup = BeautifulSoup(html, "html.parser")
    items = []
    cards = soup.select('[data-urn*="activity"], article[role="article"], div.feed-shared-update-v2')
    for c in cards:
        a = c.select_one('a[href*="/in/"], a[href*="/company/"]')
        author = a.get_text(" ", strip=True) if a else ""
        post_link = ""
        for link in c.select('a[href*="/feed/update/"], a[href*="/posts/"]'):
            href = link.get("href") or ""
            if "/feed/update/" in href or "/posts/" in href:
                post_link = href.split("?")[0]
                break
        text = ""
        for cand in [c.select_one('[data-test-post-content]'),
                     c.select_one('div[aria-label]'),
                     c.select_one('span.break-words'),
                     c.select_one('p')]:
            if cand:
                text = cand.get_text(" ", strip=True)
                if text:
                    break
        t = c.find("time")
        date_raw = t.get("datetime") if (t and t.has_attr("datetime")) else (t.get_text(" ", strip=True) if t else "")
        if author or post_link or text:
            items.append({"author": author, "link": post_link, "text": text, "date": date_raw})
    seen = set()
    uniq = []
    for it in items:
        key = it.get("link") or (it.get("author", ""), it.get("text", "")[:50])
        if key in seen:
            continue
        seen.add(key)
        uniq.append(it)
    return uniq

def main():
    driver = new_driver()
    try:
        driver.get("https://www.linkedin.com/login")
        input("Complete login and 2FA in the browser, then press ENTER here...")
        driver.get("https://www.linkedin.com/my-items/saved-posts/")
        wait_for(driver, EC.presence_of_element_located((By.TAG_NAME, "main")))
        time.sleep(2)
        scroll_to_bottom(driver)
        html = driver.page_source
        with open("saved_posts_snapshot.html", "w", encoding="utf-8") as f:
            f.write(html)
        posts = extract_posts(html)
        pd.DataFrame(posts, columns=["author","link","text","date"]).to_csv("linkedin_saved_posts.csv", index=False, encoding="utf-8")
        print(f"OK: {len(posts)} posts → linkedin_saved_posts.csv")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
```

## Parsing HTML with BeautifulSoup

If you prefer to parse a saved HTML snapshot separately, load the file and reuse the same extraction logic. Element attributes can vary across accounts and time and **inspect the DOM** and adjust selectors when needed.

```python
from bs4 import BeautifulSoup
import pandas as pd

def extract_posts(html):
    soup = BeautifulSoup(html, "html.parser")
    items = []
    cards = soup.select('[data-urn*="activity"], article[role="article"], div.feed-shared-update-v2')
    for c in cards:
        a = c.select_one('a[href*="/in/"], a[href*="/company/"]')
        author = a.get_text(" ", strip=True) if a else ""
        post_link = ""
        for link in c.select('a[href*="/feed/update/"], a[href*="/posts/"]'):
            href = link.get("href") or ""
            if "/feed/update/" in href or "/posts/" in href:
                post_link = href.split("?")[0]
                break
        text = ""
        for cand in [c.select_one('[data-test-post-content]'),
                     c.select_one('div[aria-label]'),
                     c.select_one('span.break-words'),
                     c.select_one('p')]:
            if cand:
                text = cand.get_text(" ", strip=True)
                if text:
                    break
        t = c.find("time")
        date_raw = t.get("datetime") if (t and t.has_attr("datetime")) else (t.get_text(" ", strip=True) if t else "")
        if author or post_link or text:
            items.append({"author": author, "link": post_link, "text": text, "date": date_raw})
    seen = set()
    uniq = []
    for it in items:
        key = it.get("link") or (it.get("author", ""), it.get("text", "")[:50])
        if key in seen:
            continue
        seen.add(key)
        uniq.append(it)
    return uniq

with open("saved_posts_snapshot.html", "r", encoding="utf-8") as f:
    html = f.read()

posts = extract_posts(html)
pd.DataFrame(posts, columns=["author","link","text","date"]).to_csv("linkedin_saved_posts_from_snapshot.csv", index=False, encoding="utf-8")
print("Saved linkedin_saved_posts_from_snapshot.csv")

```



## What now?
With the CSV in hand, choose your next step, the foundation is already laid and rest is curiosity!



### Enjoyed this post? Get new ones by email: subscribe on Buttondown, no spam and unsubscribe anytime.
.
<div class="bd-subscribe my-5" role="region" aria-labelledby="bd-subscribe-title">
  <style>
    .bd-subscribe{margin:2rem 0;padding:1rem;border:1px solid;border-radius:12px;background:transparent;max-width:680px;color:inherit}
    .bd-subscribe *{box-sizing:border-box;font:inherit;color:inherit}
    .bd-subscribe h2{margin:0 0 .75rem;font-size:1.1rem;line-height:1.3}
    .bd-subscribe form{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
    .bd-subscribe .visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
    .bd-subscribe input[type="email"]{flex:1 1 260px;padding:.6rem .75rem;border:1px solid;border-radius:8px;background:transparent}
    .bd-subscribe input[type="email"]::placeholder{opacity:.65}
    .bd-subscribe input[type="submit"]{padding:.6rem .9rem;border:1px solid;border-radius:8px;background:transparent;cursor:pointer}
    .bd-subscribe p{margin:.5rem 0 0;font-size:.875rem;opacity:.85}
    @media (prefers-color-scheme:light){
      .bd-subscribe{border-color:rgba(0,0,0,.15)}
      .bd-subscribe input[type="email"],.bd-subscribe input[type="submit"]{border-color:rgba(0,0,0,.2)}
    }
    @media (prefers-color-scheme:dark){
      .bd-subscribe{border-color:rgba(255,255,255,.2)}
      .bd-subscribe input[type="email"],.bd-subscribe input[type="submit"]{border-color:rgba(255,255,255,.25)}
    }
  </style>

  <h2 id="bd-subscribe-title">Get new posts by email</h2>

  <form
    action="https://buttondown.com/api/emails/embed-subscribe/notasdaedicao"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://buttondown.com/notasdaedicao', 'popupwindow')"
    class="embeddable-buttondown-form"
    autocomplete="on"
  >
    <label for="bd-email" class="visually-hidden">Your email</label>
    <input
      type="email"
      name="email"
      id="bd-email"
      placeholder="you@example.com"
      inputmode="email"
      autocomplete="email"
      required
      aria-describedby="bd-subscribe-help"
    />
    <input type="submit" value="Subscribe" />
    <p id="bd-subscribe-help">No spam. Unsubscribe anytime.</p>
  </form>

  <noscript>
    <p>JavaScript is disabled. <a href="https://buttondown.com/notasdaedicao" target="_blank" rel="noopener">Subscribe on Buttondown</a>.</p>
  </noscript>

  <p style="margin-top:.25rem">
    <a href="https://buttondown.com/refer/notasdaedicao" target="_blank" rel="noopener">Powered by Buttondown</a>
  </p>
</div>



