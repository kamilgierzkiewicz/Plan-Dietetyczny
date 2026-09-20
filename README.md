# Dieta keto

Plan żywieniowy na 7 dni: wybór posiłków z par, licznik węglowodanów z sufitem 70 g, lista zakupów generowana z faktycznych wyborów, przepisy.

Aplikacja jest statyczna — bez backendu, bez budowania. Wybory i odhaczone zakupy siedzą w `localStorage` przeglądarki.

## Pliki

```
index.html                 cała aplikacja (HTML + CSS + JS w jednym)
manifest.webmanifest       ustawienia PWA
sw.js                      service worker — tryb offline
icon-192.png               ikona
icon-512.png               ikona
icon-maskable-512.png      ikona Android z marginesem
apple-touch-icon.png       ikona ekranu głównego iOS
favicon-32.png             ikona karty przeglądarki
```

Wszystkie ścieżki są **względne**, więc repozytorium działa w podkatalogu GitHub Pages
(`uzytkownik.github.io/dieta-keto/`) bez żadnych zmian.

## Wrzucenie na GitHub Pages

1. Nowe repozytorium, np. `dieta-keto`, publiczne.
2. Wrzuć wszystkie pliki do katalogu głównego repozytorium — nie do podfolderu.
3. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
4. Po minucie–dwóch strona jest pod `https://TWOJA-NAZWA.github.io/dieta-keto/`.

## Dodanie na ekran główny iPhone'a

Otwórz adres w **Safari** (nie w Chrome — tam nie zadziała), przycisk udostępniania → **Dodaj do ekranu początkowego**.

Aplikacja odpala się wtedy na pełnym ekranie, bez paska adresu, i działa bez zasięgu.

## Aktualizacja

Po podmianie `index.html` zmień numer w pierwszej linii `sw.js`:

```js
const WERSJA = "dieta-keto-v2";
```

Bez tego telefon będzie serwował starą wersję z cache. Przy następnym otwarciu
aplikacja pokaże pasek „Jest nowsza wersja planu" z przyciskiem odświeżenia.

## Zmiana danych

Wszystko siedzi w `index.html` w sekcji `DANE`:

- `MEALS` — dwanaście dań: nazwa, czas, kcal, białko, tłuszcz, węgle, błonnik, składniki, wykonanie.
  W składniku ostatnie pole to kategoria na liście zakupów: `bialko`, `tluszcz`, `warzywa`, `wegle`, `dodatki`.
- `DAYS` — które dwa dania trafiają w dany dzień do którego slotu.

Makro w kartach są policzone ręcznie, nie sumują się ze składników. Jeśli zmienisz gramaturę,
popraw też `k`, `b`, `f`, `c`, `fb` w tym samym obiekcie.

## Zakres planu

2400 kcal, ok. 170 g białka, węglowodany 30–70 g z podziałem: rano tylko warzywa, obiad 26–31 g,
kolacja 13–29 g. Bez podrobów, baraniny i owoców morza poza rybami. Odżywka: izolat białka wołowego.

Plan idzie świadomie poniżej polskiej normy referencyjnej 130 g węglowodanów. Przy takim zakresie
warto pilnować sodu (3–5 g/d) i robić lipidogram oraz morfologię raz na pół roku.
