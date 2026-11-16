// ==UserScript==
// @name         old Handwerksrechner
// @namespace    thewest.handwerksrechner
// @version      1.1.3
// @description  Handwerksrechner mit 164 Produkten und Berufstotalen.
// @author       old
// @match        https://*.the-west.de/game.php*
// @match        https://*.thewest.de/game.php*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
'use strict';
if (document.getElementById('old-host')) return;
const DATA = `
700000|Schinken|5
701000|Getreide|1
702000|Tabakblätter|2
703000|Zucker|4
704000|Baumwolle|3
705000|Forelle|2
706000|Beeren|2
707000|Wolle|4
708000|Katzengold|8
709000|Truthahn|7
710000|T-Bone-Steak|12
711000|Holz|8
712000|Leder|8
714000|Biberfell|18
715000|Tuchballen|11
716000|Steine|5
717000|Lachs|7
718000|Kojotenzahn|21
719000|Zigarren|12
720000|Halbedelsteine|35
721000|Kohle|10
724000|Büffelfell|20
725000|Silber|100
728000|Taschenuhr|105
737000|Dynamit|40
739000|Stacheldraht|18
740000|Kuhhorn|39
741000|Krug|12
742000|Säge|20
743000|Plakat|2
744000|Zeitung|3
745000|Mehl|2
746000|Bohnen|3
747000|Hammer|11
748000|Mais|2
749000|Lasso|16
751000|Friedenspfeife|36
752000|Öl|38
754000|Hufeisen|15
756000|Werkzeugkasten|55
757000|Rabenfeder|4
761000|Vorschlaghammer|26
763000|Zahnarmband|22
765000|Sichel|22
766000|Glas Wasser|3
767000|Drahtrolle|17
778000|Kochtopf|11
779000|Posthorn|30
784000|Nägel|4
787000|Sattel|40
789000|Quarter|1
790000|Eisenstangen|18
791000|Orangen|4
792000|Tequila|12
793000|Tomate|3
794000|Elixier|180
795000|Holzpflock|7
797000|Mistgabel|16
1708000|Whiskey|5
1791000|Goldstaub|50
1808000|Kartoffel|2
1809000|Stroh|2
1810000|Kürbis|12
1811000|Blaubeeren|7
1812000|Kerne|0
1813000|Adlerfeder|17
1814000|Lotusblüte|22
1815000|Krebsfleisch|6
1816000|Kreide|1
1818000|Schwefelgestein|12
1820000|Schlangenhaut|13
1821000|Salpetersalz|6
1822000|Zigaretten|1
1824000|Pumafell|27
1825000|Indigo|32
1826000|Rum|3
1827000|Blei|13
1832000|Metallchip|25
1833000|Todesurteil|2
1834000|Friedensblume|0
1835000|Rose|5
1855000|Holzkohle|15|0|0|711000:1,716000:1
1856000|Krug voll Wasser|15|0|0|766000:1,741000:1
1857000|Feldflasche|65|3|0|740000:1,714000:1
1858000|Messer|60|2|0|747000:1,1899000:1,716000:1
1859000|Pfanne|37|2|0|790000:1,747000:1
1860000|Schneidbrett|28|3|0|711000:1
1861000|Zunderzeug|16|1|0|708000:1,716000:1,704000:1
1862000|Maismehl|10|0|0|748000:1,716000:1
1863000|Bohnen mit Speck|66|0|50|746000:1,700000:1,1855000:1,1859000:1
1864000|Marmelade|65|0|50|1811000:2,1855000:1,703000:2
1865000|Maische|45|0|100|703000:1,701000:1,1856000:1
1866000|Teig|20|0|100|745000:1,1856000:1
1867000|Mariniertes Steak|57|0|100|710000:1,1821000:1,1826000:1
1868000|Likör|132|0|150|792000:2,1857000:1,1811000:1
1869000|Torte|41|0|150|706000:1,1866000:2
1870000|Fischfond|21|0|150|705000:1,717000:1,1815000:1
1871000|Gebratener Truthahn|45|0|250|709000:1,706000:2,1855000:1,791000:1
1872000|Fischsuppe|65|0|250|1941000:1,1870000:1
1873000|Gemüsetasche|128|0|250|1810000:1,1808000:1,1866000:1
1874000|Hackfleisch|122|0|300|700000:2,1858000:1,1860000:1
1875000|Stockfisch|37|0|350|705000:1,795000:1
1876000|Räucherwerk|27|0|350|702000:4,1822000:1,706000:2
1877000|Soße|65|0|350|1941000:1,1810000:1
1878000|In Zeitungspapier eingeschlagener Fisch|42|0|400|717000:4,712000:4,744000:2
1879000|Gentlemans Dinner|94|0|450|719000:2,1708000:3,744000:1
1880000|Harz|32|1|0|742000:1,741000:1
1881000|Schwefel|23|1|0|1818000:1
1882000|Rohrbürste|95|1|50|752000:1,757000:1,715000:1
1883000|Magenmittel|24|1|50|1816000:1,1861000:2
1884000|Schweflige Säure|39|1|100|1809000:1,1881000:1
1885000|Tinte|82|1|100|1825000:1,1708000:1
1886000|Petroleum|107|1|100|752000:1,1809000:1,1944000:1
1887000|Idol|144|1|150|718000:2,1944000:2,1861000:1
1888000|Destillat|235|1|150|752000:1,711000:3,1857000:1
1889000|Feuerwasser|67|1|150|1808000:3,703000:2,1861000:1,701000:4
1890000|Tee|36|1|250|706000:3,1856000:1
1891000|Kautabak|89|1|250|702000:1,711000:2,1880000:1
1892000|Fruchtlikör|62|1|250|792000:1,791000:5,1860000:1
1893000|Batterie|90|1|300|767000:1,791000:2
1894000|Lauge|69|1|350|711000:3,766000:1,1855000:1,1944000:1
1895000|Kräutersud|61|1|350|1814000:1,766000:1
1896000|Papier|63|1|350|744000:5,1856000:1
1897000|Mathematische Zeichenvorrichtung|41|1|400|795000:3,749000:2
1898000|Rosenwasser|41|1|450|1835000:2,1708000:2
1899000|Geschmolzenes Eisen|36|2|0|790000:1,711000:1
1900000|Bajonett|77|2|50|704000:3,712000:1,1858000:1
1901000|Gewichtsstein|54|2|50|716000:2,1899000:1
1902000|Stahl|71|2|100|721000:1,1899000:1
1903000|Geschmolzenes Blei|67|2|100|1827000:1,1855000:1
1904000|Amboss|123|2|100|1947000:1,1902000:1,1861000:1
1905000|Bleifigur|109|2|150|711000:3,1827000:1,1855000:1
1906000|Noch weiche Murmel|82|2|150|720000:1,1880000:1
1907000|Nieten|23|2|150|784000:3,747000:1
1908000|Griffschutz|72|2|250|739000:2,714000:2
1909000|Kühltuch|31|2|250|707000:2,767000:2,766000:1
1910000|Waffenkette|39|2|250|767000:2,763000:1
1911000|Griffstück|103|2|300|711000:1,742000:1,784000:1,1880000:1
1912000|Revolverrohling|87|2|350|747000:1,721000:2,1947000:2,1899000:1
1913000|Stahlklinge|117|2|350|761000:1,721000:2,1902000:1
1914000|Verzierung|50|2|350|1791000:1
1915000|Noch nicht geöffnete Druse|56|2|400|716000:1,742000:1,761000:1
1916000|Polierstein|126|2|450|716000:1,752000:2,724000:1
1917000|Lederriemen|30|3|0|1950000:1,765000:1
1918000|Beschlagene Hufe|34|3|50|754000:1,784000:2,747000:1
1919000|Kraftfutter|16|3|50|701000:3,1809000:3,766000:3,706000:2
1920000|Abgezogener Sattel|128|3|100|787000:1,1858000:1
1921000|Füllstoff|26|3|100|707000:2,704000:4,701000:4
1922000|Lederbezug|53|3|100|1820000:1,1880000:1
1923000|Brandeisen|110|3|150|790000:1,721000:2,1809000:2,1861000:1
1924000|Noch nicht ausgerichteter Kompass|152|3|150|766000:1,784000:1
1925000|Steigbügel|110|3|150|790000:1,761000:1,1917000:1
1926000|Sporen|39|3|250|739000:3,789000:1,742000:1
1927000|Zaumzeug|77|3|250|749000:2,767000:1,1860000:1
1928000|Feldlager|48|3|250|1809000:3,715000:1,1824000:2
1929000|Pferdedecke|153|3|300|724000:1,714000:1,1858000:1
1930000|Verzierung|275|3|350|720000:1,1827000:1,725000:1
1931000|Kutschteil|67|3|350|711000:3,784000:2,747000:1
1932000|Wagenrad|110|3|350|790000:2,711000:3,784000:1
1933000|Zielwasser|300|3|400|1708000:2,794000:1,1857000:1
1934000|Edelsteinsattelknauf|97|3|450|720000:2,1880000:1
1937000|Reisetasche|11|3|0|707000:2,704000:1
1938000|Geschliffene Waffe|8|2|0|716000:1,704000:2
1939000|Filterzigarette|14|1|0|702000:1,743000:1,721000:1
1940000|Stück Torte|8|0|0|745000:1,703000:1,706000:1
1941000|Tomatenbrei|3|0|0|716000:1,793000:1
1942000|Tomatenssoße|7|0|10|1941000:1
1943000|Gebackene Bohnen|25|0|20|1942000:1,746000:1
1944000|Rohpyrit|8|1|0|708000:1
1945000|Pyritsonne|10|1|10|1944000:1
1946000|Amulett|25|1|20|1945000:1,757000:1
1947000|Graphit|10|2|0|721000:1
1948000|Graphitpulver|12|2|10|1947000:1
1949000|Graphitschmiermittel|25|2|20|1948000:1,707000:1
1950000|Bearbeitetes Leder|8|3|0|712000:1
1951000|Lederbeutel|12|3|10|1950000:1
1952000|Futterbeutel|25|3|20|1951000:1,701000:1
1980000|Dörrfleisch|41|0|500|700000:6,710000:4,1821000:4,1708000:6
1981000|Gulasch|139|0|525|1867000:1,1941000:1,721000:1,778000:1
1982000|Spare Ribs|208|0|550|710000:4,1877000:4,1855000:4
1983000|Schlangenöl|95|1|500|1820000:1,1894000:1,1818000:1
1984000|Haarwuchsmittel|315|1|525|1893000:1,1886000:1,1824000:1
1985000|Erlesener Tropfen|140|1|550|1889000:1,1895000:1,741000:1
1986000|Erlesenes Lederfett|92|3|500|752000:1,1814000:1,791000:1
1987000|Stabile Zügel|335|3|525|1917000:1,1930000:1
1988000|Stabiles Holster|103|3|550|1950000:1,1921000:1,1922000:1
1989000|Rostfreier Bolzen|141|2|500|1903000:1,1899000:1,1902000:1
1990000|Versilberter Flachmann|309|2|525|725000:1,1904000:1
1991000|Moderne Panzerung|218|2|550|1899000:1,1907000:1,1904000:2
1999000|Dosenbohnen|250|0|600|746000:7,1902000:3,716000:12,721000:12,747000:5
2000000|Habanero-Chilis|100
2001000|Das schärfste Chili im Westen|400|0|600|2000000:1,1999000:4,1874000:7,721000:5
2002000|Glühendes Gemisch|250|1|600|1983000:1,1876000:3,1814000:2,752000:3
2003000|Schlangenzähne|100
2004000|Sagenhaftes Gegengift|400|1|600|2003000:1,2002000:4,721000:4,1895000:5
2005000|Federleichtes Leder|250|3|600|1986000:1,1894000:3,1950000:5,1922000:3
2006000|Kosakische Satteldecke|100
2007000|Pony-Express-Sattelzeug|400|3|600|2006000:1,2005000:4,1930000:5,724000:6
2008000|Uhrmacherwerkzeug|250|2|600|765000:2,1925000:2,1913000:2,739000:3,1989000:1
2009000|Vergoldete Zahnräder|100
2010000|Goldene Spieluhr|400|2|600|2009000:1,2008000:4,728000:4,767000:5
2162000|Portion gemahlener Kaffee|0
2163000|Lammwolle|1
2430000|Großkalibrige Kugeln|30
2432000|Milchflasche|15
2433000|Zange|27
2435000|Bandagen|12
2436000|Notenblatt|5
2437000|Pinkerton-Emblem|55
2439000|Exerziertrompete|17
2443000|Öffentliche Dokumente|22
2444000|Zeremonienstab|35
2445000|Taschenmesser|33
2446000|Patronenhülsen|2
2447000|Rote Chilischote|8
2450000|Einmachglas mit rohen Eiern|2
2451000|Sprengmaschine|20
2452000|Schädel|4
2453000|Weiße Handschuhe|12
2455000|Alligatorhaut|17
2456000|Wodka|14
2457000|Pferdezügel|14
2458000|Aufzeichnung|2
2516000|Hushpuppy|55|0|350|1862000:2,2450000:2,2432000:2
2517000|Kaugummi|75|0|500|1875000:1,1980000:1,2447000:1
2518000|Grog|100|0|500|1865000:2,2456000:2,1826000:1,2526000:1
2519000|Rennkutsche|55|3|350|1931000:1,1932000:1,2457000:1
2520000|Reparierter Sattel|75|3|450|1920000:1,1922000:1,752000:1,2433000:3
2521000|Wandteppich|100|3|500|1929000:1,2435000:2,1825000:1,2523000:1
2522000|Der Westerner|55|2|350|1912000:1,2430000:1
2523000|Allzweckmesser|75|2|450|1914000:1,2445000:1
2524000|Wells Fargo Sattel|100|2|500|1911000:1,2439000:1,2520000:1
2525000|Zaubertinte|55|1|350|1885000:1,1896000:1,2444000:1
2526000|Brandmunition|75|1|450|1884000:3,1886000:2,1821000:3,2446000:3
2527000|Potenzmittel|100|1|500|1889000:1,2455000:2,1812000:1,2517000:1
2730000|Flachsfasern|130|1|450|1882000:1,766000:2,1809000:2,784000:3
2731000|Lebenskraft-Puppe|105|1|550|1880000:1,1897000:1,1917000:2,2730000:1
2732000|Gespenstische Musik|265|1|600|2436000:4,1833000:1,2525000:2,1888000:1,2730000:1
2733000|Glas|120|2|450|1903000:1,1906000:1,720000:1,1855000:1
2734000|Laterne|263|2|600|2733000:3,1914000:2,784000:1,1899000:2
2735000|Honigpresse|180|2|550|711000:3,790000:1,1911000:2,747000:1
2736000|Kaktussaft|42|0|450|1858000:1,703000:2,791000:2,1856000:1
2737000|Honig|67|0|550|2735000:1,1835000:1
2738000|Met|262|0|600|2737000:2,1856000:1,2432000:2,1862000:1
2739000|Notizbuch|75|3|450|1922000:1,1896000:1
2740000|Reisekutsche|156|3|550|1932000:2,1931000:1,2730000:1
2741000|Munitionsgurt|295|3|600|1950000:2,2433000:1,2446000:1,1986000:1
51576000|Cocktail|180|0|700|2456000:10,2447000:5,1834000:4,2458000:1,2736000:1,1888000:1
51577000|Flavored Bubble Gum Pack|180|0|775|793000:2,1811000:2,2517000:1,1825000:1,1808000:2,791000:2
51578000|Miners' Burger|180|0|750|1855000:10,710000:1,1980000:3,1866000:2,1877000:4
51579000|Fruit Cocktail|180|0|750|791000:4,2737000:2,1811000:10,1865000:2,2432000:1
51580000|Fertilizer|180|0|700|1860000:10,1809000:5,1873000:1,1943000:2,1862000:1,1866000:1,797000:1
51581000|Castello Cheese|180|0|650|2432000:6,1708000:6,2737000:2,2447000:1
51582000|Maria Roalstad's Stagecoach|180|3|700|2163000:10,779000:1,2740000:1,1921000:1,1986000:1,1907000:1
51583000|Songs of The West|180|3|775|1813000:3,2436000:5,2739000:2,1885000:3
51584000|Cloth Crate|180|3|750|1929000:3,1922000:3,1950000:3,1824000:8,2455000:10
51585000|Belt with Straps|180|3|750|1917000:3,2005000:1,1907000:1,761000:1
51586000|Armor for the Mount|180|3|700|1991000:1,1929000:3
51587000|Leather Coat|180|3|650|715000:2,724000:2,1824000:3,1922000:4
51588000|Booby Trap|180|2|700|1832000:5,2437000:2,2451000:5,737000:10,2739000:1,1915000:1
51589000|Tailor's Dummy|180|2|775|1905000:1,712000:6,715000:6,2445000:3,2435000:3
51590000|Advanced Toolbox|180|2|750|1989000:3,1913000:3,1907000:3,756000:2,2433000:4
51591000|Hardened Steel|180|2|750|1904000:1,1902000:3,761000:2,1856000:4,1855000:5
51592000|Viewfinder|180|2|700|2733000:1,711000:2,1880000:1,1907000:2,1902000:1,2453000:1
51593000|Cavalry Saber|180|2|650|1913000:2,1911000:1,1855000:4
51594000|Wonder Tincture|180|1|700|2162000:10,2450000:2,2432000:2,2731000:1,1895000:1,1889000:1
51595000|Metal Skull|180|1|775|2452000:3,725000:5,1827000:3,1945000:5,789000:4
51596000|Strong Acid and Lye|180|1|750|1884000:10,1894000:10,1821000:10,794000:4,766000:10
51597000|Remedy against Torments|180|1|750|1876000:2,702000:5,2730000:1,751000:1
51598000|Import Tax Certificate|180|1|700|2443000:3,2458000:1,1923000:1,1896000:1,2525000:1
51599000|Dream-Catcher|180|1|650|757000:10,1813000:3,712000:1,1917000:1,767000:1
`;

