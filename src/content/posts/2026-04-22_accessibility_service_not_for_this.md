---
title: "Accessibility Service wasn't made for this"
date: 2026-04-22
slug: accessibility-service-not-for-this
tags: [android tv, dns, adguard, privacy, home networking]
description: "How I cut ads on my home network and an OEM Android TV, and how Accessibility Service became the way to force an alternative launcher."
lang: [en, pt, es]
---

<div data-lang="en">

## DNS at the router

I pressed Home on the remote, the screen filled with banners, I turned the TV off, turned it back on and nothing changed

I had a Deco M4 mesh and an Android TV 11", no root and no custom firmware, so a Pi-hole on a Raspberry was overkill for one TV, two phones and two laptops and I ended up pointing the router's DNS at public AdGuard right in the Deco app, under More, Advanced, DHCP Server

</div>
<div data-lang="pt">

## DNS no roteador

Apertei Home no controle, a tela encheu de banner, desliguei a TV, liguei de novo e nada mudou

Tinha um Deco M4 em mesh e uma Android TV 11", sem root e sem firmware custom, então Pi-hole num Raspberry era exagero pra uma TV, dois celulares e dois laptops e acabei apontando o DNS do roteador pro AdGuard público direto no app Deco, em More, Advanced, DHCP Server

</div>
<div data-lang="es">

## DNS en el router

Apreté Home en el control, la pantalla se llenó de banners, apagué la TV, la prendí de nuevo y nada cambió

Tenía un Deco M4 en mesh y una Android TV 11", sin root y sin firmware custom, así que un Pi-hole en una Raspberry era exagerado para una TV, dos celulares y dos laptops y terminé apuntando el DNS del router al AdGuard público directo en la app Deco, en More, Advanced, DHCP Server

</div>

```
Primary:   94.140.14.14
Secondary: 94.140.15.15
```

<div data-lang="en">

Save

## The 1.1.1.1 pinned trap

On the phone it worked, but on the PC it didn't, and I swore it was AdGuard when it wasn't

Windows had `1.1.1.1` pinned directly on the Wi-Fi adapter from way before I installed AdGuard, because a few months back I had a problem with Anna's Archive, pinned it at the time and forgot, and that pinned value overrides DHCP, so the router's DNS change never reached the PC

I went into Settings, Network, Wi-Fi, the connected network, set DNS server assignment back to Automatic and tested it in PowerShell:

</div>
<div data-lang="pt">

Save

## A trava do 1.1.1.1 fixado

No celular funcionou, mas no PC não, e eu jurava que era o AdGuard quando não era

O Windows tinha `1.1.1.1` fixado direto no adaptador Wi-Fi de muito antes de eu instalar o AdGuard, porque uns meses atrás tive um problema com o Anna's Archive, fixei na época e esqueci, e esse valor fixo sobrescreve o DHCP, então a mudança de DNS no roteador nunca chegava no PC

Fui em Settings, Network, Wi-Fi, a rede conectada, coloquei o DNS server assignment de volta em Automatic e testei no PowerShell:

</div>
<div data-lang="es">

Save

## La trampa del 1.1.1.1 fijado

En el celular funcionó, pero en la PC no, y yo juraba que era el AdGuard cuando no lo era

Windows tenía `1.1.1.1` fijado directo en el adaptador Wi-Fi desde mucho antes de que yo instalara AdGuard, porque unos meses atrás tuve un problema con Anna's Archive, lo fijé en su momento y me olvidé, y ese valor fijo sobreescribe el DHCP, así que el cambio de DNS en el router nunca llegaba a la PC

Fui a Settings, Network, Wi-Fi, la red conectada, puse el DNS server assignment de vuelta en Automatic y lo probé en PowerShell:

</div>

```
nslookup doubleclick.net
```

<div data-lang="en">

Back came `*** can't find doubleclick.net: Non-existent domain`, which is NXDOMAIN, blocked

