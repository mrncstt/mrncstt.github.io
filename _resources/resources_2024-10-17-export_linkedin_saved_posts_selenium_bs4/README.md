# Export LinkedIn Saved Posts (Selenium + BeautifulSoup)


### Start

```bash
python -m venv .venv
# Windows
.\.venv\Scripts\activate
pip install -r requirements.txt
python export_linkedin_saved_posts.py
```

### The script will:

- Ask: How many months back? (0 = no limit)
- Launches Chrome and takes you to the LinkedIn login page
- Opens your **Saved Posts**, scrolls to load content, and parses each post card.
- Stops when posts are older than the time window you choose.
- Saves structured data to `CSV` and `JSON` with a timestamped filename.


### Output

Files named like: 
```
linkedin_saved_posts_today_MM_DD_YYYY_HH_MM.csv
 - Columns: author, link, text, date_label, date_approx, extracted_on

linkedin_saved_posts_today_MM_DD_YYYY_HH_MM.json
```

### Assumptions

 - LinkedIn UI in English. Relative labels supported: 1d, 3w, 2mo, 1yr …
 - 12 months is treated equal to 1 year (months = 30 days). (approximations: mo +- 30d, yr = 12 * 30d)
 - Early stop when we detect labels older than the chosen months.
 - Dedup by post link (or author + text prefix) to avoid repeated cards.
 - Tested with Chrome + ChromeDriver 
 - The script launches a local browser for **you** to sign in credentials arent handled or stored by the script.



