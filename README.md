# Mateusz Brzeziński, fizjoterapia dziecięca, Gdańsk

Statyczna strona wizytówka. Bez zależności, bez builda, czysty HTML, CSS i odrobina JS.

## Struktura

```
index.html              treść strony
assets/css/styles.css   style (tokeny kolorów i typografii na górze pliku)
assets/js/main.js       menu mobilne, nagłówek, animacje wejścia
assets/img/             zdjęcia
```

## Do uzupełnienia

W treści są wyraźnie oznaczone miejsca (`[W NAWIASACH KWADRATOWYCH]`, klasa `.ph`):

| Placeholder             | Gdzie                   |
| ----------------------- | ----------------------- |
| `[NUMER TELEFONU]`      | sekcja Kontakt          |
| `[ADRES E-MAIL]`        | sekcja Kontakt          |
| `[ADRES GABINETU]`      | sekcja Kontakt          |
| `[GODZINY PRZYJĘĆ]`     | sekcja Kontakt          |
| `[OBSZAR DOJAZDU]`      | sekcja Cennik           |
| `[WKLEJ LINK DO REZERWACJI, np. Booksy]` | sekcja Kontakt |
| telefon w nagłówku      | `.head-tel`, atrybut `href` |

Po wpisaniu prawdziwej wartości usuń `<span class="ph">…</span>` i zostaw sam tekst.
Dla telefonu i e-maila warto zamienić je na odnośniki:

```html
<a href="tel:+48000000000">+48 000 000 000</a>
<a href="mailto:kontakt@example.pl">kontakt@example.pl</a>
```

Link do rezerwacji online: podmień `href="#"` przy przycisku „Rezerwacja online”
i usuń atrybut `data-ph-link`.

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