One more trap here: if you use uBlock Origin Lite on Chrome or Brave, it kills the ad before the query leaves the PC, and I spent ten minutes thinking AdGuard was flying when it was uBO working on its own, so only nslookup is a clean test

## Anna's Archive on a blocklist

With AdGuard on, `annas-archive.org` stopped resolving because it landed on some blocklist, but the mirrors `.gd`, `.se` and `.li` pass clean, so I bookmarked the `.gd` and moved on

## Rest of the Deco

Since I was already in the app, I went through the rest, left UPnP off because it opens ports on its own without telling you, turned WPS off too even though I'd never used it (CVE-2011-5053, Reaver), and even though modern firmware like the Deco M4's already mitigates that with lockout, there was no reason to leave the door open, so I turned on Fast Roaming and Beamforming to make the handoff between the two Decos less ugly, put the firmware on auto-update and left the Guest Network permanently on because explaining a 24-character password to every visit is a pain

## YouTube

YouTube was the worst of all, but SmartTube Next replaces it directly, zero ads, SponsorBlock integrated and login optional, and since it's not on the Play Store you download it through Downloader (AFTVnews), enable Unknown Sources for Downloader, open it, search for `smarttubeapp.github.io`, grab the APK and install

## The launcher

I wanted off the OEM launcher from OK, the one that fills the home with "Featured", "Recommended" and "Top picks" rows, and Projectivy gives you a clean grid with just the installed apps

Installing was easy since it's on the Play Store, but setting it as default was way more annoying than I expected, because Projectivy's own "Override current launcher" toggle didn't take, so I went to Clear defaults on the old launcher in Settings, Apps, except OK doesn't expose that option, so I went off to Developer options, pressed OK seven times on "Android TV OS Build" and it activated (finally!!), and then I went looking for USB debugging and Wireless debugging and neither exists in this firmware because OK stripped them out

## Accessibility Service

After a lot of digging I found a way out, which is granting Accessibility Service permission to Projectivy, because even though Accessibility was built for screen readers, some launchers use that permission to intercept the Home button when the normal path is blocked

I went into Settings, Accessibility, the list of services, Projectivy, enabled it, pressed Home and Projectivy opened, rebooted and the TV booted straight into it (finally!! 2x)

This path isn't documented anywhere obvious and I never found official documentation for Accessibility Service intercepting Home on Android TV

Ads inside Netflix's basic tier and Prime Video come through the content CDN, and filtering them would require HTTPS MITM with a root CA installed, which breaks streaming, so it's not worth it, and the telemetry baked into OK's firmware is a black box without a custom ROM, so I left it alone

## Links

AdGuard's public DNS resolvers at 94.140.14.14 and 94.140.15.15 block ads and trackers at the resolver level without anything installed on the client. https://adguard-dns.io/

SmartTube Next is an open source YouTube replacement for Android TV that ships without ads and with SponsorBlock built in. https://smarttubeapp.github.io/

Downloader by AFTVnews is the sideloading utility I used to install SmartTube Next on Android TV since it isn't on the Play Store. https://www.aftvnews.com/downloader/

Projectivy is the alternative Android TV launcher that replaces the OEM home screen with a clean app grid. https://play.google.com/store/apps/details?id=com.spocky.projengmenu

CVE-2011-5053 is the original WPS PIN brute-force disclosure that tools like Reaver exploit, the reason WPS stays off. https://nvd.nist.gov/vuln/detail/CVE-2011-5053

</div>
<div data-lang="pt">

Voltou `*** can't find doubleclick.net: Non-existent domain`, que é NXDOMAIN, bloqueado

Mais uma armadilha aqui: se você usa uBlock Origin Lite no Chrome ou Brave, ele mata o ad antes da consulta sair do PC, e passei uns dez minutos achando que o AdGuard tava voando quando era o uBO trabalhando sozinho, então só o nslookup serve de teste limpo

## Anna's Archive numa blocklist

Com o AdGuard ligado o `annas-archive.org` parou de resolver porque caiu em alguma blocklist, mas os mirrors `.gd`, `.se` e `.li` passam limpo, então bookmarkei o `.gd` e segui

