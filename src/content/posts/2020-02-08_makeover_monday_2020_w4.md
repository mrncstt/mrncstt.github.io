---
title: Makeover Monday 2020 W/4
description: Makeover Monday 2020 W/4
date: 2020-02-08
slug: makeover-monday-2020-w4
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

![Makeover Monday week 4 original dashboard about Bridges to Prosperity](https://miro.medium.com/max/734/1*O9kL5tFTFYeHyK8dV2NOhg.png)
<div class="figure-caption"><strong>Fig 1.</strong> Original visualization from Makeover Monday Week 4.</div>
</div>

<div data-lang="en">

#### The theme for week 4 is: Bridges to Prosperity.

Bridges to Prosperity (B2P) works with isolated communities to create access to essential healthcare, education, and economic opportunities by building footbridges over impassable rivers.

Since 2001, B2P has worked with communities in 20 countries to build 318 bridges that collectively provide safe access to 1.1 million people.

</div>
<div data-lang="pt">

#### O tema da semana 4 é: Bridges to Prosperity.

A Bridges to Prosperity (B2P) trabalha com comunidades isoladas para criar acesso a serviços essenciais de saúde, educação e oportunidades econômicas, construindo passarelas sobre rios intransponíveis.

Desde 2001, a B2P trabalhou com comunidades em 20 países para construir 318 pontes que, juntas, proporcionam acesso seguro a 1,1 milhão de pessoas.

</div>
<div data-lang="es">

#### El tema de la semana 4 es: Bridges to Prosperity.

Bridges to Prosperity (B2P) trabaja con comunidades aisladas para crear acceso a servicios sanitarios esenciales, educación y oportunidades económicas, construyendo pasarelas sobre ríos infranqueables.

Desde 2001, B2P ha trabajado con comunidades en 20 países para construir 318 puentes que, en conjunto, proporcionan acceso seguro a 1,1 millones de personas.

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

![Original Bridges to Prosperity map visualization](https://miro.medium.com/max/1769/1*oKnBJbvxupPNljHDirCOSA.png)
<div class="figure-caption"><strong>Fig 2.</strong> Original Bridges to Prosperity map visualization.</div>
</div>

<div data-lang="en">

Good practices:
- Use of map

</div>
<div data-lang="pt">

Boas práticas:
- Uso de mapa

</div>
<div data-lang="es">

Buenas prácticas:
- Uso de mapa

</div>

<div data-lang="en">

## My Version
#### How did I develop it?

I chose Power BI because it is a tool I am more familiar with and for its ease of external access.

The xls format is designated for older versions of Excel, when we save a file, in pt-br it appears as "Pasta de Trabalho do Excel 97- Excel 2003"

</div>
<div data-lang="pt">

## Minha Versão
#### Como eu desenvolvi?

Escolhi o Power BI por ser uma ferramenta com a qual tenho mais familiaridade e pela facilidade de acesso externo.

O formato xls é designado para versões mais antigas do Excel, quando salvamos um arquivo, em pt-br aparece como "Pasta de Trabalho do Excel 97- Excel 2003"

</div>
<div data-lang="es">

## Mi Versión
#### Cómo la desarrollé?

Elegí Power BI porque es una herramienta con la que estoy más familiarizado y por su facilidad de acceso externo.

El formato xls está destinado a versiones antiguas de Excel; cuando guardamos un archivo, en pt-br aparece como "Pasta de Trabalho do Excel 97- Excel 2003"

</div>

<div class="figure-block">

![Excel data format for the bridges dataset](https://miro.medium.com/max/442/1*IZbfZZxhK5XxX8sSqDi2tQ.png)
<div class="figure-caption"><strong>Fig 3.</strong> Excel data format used for the bridges dataset.</div>
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

![Final Power BI dashboard showing bridges per country](https://miro.medium.com/max/1012/1*l0MygUcOBVUhE4s6IDK9vA.png)
<div class="figure-caption"><strong>Fig 4.</strong> Final Power BI dashboard showing bridges per country.</div>
</div>

<div data-lang="en">

I created measures using DAX to give the individual result of the number of bridges per country. The formula is as follows:

</div>
<div data-lang="pt">

Criei medidas usando DAX para dar o resultado individual do número de pontes por país. A fórmula é a seguinte:

</div>
<div data-lang="es">

Creé medidas usando DAX para obtener el resultado individual del número de puentes por país. La fórmula es la siguiente:

</div>

```
Bridges quantity = CALCULATE(COUNTA('Bridges Dataset'[Country]), filter(all('Bridges Dataset'[Country]), 'Bridges Dataset'[Country] = 'Bridges Dataset'[Country]))
```

<div data-lang="en">

## Points I wanted to show:

- General map
- Selection by country
- Country statistics

</div>
<div data-lang="pt">

## Pontos que eu queria mostrar:

- Mapa geral
- Seleção por país
- Estatísticas por país

</div>
<div data-lang="es">

## Puntos que quería mostrar:

- Mapa general
- Selección por país
- Estadísticas por país

</div>

## Links

- [Makeover Monday 2020 W4](https://data.world/makeovermonday/2020w4)
- [My Power BI visualization](https://github.com/mrncstt/makeovermonday/tree/master/2020_W4)
