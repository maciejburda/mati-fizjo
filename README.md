# Mateusz Brzeziński — fizjoterapia dziecięca, Gdańsk

Statyczna strona pod GitHub Pages. Bez frameworka, bez zależności.
Domena: https://brzezinskifizjo.pl

## Jak to jest zbudowane

Stron jest dziewięć i wszystkie dzielą ten sam nagłówek, stopkę i baner zgody.
Trzymanie tego w dziewięciu kopiach kończy się rozjechaniem, więc strony są
składane z szablonu jednym skryptem.

```
src/layout.html      wspólna oprawa (head, nagłówek, stopka, baner)
src/pages/*.html     treść każdej strony + nagłówek JSON z metadanymi
build.mjs            skleja jedno z drugim
```

### Edycja treści

**Edytuj pliki w `src/pages/`, nie te w katalogu głównym.** Pliki `.html`
na górze są generowane i każde uruchomienie builda je nadpisze (mają o tym
komentarz w pierwszej linii).

```bash
node build.mjs
```

Skrypt tworzy strony `.html` w katalogu głównym oraz `sitemap.xml`.
Potem commit i push — GitHub Pages wdroży resztę.

### Nagłówek strony

Każdy plik w `src/pages/` zaczyna się blokiem JSON między `---`:

```json
{
  "slug": "cennik",
  "title": "tytuł w zakładce i w wynikach Google",
  "description": "opis w wynikach wyszukiwania, do ~160 znaków",
  "priority": "0.9",
  "noindex": false,
  "jsonld": { }
}
```

`slug` to nazwa pliku wynikowego (`index` daje `index.html`).
`noindex` wyłącza stronę z sitemapy i dodaje meta robots.
`jsonld` trafia do strony jako dane strukturalne.

## Struktura

```
index.html                    strona główna
fizjoterapia-niemowlat.html   niemowlęta
fizjoterapia-dzieci.html      dzieci przedszkolne i szkolne
metody-terapii.html           NDT-Bobath, powięź, techniki manualne
wizyty-domowe.html            dojazd, Trójmiasto
cennik.html                   trzy usługi
o-mnie.html                   doświadczenie
kontakt.html                  telefon, adres, Booksy
polityka-prywatnosci.html     RODO, noindex
robots.txt / sitemap.xml      dla wyszukiwarek
```

## Analityka

Google Analytics 4 (`G-3QTL1RMF05`) z Consent Mode v2. Do czasu zgody
nie powstaje żadne cookie. Kliknięcia w rezerwację wysyłają zdarzenie
`rezerwacja_klik` z parametrem `miejsce`.

## Podgląd lokalny

Dowolny serwer statyczny na katalogu głównym, np.

```bash
npx --yes serve .
```

## Domena

`brzezinskifizjo.pl` to domena główna (plik `CNAME`).
`brzezińskifizjo.pl` przekierowuje na nią z osobnego repozytorium
`brzezinskifizjo-redirect`.

Jeśli `git` zwraca błąd o licencji Xcode:
`sudo xcodebuild -license accept`
