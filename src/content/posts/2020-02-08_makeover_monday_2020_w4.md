---
title: Makeover Monday 2020 W/4
description: Makeover Monday 2020 W/4
date: 2020-02-08
slug: makeover-monday-2020-w4
tags: [makeover monday, data visualization, power bi]
---
Makeover Monday is a project in the form of a dashboard that is published by one of the participants and must be redone by anyone who wishes. The dataset example is published weekly on the website.

<div class="figure-block">

![Makeover Monday week 4 original dashboard about Bridges to Prosperity](https://miro.medium.com/max/734/1*O9kL5tFTFYeHyK8dV2NOhg.png)
<div class="figure-caption"><strong>Fig 1.</strong> Original visualization from Makeover Monday Week 4.</div>
</div>

#### The theme for week 4 is: Bridges to Prosperity.

Bridges to Prosperity (B2P) works with isolated communities to create access to essential healthcare, education, and economic opportunities by building footbridges over impassable rivers.

Since 2001, B2P has worked with communities in 20 countries to build 318 bridges that collectively provide safe access to 1.1 million people.

## Original Version

You can check out the original version here.

<div class="figure-block">

![Original Bridges to Prosperity map visualization](https://miro.medium.com/max/1769/1*oKnBJbvxupPNljHDirCOSA.png)
<div class="figure-caption"><strong>Fig 2.</strong> Original Bridges to Prosperity map visualization.</div>
</div>

Good practices:
- Use of map

## My Version
#### How did I develop it?

I chose Power BI because it is a tool I am more familiar with and for its ease of external access. The original measure of pesticide use was in pounds, so I performed the conversion by adding a column to give the result in kilograms.

The xls format is designated for older versions of Excel, when we save a file, in pt-br it appears as “Pasta de Trabalho do Excel 97- Excel 2003”

<div class="figure-block">

![Excel data format for the bridges dataset](https://miro.medium.com/max/442/1*IZbfZZxhK5XxX8sSqDi2tQ.png)
<div class="figure-caption"><strong>Fig 3.</strong> Excel data format used for the bridges dataset.</div>
</div>

## Result

<div class="figure-block">

![Final Power BI dashboard showing bridges per country](https://miro.medium.com/max/1012/1*l0MygUcOBVUhE4s6IDK9vA.png)
<div class="figure-caption"><strong>Fig 4.</strong> Final Power BI dashboard showing bridges per country.</div>
</div>

I created measures using DAX to give the individual result of the number of bridges per country. The formula is as follows:

```
Bridges quantity = CALCULATE(COUNTA('Bridges Dataset'[Country]), filter(all('Bridges Dataset'[Country]), 'Bridges Dataset'[Country] = 'Bridges Dataset'[Country]))
```

## Points I wanted to show:

- General map
- Selection by country
- Country statistics

## Links

- [Makeover Monday 2020 W4](https://data.world/makeovermonday/2020w4)
- [My Power BI visualization](https://github.com/mrncstt/makeovermonday/tree/master/2020_W4)
