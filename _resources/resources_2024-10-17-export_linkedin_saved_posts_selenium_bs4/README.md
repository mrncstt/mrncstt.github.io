# export linkedin saved posts (selenium + beautifulsoup)


### start

```bash
python -m venv .venv
# windows
.\.venv\scripts\activate
pip install -r requirements.txt
python export_linkedin_saved_posts.py
```

### the script will:

- ask: how many months back? (0 = no limit)
- launches chrome and takes you to the linkedin login page
- opens your **saved posts**, scrolls to load content, and parses each post card.
- stops when posts are older than the time window you choose.
- saves structured data to `csv` and `json` with a timestamped filename.


### output

files named like: 
```
linkedin_saved_posts_today_mm_dd_yyyy_hh_mm.csv
 - columns: author, link, text, date_label, date_approx, extracted_on

linkedin_saved_posts_today_mm_dd_yyyy_hh_mm.json
```

### assumptions

 - linkedin ui in english. relative labels supported: 1d, 3w, 2mo, 1yr …
 - 12 months is treated equal to 1 year (months = 30 days). (approximations: mo +- 30d, yr = 12 * 30d)
 - early stop when we detect labels older than the chosen months.
 - dedup by post link (or author + text prefix) to avoid repeated cards.
 - tested with chrome + chromedriver 
 - the script launches a local browser for **you** to sign in credentials arent handled or stored by the script.



