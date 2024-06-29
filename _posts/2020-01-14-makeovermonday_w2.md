---
title: Makeover Monday 2020 W/2
description: Makeover Monday 2020 W/2
date: 2020-01-14
categories: [makeovermonday, dataviz, data visualization]
tags: [makeovermonday, dataviz, data visualization]
---
Makeover Monday is a project in the form of a dashboard that is published by one of the participants and must be redone by anyone who wishes. The dataset example is published weekly on the website.

![](https://miro.medium.com/max/641/1*5K4uFM-b4QO7-Ezw_lSHlw.png)

#### The theme for week 2 is: Pesticide Use
The US lags behind other agricultural nations in banning harmful pesticides. Four of the world's largest agricultural producers are the USA, EU (European Union), China, and Brazil. Each has separate and distinct pesticide regulatory systems designed to protect, to varying degrees, humans and the environment. A 2016 survey found that 27.3% of pesticides used by the US, amounting to 328 million pounds (approximately 148.7 million kilograms), are banned in at least one of the other nations. There are 85 pesticid...

## Original Version

You can check out the original version here.

![](https://miro.medium.com/max/685/1*pE_EHv6m1C6WTcVd4vOnHQ.png)

Good practices:
- Centralized comparison
- Simplified legend

## My Version
#### How did I develop it?

I chose Power BI because it is a tool I am more familiar with and for its ease of external access. The original measure of pesticide use was in pounds, so I performed the conversion by adding a column to give the result in kilograms.

![](https://miro.medium.com/max/356/1*RgC0bgDYO3A5m077y__nVQ.png)
![](https://miro.medium.com/max/808/1*WvV_G9DdwcxeEODP3xDTrQ.png)

## Result

![](https://miro.medium.com/max/863/1*Kd5B_XwmWRczrdroMLENag.png)

I created measures using DAX to give the individual result using card elements. The formula is as follows:

```
brazil = CALCULATE(SUM(Countries[Kg. Pesticides Used in USA Agriculture]), Countries[Texto Após o Delimitador] = "BRA")
```

## Points I wanted to show:
- Result in kilograms
- Separate comparisons

## Links
- The link to this week's Makeover Monday is [here](https://data.world/makeovermonday/2020w2).
- The link to my visualization made in Power BI is [here](https://app.powerbi.com/view?r=eyJrIjoiMDAzNDk0YzctNTZjZS00ZTM2LTg4NGUtZTkwZTJmYTg3NjUwIiwidCI6ImRjYmYyYTFmLTk1MzItNGQ1Ni1hYzQxLTU2MTVlMzhlNTBiNyJ9).