const jobs = ['Feldkoch','Quacksalber','Schmied','Sattelmeister'];
const items = {}, recipes = {};
DATA.trim().split('\n').forEach(line => {
  const [id,name,price,job,level,ingredients] = line.trim().split('|');
  items[id] = {name,price:Number(price)};
  if (ingredients) recipes[id] = {
    job:jobs[Number(job)], level:Number(level),
    ingredients:ingredients.split(',').map(pair => {
      const [key,n] = pair.split(':');
      return [key,Number(n)];
    })
  };
});
const host = document.createElement('div');
host.id = 'old-host';
document.body.appendChild(host);
const root = host.attachShadow({mode:'open'});
root.innerHTML = `
<style>
:host{font:16px/1.45 Arial,sans-serif;color:#302416;color-scheme:light}
*{box-sizing:border-box}
[hidden]{display:none!important}
button,input,select{font:inherit}
button{cursor:pointer}
#launcher{position:fixed;top:440px;right:4px;bottom:auto;width:40px;height:40px;padding:0;border:2px solid #a18450;border-radius:5px;background:linear-gradient(#695035,#302014);color:#fff2ce;font-size:14px;font-weight:bold;box-shadow:0 2px 5px #0009;z-index:2147483646}
dialog{width:min(1060px,calc(100vw - 24px));max-height:90vh;overflow:auto;padding:0;border:2px solid #755232;border-radius:10px;background:#fff9ed;color:#302416;font:16px/1.45 Arial,sans-serif}
dialog::backdrop{background:#0007}
header{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:15px;padding:12px 20px;background:#513b27;color:#fff7e7}
button.close{padding:8px 12px;background:#fff9ed;border:1px solid #cfb88c;border-radius:5px}
main{padding:20px}
h2{margin:0 0 20px;font-size:24px}
h3{margin:24px 0 8px;font-size:19px}
h4{margin:16px 0 6px}
.controls{display:flex;flex-wrap:wrap;gap:16px}
label{display:flex;flex-direction:column;gap:6px;flex:1 1 240px;font-weight:bold}
input,select{width:100%;padding:10px;background:white;color:#302416;border:1px solid #a99275;border-radius:5px;font-weight:normal}
select{margin-top:8px}
.wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:15px;margin:8px 0}
th,td{padding:9px;border-bottom:1px solid #dfd2bc;text-align:left;vertical-align:top}
th,tfoot{background:#f1e5cf;font-weight:bold}
td.num{text-align:right;font-variant-numeric:tabular-nums}
.note{font-size:13px;color:#655744}
.summary{padding:14px;background:#f1e5cf;border:1px solid #caba9e;border-radius:6px;font-weight:bold}
#message:not(:empty){padding:10px;background:#fff0dc;color:#763e12}
footer{border-top:1px solid #dfd2bc;padding-top:15px;font-size:13px;color:#655744}
</style>
<button id="launcher" type="button" title="Handwerksrechner öffnen" aria-label="Handwerksrechner öffnen">HW</button>
<dialog aria-label="old Handwerksrechner">
<header><strong>old · The West Handwerksrechner</strong><button class="close" type="button">Schliessen</button></header>
<main>
<h2>The West · Produktrechner</h2>
<div class="controls">
<label>Produkt suchen
<input id="search" type="search" placeholder="z. B. toma, Honig oder Papier" autocomplete="off">
</label>
<label>Gewünschte Stückzahl
<input id="quantity" type="number" min="0" max="1000000" step="1" value="100">
</label>
</div>
<label>Produkt auswählen
<select id="product"></select>
</label>
<p class="note" id="coverage"></p>
<p id="message" role="status"></p>
<div id="results"></div>
<footer>Version 1.1.3 · Rezeptdaten aus dem bisherigen Script, Stand 15.11.2026 (TW-DB.info).
Niedrige Händler-Verkaufswerte, keine Marktpreise.
Kein Zugriff auf Inventar oder Markt. Keine automatischen Spielaktionen.</footer>
</main>
</dialog>
`;
const $ = selector => root.querySelector(selector);
const panel = $('dialog');
const search = $('#search');
const product = $('#product');
const quantity = $('#quantity');
const results = $('#results');
const message = $('#message');
const fmt = n => new Intl.NumberFormat('de-CH',{maximumFractionDigits:2}).format(n);
const money = n => fmt(n)+' $';
const normal = s => s.trim().toLocaleLowerCase('de');
const ids = Object.keys(recipes).sort((a,b) =>
  items[a].name.localeCompare(items[b].name,'de') ||
  recipes[a].job.localeCompare(recipes[b].job,'de')
);
function get(key,fallback) {
  try { return GM_getValue(key,fallback); } catch { return fallback; }
}
function save(key,value) {
  try { GM_setValue(key,value); } catch {}
}
function open() {
  if (!panel.open) panel.showModal();
  search.focus();
}
$('#launcher').addEventListener('click',open);
$('.close').addEventListener('click',() => panel.close());
panel.addEventListener('close',() => $('#launcher').focus());
['keydown','keyup','keypress'].forEach(type =>
  panel.addEventListener(type,event => event.stopPropagation())
);
try { GM_registerMenuCommand('Handwerksrechner öffnen',open); } catch {}

