---
title: turning memorial comments into a qlik word cloud
description: build using mysql and qlik, qlik word cloud from real memorial messages
date: 2020-07-13
categories: [qlik, mysql, data visualization]
tags: [qlik, mysql, data visualization]
---

#### context

i was a data analyst at grupo morada, a company in the funeral sector that offers funeral services and products, cemetery services, and assistance plans. one of our projects was **morada da memória**, an online memorial with messages from family and friends. we wanted a fast way to see which words kept showing up so editors and managers could feel the tone of the stories.

![memorial](https://miro.medium.com/max/700/1*wEHOfAw9XC3ysz4lVacwag.png)

#### what i built

inside the company we used qlik as the main bi tool. we had recently moved from the old on-prem setup to qlik’s cloud. full-text search across fields and better insight features made it easy to poke at the data without a wall of sql.

![qlik interface](https://miro.medium.com/max/355/1*TvtbVl4wk7oXurjsE1rmYQ.png)

plan:
- pull memorial comments from mysql  
- write a qvd for faster loads  
- split text into words  
- remove stopwords  
- count and visualize

#### data prep

after connecting to mysql and exporting to a qvd, i loaded the data into the app.

![qlik load](https://miro.medium.com/max/490/1*REkstcGUF6miOOrczergSw.png)

tokenizing used `subfield` on spaces plus `trim` to clean leftovers. accents and punctuation get in the way, so i normalized case and stripped basic punctuation first. a small custom stopword list did most of the work.

```qlik
// toy example of the idea
comments:
load
    lower(purgechar(comment_text, '.,;:!?()[]{}"''')) as clean_text,
    id
resident raw_comments;

// explode into one word per row
words:
load
    id,
    trim(subfield(clean_text, ' ', iterno())) as word
resident comments
while iterno() <= substrlen(clean_text);

// simple stopword table
stopwords:
load * inline [
word
and
of
the
a
an
de
da
do
e
];

// keep only words that are not stopwords and not empty
final_words:
left keep (words)
load word resident words where len(word) > 0;

anti join (final_words)
load word resident stopwords;
```

to power the chart, the counting expression was a plain set analysis over the cleaned field:

```qlik
// count words excluding a maintained list
count({< word -= {'and','of','the','a','an','de','da','do','e'} >} word)
```

#### search and suggestions

since early 2020, qlik added stronger natural-language suggestions. that helped sanity-check the top terms and jump to the underlying stories when something odd popped up.

![nlp qlik](https://miro.medium.com/max/700/1*eojhz0x-ZlJmypJx_1r-rw.png)

#### what it looked like

i used a word cloud object to surface frequent words. it wasn’t meant to replace deeper analysis, just a quick read on themes and the language people chose in their tributes.

![word cloud result](https://miro.medium.com/max/674/1*PMJZwpcV33OJSoZWeqvcpg.png)

we also tucked a small sentiment view into the same dashboard. that helped the team notice shifts in tone over time and chase down outliers when needed.

that was the build: simple, fast to load, and useful in daily conversations andter we planned to understand what people were mentioning so we could better understand the entulation process as the memorial grew.
