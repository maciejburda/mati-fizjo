# Mateusz Brzeziński, fizjoterapia dziecięca, Gdańsk

Statyczna strona wizytówka. Bez zależności, bez builda, czysty HTML, CSS i odrobina JS.

## Struktura

```
index.html              treść strony
assets/css/styles.css   style (tokeny kolorów i typografii na górze pliku)
assets/js/main.js       menu mobilne, nagłówek, animacje wejścia
assets/img/             zdjęcia
```

## Dane kontaktowe

Wpisane na stałe w `index.html` w trzech miejscach, które trzeba zmienić razem:

- przycisk w nagłówku (`.head-tel`): `tel:` + widoczny numer + `aria-label`
- lista w sekcji Kontakt: telefon, e-mail, adres, link do Booksy
- blok `application/ld+json` na dole pliku (dane strukturalne dla Google)

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Następnie otwórz <http://localhost:8000>.

## Publikacja

Strona jest hostowana na GitHub Pages z gałęzi `main` (katalog główny).
Każdy push do `main` aktualizuje stronę.

## Własna domena

W ustawieniach repozytorium → Pages → Custom domain wpisz domenę,
a w DNS dodaj rekordy `A` na adresy GitHub Pages (lub `CNAME` dla subdomeny).
GitHub utworzy wtedy plik `CNAME` w repozytorium.

## Uwagi techniczne

- Ścieżki do zasobów są **względne**, więc strona działa zarówno pod
  `https://<user>.github.io/mati-fizjo/`, jak i pod własną domeną.
- Po podpięciu domeny zaktualizuj `og:url` i `og:image` w `index.html`.
- Jeśli `git` zwraca błąd o licencji Xcode, użyj:
  `sudo xcodebuild -license accept` albo
  `sudo xcode-select -s /Library/Developer/CommandLineTools`.