## Resto do Deco

Já que tava no app, fui revisando o resto, deixei o UPnP desligado porque ele abre porta sozinho sem avisar, desliguei o WPS também mesmo nunca tendo usado (CVE-2011-5053, Reaver), e mesmo que firmware moderno tipo o do Deco M4 já mitigue isso com lockout, não tinha motivo pra deixar a porta aberta, então liguei Fast Roaming e Beamforming pra deixar o handoff entre os dois Decos menos feio, botei o firmware em auto-update e deixei a Guest Network ligada permanente porque explicar uma senha de 24 caracteres pra cada visita é um saco

## YouTube

O YouTube era o pior de todos, mas o SmartTube Next substitui ele direto, zero ad, SponsorBlock integrado e login opcional, e como não tá na Play Store você baixa pelo Downloader (AFTVnews), libera Unknown Sources pro Downloader, abre, busca por `smarttubeapp.github.io`, pega o APK e instala

## O launcher

Eu queria sair do launcher OEM da OK, aquele que enche a home de fileiras "Featured", "Recomendado" e "Top picks" e o Projectivy te dá uma grade limpa só com os apps instalados

A instalação foi tranquila já que tá na Play Store, mas definir como padrão foi bem mais chato do que eu esperava, porque o toggle "Override current launcher" do próprio Projectivy não assumiu, então fui dar Clear defaults no launcher antigo em Settings, Apps, só que a OK não expõe essa opção, então parti pro Developer options, apertei OK sete vezes em "Android TV OS Build" e ativou (finalmente!!), nisso fui atrás de USB debugging e Wireless debugging e nenhum dos dois existe nesse firmware porque a OK removeu

## Accessibility Service

Depois de bastante busca achei uma saída, que é dar permissão de Accessibility Service pro Projectivy, porque mesmo o Accessibility tendo sido feito pra leitor de tela, alguns launchers usam essa permissão pra interceptar o botão Home quando o caminho normal tá bloqueado

Fui em Settings, Accessibility, lista de serviços, Projectivy, ativei, apertei Home e o Projectivy abriu, dei reboot e a TV ligou direto nele (finalmente!! 2x)

Esse caminho não tá documentado em lugar nenhum óbvio e nunca achei documentação oficial pro Accessibility Service interceptar o Home em Android TV

Ad dentro do Netflix tier básico e do Prime Video vem pelo CDN do conteúdo, e filtrar exigiria HTTPS MITM com CA raiz instalada, o que quebra o streaming, então não compensa, e a telemetria embutida no firmware da OK é caixa preta sem ROM custom, então deixei pra lá

## Links

Os resolvers de DNS público do AdGuard em 94.140.14.14 e 94.140.15.15 bloqueiam ad e tracker no nível do DNS, sem precisar instalar nada no dispositivo. https://adguard-dns.io/

SmartTube Next é um substituto open source do YouTube pra Android TV que vem sem ad e com SponsorBlock integrado. https://smarttubeapp.github.io/

O Downloader da AFTVnews é o utilitário de sideload que usei pra instalar o SmartTube Next na Android TV porque ele não tá na Play Store. https://www.aftvnews.com/downloader/

O Projectivy é o launcher alternativo de Android TV que troca a home OEM por uma grade limpa de apps instalados. https://play.google.com/store/apps/details?id=com.spocky.projengmenu

CVE-2011-5053 é a divulgação original do brute-force de PIN do WPS que ferramentas tipo Reaver exploram, motivo pra deixar o WPS desligado. https://nvd.nist.gov/vuln/detail/CVE-2011-5053

</div>
<div data-lang="es">

Volvió `*** can't find doubleclick.net: Non-existent domain`, que es NXDOMAIN, bloqueado

Otra trampa acá: si usás uBlock Origin Lite en Chrome o Brave, mata el anuncio antes de que la consulta salga de la PC, y pasé unos diez minutos pensando que el AdGuard volaba cuando era uBO trabajando solo, así que solo nslookup sirve como test limpio