function element(tag,text,parent) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (parent) parent.appendChild(el);
  return el;
}
function heading(text) { element('h3',text,results); }
function paragraph(text,className='') {
  const p = element('p',text,results);
  p.className = className;
}
function table(materials,totalLabel) {
  const wrap = element('div',undefined,results);
  wrap.className = 'wrap';
  const t = element('table',undefined,wrap);
  const h = element('thead',undefined,t);
  const hr = element('tr',undefined,h);
  ['Material / Herkunft','Menge','Preis/Stück','Total'].forEach(s =>
    element('th',s,hr)
  );
  const body = element('tbody',undefined,t);
  let total = 0, count = 0;
  Object.entries(materials).sort((a,b) =>
    items[a[0]].name.localeCompare(items[b[0]].name,'de')
  ).forEach(([id,n]) => {
    const value = n*items[id].price;
    total += value;
    count += n;
    const row = element('tr',undefined,body);
    element('td',items[id].name+' · '+(recipes[id]?.job || 'Rohmaterial'),row);
    [fmt(n),money(items[id].price),money(value)].forEach(s => {
      element('td',s,row).className = 'num';
    });
  });
  const foot = element('tfoot',undefined,t);
  const row = element('tr',undefined,foot);
  element('td',totalLabel,row);
  element('td',fmt(count)+' Stück',row).className = 'num';
  element('td','',row);
  element('td',money(total),row).className = 'num';
  return total;
}
function calculate(id,n) {
  const raw = {}, craft = {};
  function visit(key,amount,path=[]) {
    if (!amount) return;
    if (path.includes(key)) throw Error('Kreisförmiges Rezept');
    const r = recipes[key];
    if (!r) {
      raw[key] = (raw[key] || 0)+amount;
      return;
    }
    craft[key] = (craft[key] || 0)+amount;
    r.ingredients.forEach(([child,count]) =>
      visit(child,amount*count,[...path,key])
    );
  }
  visit(id,n);
  return {raw,craft};
}
function update() {
  results.replaceChildren();
  const id = product.value, n = Number(quantity.value);
  if (!recipes[id]) {
    message.textContent = 'Kein passendes Produkt. Suchfeld leeren, um alle Produkte zu sehen.';
    return;
  }
  if (quantity.value === '' || !Number.isSafeInteger(n) || n < 0 || n > 1000000) {
    message.textContent = 'Bitte eine ganze Stückzahl zwischen 0 und 1 Million eingeben.';
    return;
  }
  message.textContent = '';
  save('old-product',id);
  save('old-quantity',n);
  const r = recipes[id], data = calculate(id,n);
  paragraph(items[id].name+' · '+r.job+' · Handwerksstufe '+r.level+
    ' · pro Herstellung: '+r.ingredients.map(([key,c]) =>
      c+' × '+items[key].name
    ).join(' + ')+' → 1 × '+items[id].name);
  heading('Rohmaterialien · sammeln oder kaufen');
  const total = table(data.raw,'Rohmaterialtotal');
  paragraph('Rohmaterialwert gesamt: '+money(total)+
    ' · pro Stück: '+(n ? money(total/n) : '—'),'summary');
  heading('Herstellung nach Beruf · inklusive Vorprodukte');
  jobs.forEach(job => {
    const entries = Object.entries(data.craft).filter(([key]) =>
      recipes[key].job === job
    ).sort((a,b) => recipes[a[0]].level-recipes[b[0]].level);
    if (!entries.length) return;
    heading(job);
    let rawTotal = 0;
    entries.forEach(([key,runs]) => {
      element('h4',fmt(runs)+' × '+items[key].name+
        ' herstellen · Stufe '+recipes[key].level,results);
      const materials = {};
      recipes[key].ingredients.forEach(([child,c]) => {
        materials[child] = (materials[child] || 0)+c*runs;
        if (!recipes[child]) rawTotal += c*runs*items[child].price;
      });
      table(materials,'Materialtotal für '+items[key].name);
    });
    paragraph('Rohmaterialtotal '+job+': '+money(rawTotal)+
      ' · ohne separat hergestellte Vorprodukte');
  });
  heading('Gesamter Materialbedarf je Beruf');
  [
    ['Feldkoch','Feldkoch Total:'],
    ['Schmied','Schmied Total:'],
    ['Quacksalber','Quacksalber Total:'],
    ['Sattelmeister','Sattler Total:']
  ].forEach(([job,title]) => {
    heading(title);
    const materials = {}, outputs = [];
    Object.entries(data.craft).forEach(([key,runs]) => {
      if (recipes[key].job !== job) return;
      outputs.push(fmt(runs)+' × '+items[key].name);
      recipes[key].ingredients.forEach(([child,c]) => {
        materials[child] = (materials[child] || 0)+c*runs;
      });
    });
    if (!outputs.length) {
      paragraph('Kein Material benötigt · Total 0 $');
      return;
    }
    paragraph('Herzustellen: '+outputs.join(' · '));
    table(materials,'Total Materialeinsatz');
  });
  paragraph('Die Berufssummen enthalten Vorprodukte. Diese Geldbeträge nicht addieren: '+
    'Vorprodukte werden zwischen den Berufen weitergegeben. '+
    'Der Rohmaterialwert oben zählt alles nur einmal. '+
    'Ohne Rezeptkauf, Arbeitszeit und Handwerkerlohn. '+
    'Vorhandene Inventarbestände werden nicht abgezogen.','note');
}
function filter(preferred=product.value) {
  const query = normal(search.value);
  const matches = ids.filter(id => normal(items[id].name).includes(query));
  product.replaceChildren();
  matches.forEach(id => {
    const option = element('option',items[id].name+' · '+recipes[id].job,product);
    option.value = id;
  });
  product.disabled = !matches.length;
  if (matches.includes(preferred)) product.value = preferred;
  $('#coverage').textContent = matches.length+' von '+ids.length+
    ' Produkten · Suchfeld leeren für die vollständige Liste.';
  update();
}
quantity.value = get('old-quantity',100);
search.addEventListener('input',() => filter());
product.addEventListener('change',update);
quantity.addEventListener('input',update);
filter(get('old-product','2737000'));
})();

