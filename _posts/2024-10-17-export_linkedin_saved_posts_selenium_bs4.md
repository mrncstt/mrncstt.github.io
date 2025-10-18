---
title: export your linkedin saved posts with selenium and beautiful soup
description: export your linkedin saved posts with selenium and beautiful soup
date: 2025-10-10
categories: [tech, vs code, selenium, beautiful soup, linkedin, python]
tags: [tech, vs code, selenium, beautiful soup, linkedin, python]
mermaid: true

---

##  export your linkedin saved posts with selenium and beautiful soup


we save things “to read later” and… rarely return. linkedin’s **saved items** helps, but curation inside the app can get messy. this walkthrough shows how to open your account, visit **saved items**, scroll the page, extract **author, link, text, and date**, and export everything to **csv** and **json** and your reading list becomes searchable and shareable data.



![](https://i.imgflip.com/5w6kg5.jpg)
```
(same thing happens with ‘save to read latter’)
```
## what it does

```mermaid
flowchart td
    a["start"] --> b["go to saved items"]
    b --> c["extract: author/link/text/date_label"]
    c --> d["compute date_approx"]
    d --> e["ask: months back"]
    e --> f{"older?"}
    f -- "no" --> g["scroll more"]
    g --> f
    f -- "yes" --> h["stop"]
    h --> i["deduplicate"]
    i --> j["write csv"]
    j --> k["write json"]
    k --> l["done"]
```


## assumptions and guardrails

- linkedin ui language is **english** (relative labels: `mo` for month, `yr` for year).
- csv uses **utf-8 with bom** so excel opens emojis and accents correctly.
- the script tries several [dom patterns](https://developer.mozilla.org/pt-br/docs/conflicting/web/api/document_object_model_a0b90593de4c5cb214690e823be115a18d605d4bc7719ba296e212da2abe18ef) to extract text/author across different post layouts.
- the platform forbids scraping and automated activity that abuses the service and this walkthrough is for personal archiving of your own saved items list with a human logging in (one of the reasons why im using an ""manual"" mode for login and consent flows).
- i suggest you to keep **2fa enabled** on your linkedin account. 
- expect selectors to change over time.

## installation and files

you need recent **python 3** and these packages:

```sh
pip install selenium beautifulsoup4 pandas
```
- everything (script, requirements, notes) lives in this folder:  
- [**`_resources/2024-10-17-export_linkedin_saved_posts_selenium_bs4`**](https://github.com/mrncstt/mrncstt.github.io/tree/main/_resources/2024-10-17-export_linkedin_saved_posts_selenium_bs4)
- selenium manager usually auto-installs the correct browser driver.  
- editor used: **vs code**.

  
## output schema

| column         | meaning                                                                 |
|----------------|-------------------------------------------------------------------------|
| `author`       | display name of the post author                                         |
| `link`         | canonical link to the post                                              |
| `text`         | main text that follows the post                    |
| `date_label`   | relative ui label (e.g., `2mo`, `1yr`, `3w`)                            |
| `date_approx`  | approximate absolute date computed from `date_label`                    |
| `extracted_on` | date you ran the export                                                 |






## what now?
with the csv/json you choose your next step, the foundation is already laid and rest is curiosity!



### enjoyed this post? get new ones by email:
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

  <h2 id="bd-subscribe-title">get new posts by email</h2>

  <form
    action="https://buttondown.com/api/emails/embed-subscribe/notasdaedicao"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://buttondown.com/notasdaedicao', 'popupwindow')"
    class="embeddable-buttondown-form"
    autocomplete="on"
  >
    <label for="bd-email" class="visually-hidden">your email</label>
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
    <input type="submit" value="subscribe" />
    <p id="bd-subscribe-help">no spam. unsubscribe anytime.</p>
  </form>

  <noscript>
    <p>javascript is disabled. <a href="https://buttondown.com/notasdaedicao" target="_blank" rel="noopener">subscribe on buttondown</a>.</p>
  </noscript>

  <p style="margin-top:.25rem">
    <a href="https://buttondown.com/refer/notasdaedicao" target="_blank" rel="noopener">powered by buttondown</a>
  </p>
</div>






