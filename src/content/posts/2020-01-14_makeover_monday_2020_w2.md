---
title: Makeover Monday 2020 W/2
description: Makeover Monday 2020 W/2
date: 2020-01-14
slug: makeover-monday-2020-w2
tags: [makeover monday, data visualization, power bi, data analysis, dashboard]
---
<div data-lang="en">

Makeover Monday is a project in the form of a dashboard that is published by one of the participants and must be redone by anyone who wishes. The dataset example is published weekly on the website.

</div>
<div data-lang="pt">

Makeover Monday é um projeto em formato de dashboard que é publicado por um dos participantes e deve ser refeito por quem desejar. O exemplo do dataset é publicado semanalmente no site.

</div>
<div data-lang="es">

Makeover Monday es un proyecto en forma de dashboard que es publicado por uno de los participantes y debe ser rehecho por quien lo desee. El ejemplo del dataset se publica semanalmente en la web.

</div>

<div class="figure-block">

![Makeover Monday week 2 original dashboard about pesticide use](https://miro.medium.com/max/641/1*5K4uFM-b4QO7-Ezw_lSHlw.png)
<div class="figure-caption"><strong>Fig 1.</strong> Original visualization from Makeover Monday Week 2.</div>
</div>

<div data-lang="en">

#### The theme for week 2 is: Pesticide Use
The US lags behind other agricultural nations in banning harmful pesticides. Four of the world's largest agricultural producers are the USA, EU (European Union), China, and Brazil. Each has separate and distinct pesticide regulatory systems designed to protect, to varying degrees, humans and the environment. A 2016 survey found that 27.3% of pesticides used by the US, amounting to 328 million pounds (approximately 148.7 million kilograms), are banned in at least one of the other nations. There are 85 pesticides still used in the US that are banned or being phased out in the EU, China, or Brazil.

</div>
<div data-lang="pt">

#### O tema da semana 2 é: Uso de Pesticidas
Os EUA estão atrás de outras nações agrícolas na proibição de pesticidas nocivos. Quatro dos maiores produtores agrícolas do mundo são os EUA, a UE (União Europeia), a China e o Brasil. Cada um possui sistemas regulatórios de pesticidas separados e distintos, projetados para proteger, em diferentes graus, os seres humanos e o meio ambiente. Uma pesquisa de 2016 constatou que 27,3% dos pesticidas usados pelos EUA, totalizando 328 milhões de libras (aproximadamente 148,7 milhões de quilogramas), são proibidos em pelo menos uma das outras nações. Existem 85 pesticidas ainda usados nos EUA que são proibidos ou estão sendo eliminados na UE, China ou Brasil.

</div>
<div data-lang="es">

#### El tema de la semana 2 es: Uso de Pesticidas
Estados Unidos va por detrás de otras naciones agrícolas en la prohibición de pesticidas nocivos. Cuatro de los mayores productores agrícolas del mundo son EE.UU., la UE (Unión Europea), China y Brasil. Cada uno tiene sistemas regulatorios de pesticidas separados y distintos, diseñados para proteger, en diferentes grados, a los seres humanos y al medio ambiente. Un estudio de 2016 reveló que el 27,3% de los pesticidas utilizados en EE.UU., equivalentes a 328 millones de libras (aproximadamente 148,7 millones de kilogramos), están prohibidos en al menos una de las otras naciones. Hay 85 pesticidas que aún se usan en EE.UU. que están prohibidos o en proceso de eliminación en la UE, China o Brasil.

</div>

<div data-lang="en">

## Original Version

You can check out the original version here.

</div>
<div data-lang="pt">

## Versão Original

Você pode conferir a versão original aqui.

</div>
<div data-lang="es">

## Versión Original

Puedes consultar la versión original aquí.

</div>

<div class="figure-block">

![Original pesticide use visualization](https://miro.medium.com/max/685/1*pE_EHv6m1C6WTcVd4vOnHQ.png)
<div class="figure-caption"><strong>Fig 2.</strong> Original pesticide use visualization for comparison.</div>
</div>

<div data-lang="en">

Good practices:
- Centralized comparison
- Simplified legend

</div>
<div data-lang="pt">

Boas práticas:
- Comparação centralizada
- Legenda simplificada

</div>
<div data-lang="es">

Buenas prácticas:
- Comparación centralizada
- Leyenda simplificada

</div>

<div data-lang="en">

## My Version
#### How did I develop it?

I chose Power BI because it is a tool I am more familiar with and for its ease of external access. The original measure of pesticide use was in pounds, so I performed the conversion by adding a column to give the result in kilograms.

</div>
<div data-lang="pt">

## Minha Versão
#### Como eu desenvolvi?

Escolhi o Power BI por ser uma ferramenta com a qual tenho mais familiaridade e pela facilidade de acesso externo. A medida original de uso de pesticidas estava em libras, então realizei a conversão adicionando uma coluna para dar o resultado em quilogramas.

</div>
<div data-lang="es">

## Mi Versión
#### Cómo la desarrollé?

Elegí Power BI porque es una herramienta con la que estoy más familiarizado y por su facilidad de acceso externo. La medida original de uso de pesticidas estaba en libras, así que realicé la conversión añadiendo una columna para obtener el resultado en kilogramos.

</div>

<div class="figure-block">

![Power BI column conversion step](https://miro.medium.com/max/356/1*RgC0bgDYO3A5m077y__nVQ.png)
<div class="figure-caption"><strong>Fig 3.</strong> Column conversion step in Power BI for unit transformation.</div>
</div>

<div class="figure-block">

![Power BI development process](https://miro.medium.com/max/808/1*WvV_G9DdwcxeEODP3xDTrQ.png)
<div class="figure-caption"><strong>Fig 4.</strong> Power BI development process for the pesticide dashboard.</div>
</div>

<div data-lang="en">

## Result

</div>
<div data-lang="pt">

## Resultado

</div>
<div data-lang="es">

## Resultado

</div>

<div class="figure-block">

![Final Power BI dashboard showing pesticide use by country](https://miro.medium.com/max/863/1*Kd5B_XwmWRczrdroMLENag.png)
<div class="figure-caption"><strong>Fig 5.</strong> Final Power BI dashboard showing pesticide use by country.</div>
</div>

<div data-lang="en">

I created measures using DAX to give the individual result using card elements. The formula is as follows:

</div>
<div data-lang="pt">

Criei medidas usando DAX para dar o resultado individual utilizando elementos de cartão. A fórmula é a seguinte:

</div>
<div data-lang="es">

Creé medidas usando DAX para obtener el resultado individual utilizando elementos de tarjeta. La fórmula es la siguiente:

</div>

```
brazil = CALCULATE(SUM(Countries[Kg. Pesticides Used in USA Agriculture]), Countries[Texto Após o Delimitador] = "BRA")
```

<div data-lang="en">

## Points I wanted to show:
- Result in kilograms
- Separate comparisons

</div>
<div data-lang="pt">

## Pontos que eu queria mostrar:
- Resultado em quilogramas
- Comparações separadas

</div>
<div data-lang="es">

## Puntos que quería mostrar:
- Resultado en kilogramos
- Comparaciones separadas

</div>

## Links

- [Makeover Monday 2020 W2](https://data.world/makeovermonday/2020w2)
- [My Power BI visualization](https://app.powerbi.com/view?r=eyJrIjoiMDAzNDk0YzctNTZjZS00ZTM2LTg4NGUtZTkwZTJmYTg3NjUwIiwidCI6ImRjYmYyYTFmLTk1MzItNGQ1Ni1hYzQxLTU2MTVlMzhlNTBiNyJ9)
