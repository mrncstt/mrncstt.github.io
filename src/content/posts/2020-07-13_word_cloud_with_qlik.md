---
title: Turning memorial comments into a Qlik word cloud
description: Build a word cloud from real memorial messages using MySQL and Qlik
date: 2020-07-13
slug: word-cloud-with-qlik
tags: [qlik, mysql, data visualization]
---

#### Context

I was a data analyst at Grupo Morada, a company in the funeral sector that offers funeral services and products, cemetery services, and assistance plans. One of our projects was **Morada da Memória**, an online memorial with messages from family and friends. We wanted a fast way to see which words kept showing up so editors and managers could feel the tone of the stories.

<div class="figure-block">

![memorial](https://miro.medium.com/max/700/1*wEHOfAw9XC3ysz4lVacwag.png)
<div class="figure-caption"><strong>Fig 1.</strong> The Morada da Memoria online memorial interface.</div>
</div>

#### What I built

Inside the company we used Qlik as the main BI tool. We had recently moved from the old on-prem setup to Qlik's cloud. Full-text search across fields and better insight features made it easy to poke at the data without a wall of SQL.

<div class="figure-block">

![qlik interface](https://miro.medium.com/max/355/1*TvtbVl4wk7oXurjsE1rmYQ.png)
<div class="figure-caption"><strong>Fig 2.</strong> Qlik Sense interface used for the word cloud project.</div>
</div>

Plan:
- Pull memorial comments from MySQL
- Write a QVD for faster loads
- Split text into words
- Remove stopwords
- Count and visualize

#### Data prep

After connecting to MySQL and exporting to a QVD, I loaded the data into the app.

<div class="figure-block">

![qlik load](https://miro.medium.com/max/490/1*REkstcGUF6miOOrczergSw.png)
<div class="figure-caption"><strong>Fig 3.</strong> Data loading step in Qlik Sense from MySQL via QVD.</div>
</div>

Tokenizing used `SubField` on spaces plus `Trim` to clean leftovers. Accents and punctuation get in the way, so I normalized case and stripped basic punctuation first. A small custom stopword list did most of the work.

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

To power the chart, the counting expression was a plain set analysis over the cleaned field:

```qlik
// count words excluding a maintained list
count({< word -= {'and','of','the','a','an','de','da','do','e'} >} word)
```

#### Search and suggestions

Since early 2020, Qlik added stronger natural-language suggestions. That helped sanity-check the top terms and jump to the underlying stories when something odd popped up.

<div class="figure-block">

![nlp qlik](https://miro.medium.com/max/700/1*eojhz0x-ZlJmypJx_1r-rw.png)
<div class="figure-caption"><strong>Fig 4.</strong> Qlik Sense natural-language suggestions for search and insight exploration.</div>
</div>

#### What it looked like

I used a word cloud object to surface frequent words. It wasn't meant to replace deeper analysis, just a quick read on themes and the language people chose in their tributes.

<div class="figure-block">

![word cloud result](https://miro.medium.com/max/674/1*PMJZwpcV33OJSoZWeqvcpg.png)
<div class="figure-caption"><strong>Fig 5.</strong> Word cloud generated in Qlik Sense from memorial comments.</div>
</div>

We also tucked a small sentiment view into the same dashboard. That helped the team notice shifts in tone over time and chase down outliers when needed.

That was the build: simple, fast to load, and useful in daily conversations andter we planned to understand what people were mentioning so we could better understand the entulation process as the memorial grew.