## Anna's Archive en una blocklist

Con el AdGuard prendido el `annas-archive.org` dejó de resolver porque cayó en alguna blocklist, pero los mirrors `.gd`, `.se` y `.li` pasan limpio, así que bookmarkeé el `.gd` y seguí

## Resto del Deco

Ya que estaba en la app, fui revisando el resto, dejé el UPnP apagado porque abre puertos solo sin avisar, apagué el WPS también aunque nunca lo usé (CVE-2011-5053, Reaver), y aunque el firmware moderno como el del Deco M4 ya lo mitiga con lockout, no había motivo para dejar la puerta abierta, así que prendí Fast Roaming y Beamforming para dejar el handoff entre los dos Decos menos feo, puse el firmware en auto-update y dejé la Guest Network prendida permanente porque explicar una contraseña de 24 caracteres a cada visita es un fastidio

## YouTube

El YouTube era el peor de todos, pero el SmartTube Next lo reemplaza directo, cero anuncios, SponsorBlock integrado y login opcional, y como no está en la Play Store lo bajás por el Downloader (AFTVnews), habilitás Unknown Sources para el Downloader, lo abrís, buscás `smarttubeapp.github.io`, agarrás el APK e instalás

## El launcher

Quería salir del launcher OEM de OK, ese que llena la home con filas de "Featured", "Recomendado" y "Top picks" y el Projectivy te da una grilla limpia solo con las apps instaladas

La instalación fue tranquila ya que está en la Play Store, pero configurarlo como predeterminado fue bastante más molesto de lo que esperaba, porque el toggle "Override current launcher" del propio Projectivy no agarró, así que fui a dar Clear defaults en el launcher viejo en Settings, Apps, solo que la OK no expone esa opción, así que me fui a Developer options, apreté OK siete veces en "Android TV OS Build" y se activó (¡por fin!!), y ahí fui a buscar USB debugging y Wireless debugging y ninguno de los dos existe en este firmware porque la OK los removió

## Accessibility Service

Después de bastante búsqueda encontré una salida, que es darle permiso de Accessibility Service al Projectivy, porque aunque el Accessibility fue hecho para lectores de pantalla, algunos launchers usan ese permiso para interceptar el botón Home cuando el camino normal está bloqueado

Fui a Settings, Accessibility, la lista de servicios, Projectivy, lo activé, apreté Home y el Projectivy se abrió, hice reboot y la TV arrancó directo en él (¡por fin!! 2x)

Este camino no está documentado en ningún lado obvio y nunca encontré documentación oficial sobre Accessibility Service interceptando el Home en Android TV

Los anuncios dentro del tier básico de Netflix y del Prime Video vienen por el CDN del contenido, y filtrarlos requeriría HTTPS MITM con una CA raíz instalada, lo que rompe el streaming, así que no compensa, y la telemetría embebida en el firmware de OK es una caja negra sin ROM custom, así que lo dejé

## Links

Los resolvers de DNS público de AdGuard en 94.140.14.14 y 94.140.15.15 bloquean anuncios y trackers a nivel del DNS, sin necesidad de instalar nada en el dispositivo. https://adguard-dns.io/

SmartTube Next es un reemplazo open source de YouTube para Android TV que viene sin anuncios y con SponsorBlock integrado. https://smarttubeapp.github.io/

El Downloader de AFTVnews es la utilidad de sideload que usé para instalar SmartTube Next en la Android TV porque no está en la Play Store. https://www.aftvnews.com/downloader/

Projectivy es el launcher alternativo de Android TV que cambia la home OEM por una grilla limpia de apps instaladas. https://play.google.com/store/apps/details?id=com.spocky.projengmenu

CVE-2011-5053 es la divulgación original del brute-force del PIN del WPS que herramientas como Reaver explotan, el motivo para dejar el WPS apagado. https://nvd.nist.gov/vuln/detail/CVE-2011-5053

</div>
