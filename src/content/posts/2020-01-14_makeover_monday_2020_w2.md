---
title: Makeover Monday 2020 W/2
description: Makeover Monday 2020 W/2
date: 2020-01-14
slug: makeover-monday-2020-w2
tags: [makeover monday, data visualization, power bi]
---
Makeover Monday is a project in the form of a dashboard that is published by one of the participants and must be redone by anyone who wishes. The dataset example is published weekly on the website.

<div class="figure-block">

![Makeover Monday week 2 original dashboard about pesticide use](https://miro.medium.com/max/641/1*5K4uFM-b4QO7-Ezw_lSHlw.png)
<div class="figure-caption"><strong>Fig 1.</strong> Original visualization from Makeover Monday Week 2.</div>
</div>

#### The theme for week 2 is: Pesticide Use
The US lags behind other agricultural nations in banning harmful pesticides. Four of the world's largest agricultural producers are the USA, EU (European Union), China, and Brazil. Each has separate and distinct pesticide regulatory systems designed to protect, to varying degrees, humans and the environment. A 2016 survey found that 27.3% of pesticides used by the US, amounting to 328 million pounds (approximately 148.7 million kilograms), are banned in at least one of the other nations. There are 85 pesticid...

## Original Version

You can check out the original version here.

<div class="figure-block">

![Original pesticide use visualization](https://miro.medium.com/max/685/1*pE_EHv6m1C6WTcVd4vOnHQ.png)
<div class="figure-caption"><strong>Fig 2.</strong> Original pesticide use visualization for comparison.</div>
</div>

Good practices:
- Centralized comparison
- Simplified legend

## My Version
#### How did I develop it?

I chose Power BI because it is a tool I am more familiar with and for its ease of external access. The original measure of pesticide use was in pounds, so I performed the conversion by adding a column to give the result in kilograms.

<div class="figure-block">

![Power BI column conversion step](https://miro.medium.com/max/356/1*RgC0bgDYO3A5m077y__nVQ.png)
<div class="figure-caption"><strong>Fig 3.</strong> Column conversion step in Power BI for unit transformation.</div>
</div>

<div class="figure-block">

![Power BI development process](https://miro.medium.com/max/808/1*WvV_G9DdwcxeEODP3xDTrQ.png)
<div class="figure-caption"><strong>Fig 4.</strong> Power BI development process for the pesticide dashboard.</div>
</div>

## Result

<div class="figure-block">

![Final Power BI dashboard showing pesticide use by country](https://miro.medium.com/max/863/1*Kd5B_XwmWRczrdroMLENag.png)
<div class="figure-caption"><strong>Fig 5.</strong> Final Power BI dashboard showing pesticide use by country.</div>
</div>

I created measures using DAX to give the individual result using card elements. The formula is as follows:

```
brazil = CALCULATE(SUM(Countries[Kg. Pesticides Used in USA Agriculture]), Countries[Texto Após o Delimitador] = "BRA")
```

## Points I wanted to show:
- Result in kilograms
- Separate comparisons

## Links

- [Makeover Monday 2020 W2](https://data.world/makeovermonday/2020w2)
- [My Power BI visualization](https://app.powerbi.com/view?r=eyJrIjoiMDAzNDk0YzctNTZjZS00ZTM2LTg4NGUtZTkwZTJmYTg3NjUwIiwidCI6ImRjYmYyYTFmLTk1MzItNGQ1Ni1hYzQxLTU2MTVlMzhlNTBiNyJ9)
