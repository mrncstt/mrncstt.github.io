---
title: Word Cloud with Qlik
description: How to create a word cloud in Qlik
date: 2020-07-13
categories: [Qlik, dataviz, data visualization]
tags: [Qlik, dataviz, data visualization]
---
#### Contextualization

I worked as a data analyst at Grupo Morada, a company in the funeral sector that offers funeral services and products, cemetery services, and funeral assistance plans. Within the organization, there are various projects, and among them is "Morada da Memória," an online memorial that features stories from family and friends of loved ones who have passed away. Its goal is to preserve memories and perpetuate emotions.

![Memorial](https://miro.medium.com/max/700/1*wEHOfAw9XC3ysz4lVacwag.png)

#### How was it done?

At Grupo Morada, Qlik is used as a Business Intelligence tool. We migrated from the View version to Cloud. This version offers full-text search across all fields. Working with analysis has always meant visually interacting with the data.

But what if it were possible to directly ask questions and gain insights from the tool?

![Qlik Interface](https://miro.medium.com/max/355/1*TvtbVl4wk7oXurjsE1rmYQ.png)

Since the February 2020 version, there have been a series of improvements in NLP (natural language processing) mechanisms, developed to better detect patterns and generate more relevant suggestions. To achieve this, we thought of gaining insights from the comment fields on the Morada da Memória site to understand what people are saying most about their loved ones.

![NLP Qlik](https://miro.medium.com/max/700/1*eojhz0x-ZlJmypJx_1r-rw.png)

After connecting to the MySQL database and converting the data into a QVD file, the data was loaded into the application.

![Qlik Load](https://miro.medium.com/max/490/1*REkstcGUF6miOOrczergSw.png)

To split the words, I used the SubField function with a space (' ') parameter to divide each word, and TRIM to remove any extra spaces.

With the words separated, I created a script to count words that were not in a list of cohesive elements (e.g., and, the, or) that we created, as these would not be pertinent information at the moment.

```sql
=Count({<WORDS-={‘AND’,’OF’…}>}WORDS) | Formula for counting distinct words
```

We then inserted tags/keywords into the variable that performs the counting so it could also be used in the search field.

![Qlik Script](https://miro.medium.com/max/579/1*atSPDH3zOGeMUPGiRU6uqw.png)

#### Result

![Word Cloud Result](https://miro.medium.com/max/674/1*PMJZwpcV33OJSoZWeqvcpg.png)

Sentiment analysis of these words was performed as an additional topic within the dashboard where it is inserted, providing us with some very interesting ideas about how these memories are brought to mind.



