# Dieta keto — mój plan

Plan żywieniowy na 7 dni przeliczany pod masę ciała i zapotrzebowanie: wybór posiłków z par,
licznik węglowodanów z ruchomym sufitem, osobna pula węgli na dni treningowe, lista zakupów
generowana z faktycznych wyborów i faktycznych gramatur, przepisy.

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

## Sprawdzenie wersji

Na dole zakładki **Ja** jest numer wersji. Jeśli nie zgadza się z tym, co wgrałeś,
telefon trzyma starą kopię w pamięci — patrz niżej.

## Aktualizacja

Po podmianie `index.html` zmień numer w pierwszej linii `sw.js`:

```js
const WERSJA = "dieta-keto-v2";
```

Bez tego telefon będzie serwował starą wersję z cache. Przy następnym otwarciu
aplikacja pokaże pasek „Jest nowsza wersja planu" z przyciskiem odświeżenia.

**Gdy mimo to widzisz starą wersję** (numer w zakładce Ja się nie zmienił):

1. Usuń aplikację z ekranu głównego i dodaj ją ponownie z Safari.
2. Albo w Safari: Ustawienia → Safari → Wyczyść historię i dane witryn.
3. Sprawdź na GitHubie, czy plik `index.html` faktycznie się podmienił — data commita
   musi być świeża.

Ustawienia (waga, płeć, wybory posiłków) przeżywają usunięcie ikony, bo siedzą
w pamięci przeglądarki, a nie w aplikacji.

## Co zmienia płeć

Płeć **nie skaluje porcji** — robi to masa ciała. Dwie osoby o tej samej wadze i tym samym
zapotrzebowaniu dostają identyczny talerz. Płeć wchodzi w pięciu miejscach:

| Gdzie | Mężczyzna | Kobieta |
|---|---|---|
| Stała w równaniu Mifflina–St Jeora | +5 | −161 |
| Zalecana pula węglowodanów | 55 g | 70 g |
| Zalecane białko (na masę całkowitą) | 2,0 g/kg | 1,8 g/kg |
| Dolny próg kalorii | 1500 kcal | 1200 kcal |
| Norma żelaza | 10 mg | 18 mg |

Norma białka **nie różni się** między płciami — to 1,6–2,2 g/kg dla obu. Różnica w zaleceniu
bierze się wyłącznie z tego, że liczymy na masę całkowitą, a nie beztluszczową.

Wyższa pula węglowodanów dla kobiet to nie kurtuazja: bardzo niska podaż węglowodanów razem
z regularnym treningiem obniża T3 i potrafi zaburzyć cykl. Aplikacja ostrzega, gdy kobieta ustawi
poniżej 40 g i ma oznaczone dni treningowe.

## Szacowanie zapotrzebowania

Jeśli nie znasz swojej liczby, w zakładce Ja rozwija się kalkulator: wiek, wzrost, aktywność, cel.
Liczy wzorem Mifflina–St Jeora z mnożnikiem aktywności i korektą celu (−15% redukcja, +10% masa).
Wynik to szacunek z przedziałem błędu około ±10% — punkt wyjścia, nie wyrocznia.

## Czego nie lubię

W zakładce Ja zaznaczasz składniki, których nie chcesz jeść. Aplikacja **przebudowuje przepisy**,
a nie chowa dania:

- **Podmiana** — składnik zostaje zamieniony na równoważny z tej samej roli, a gramatura
  przelicza się tak, żeby zgadzał się ten sam makroskładnik. Kurczak 200 g → indyk 226 g,
  bo obydwa dają dokładnie 43 g białka. Śmietana → jogurt grecki po zawartości tłuszczu.
- **Wypadnięcie z rotacji** tylko wtedy, gdy składnik jest **fundamentem** dania: widnieje
  w nazwie i niesie ponad 35% jego kalorii albo 45% białka. Jajka w „Jajecznicy" — tak.
  Jajka w „Desce śniadaniowej — sery, jajka i warzywa" — nie, tam wystarczy podmiana.
- Gdy oba warianty dnia wypadną, aplikacja dobiera zastępstwo z puli tego samego typu.
  Słodka kolacja zostaje słodką.

Zakładka Ja pokazuje od razu skutki: ile dań przebudowanych, ile wypadło i co zostaje w rotacji.
Gdy zostaje mniej niż dwa dania w którejś puli, dostajesz ostrzeżenie, że tydzień zrobi się monotonny.

Przepis pokazuje wprost, co zostało zamienione i na co. Nazwa dania zostaje oryginalna —
wolę to niż podmienianie jej na siłę i produkowanie łamanej polszczyzny.

Dane: `ZAMIENNIKI` (mapa zamian), `POMIJALNE` (dodatki, które można po prostu usunąć),
`NIEZBEDNE` (składniki bez których danie przestaje istnieć, a nazwa tego nie zdradza).

## Ręczne makroskładniki

W zakładce Ja są trzy pola: białko, tłuszcz, węgle. **Puste = liczone z formuły.**
Wypełnione = program przelicza wszystko pod tę wartość.

Wpisanie tłuszczu zmienia kierunek rachunku: kaloryczność przestaje być celem, a staje się
wynikiem (białko × 4 + tłuszcz × 9 + węgle × 4). Pole „zapotrzebowanie" jest wtedy ignorowane
i aplikacja to napisze.

Wiek i wzrost są teraz zwykłymi polami na górze, a kalkulator Mifflina–St Jeora liczy z nich
na bieżąco i pokazuje różnicę wobec wpisanego zapotrzebowania.

## Wygląd

Przełącznik w zakładce Ja: automatycznie (za ustawieniem telefonu, przełącza się na żywo),
jasny albo ciemny na sztywno. Zmienia też kolor paska systemowego.

## Pomoc — asystent

Zakładka **Pomoc** to baza 18 odpowiedzi na realne problemy: zachcianki, keto grypa, skurcze,
zaparcia, brak siły na treningu, bezsenność, jedzenie na stacji, alkohol, wypadnięcie z diety.
Wyszukiwarka dopasowuje po słowach kluczowych. **Działa bez zasięgu** — cała treść jest w pliku.

Część odpowiedzi ma podpowiedź, co konkretnie zmienić w aplikacji.

Gdy stronę otworzyć na claude.ai jako artefakt, dochodzi **żywy czat z Claude**, który dostaje
Twój profil i ustawienia jako kontekst. Na GitHub Pages tego nie ma — `window.claude` tam nie
istnieje — więc zamiast tego jest przycisk wyszukiwania w internecie.

## Jak działa przeliczanie

W zakładce **Ja** podajesz płeć, masę ciała i zapotrzebowanie. Reszta wynika z hierarchii makroskładników:

1. **Białko = masa × g/kg.** Nietykalne, niezależne od kaloryczności.
2. **Węglowodany = Twoja pula** (30–70 g), plus dodatek w dni treningowe.
3. **Tłuszcz domyka kalorie.** To on się rozciąga i kurczy.

Aplikacja rozwiązuje układ trzech równań (białko / węglowodany / kalorie) z trzema niewiadomymi —
współczynnikami skalującymi dla składników białkowych, tłuszczowych i węglowodanowych.
Warzywa, owoce i przyprawy zostają nieruszone, bo to z nich bierze się błonnik i mikroskładniki.

Gdy cele są nie do pogodzenia — na przykład 110 kg przy 1700 kcal — aplikacja **nie udaje**,
że wszystko gra. Pokazuje, o ile się rozjeżdża i dlaczego.

## Dni treningowe

Oznaczasz je stuknięciem w kalendarzyk w zakładce Ja albo przyciskiem w Planie.
Dodatkowe węglowodany (domyślnie +40 g) lądują jako **jedna nazwana porcja** ryżu, batata
albo ziemniaków — w obiedzie, jeśli trenujesz rano, w kolacji, jeśli po południu.
Widać ją osobno w przepisie i wchodzi do listy zakupów.

Taki dzień wychodzi z ketozy i tak ma być: glikogen odbudowuje się z jedzenia, a nie
z rozbierania mięśni na glukoneogenezę.

## Co jest w menu

**22 dania i 5 surówek.**

| Grupa | Ile | Co nowego |
|---|---|---|
| Posiłek 1 | 7 | szakszuka z fetą, omlet caprese z mozzarellą, deska serów bez gotowania |
| Obiad | 6 | dorsz z surówką z selera, zapiekanka z indyka z serem |
| Kolacja wytrawna | 5 | sałatka grecka z fetą, cezar z parmezanem, deska serów z kiszoną kapustą |
| Kolacja na słodko | 4 | krem z mascarpone z truskawkami, twarożek z jeżynami |
| Surówki | 5 | kiszona kapusta, biała kapusta, mizeria, seler, rzodkiewka |

Sery w menu: feta, mozzarella, parmezan, camembert, gouda, mascarpone, twaróg, skyr, jogurt grecki.
Owoce niskowęglowodanowe: truskawki, jeżyny, maliny, borówki — od 4,3 do 12 g węglowodanów na 100 g.

Każdy dzień daje wybór między słodką a wytrawną kolacją, a wszystkie 22 dania są w rotacji tygodniowej.

## Dodatki do dnia

Pod trzema posiłkami wybierasz **surówkę** i **orzechy**. Oba wchodzą do układu równań
razem z posiłkami, więc reszta talerza się o nie kurczy i cele dalej się zgadzają.

Orzechy: migdały, włoskie, makadamia, laskowe, pekan, pestki dyni, mix.
Makadamia mają najniższe węglowodany (5 g/100 g), migdały najwięcej błonnika,
włoskie jako jedyne realną porcję omega-3. W mixie orzech brazylijski jest jeden —
trzy dziennie to górna granica bezpieczeństwa dla selenu.

## Surówki

Surówka to **dodatek do dnia**, nie osobny posiłek — wybierasz ją w Planie pod trzema posiłkami.
Nie dokleja się do sumy po cichu: wchodzi do układu równań razem z posiłkami, więc kiedy ją
dodasz, reszta talerza odpowiednio się skurczy i cele dalej się zgadzają.

Węglowodany na porcję: rzodkiewka 3,6 g · mizeria 5,4 g · seler 6,9 g · biała kapusta 7,2 g ·
kiszona kapusta 7,4 g.

## Zmiana danych

Wszystko siedzi w `index.html`, w sekcji oznaczonej `rdzeń`:

- `NUTR` — wartości odżywcze na 100 g: `[kcal, białko, tłuszcz, węgle, błonnik]`.
  Makro posiłków **liczą się z tej bazy**, nie są wpisane z ręki — zmiana gramatury od razu zmienia wynik.
- `UNIT` — ile gramów przypada na jednostkę kuchenną (łyżka, sztuka, miarka). Z tego generują się
  opisy typu „4 łyżki" i odmieniają się przez przypadki.
- `MEALS` — dwadzieścia dwa dania.
- `WIEDZA` — wpisy asystenta: `t` tytuł, `s` słowa kluczowe do wyszukiwania, `a` treść, `fix` podpowiedź. W składniku ostatnie pole to koszyk skalowania:
  `B` białko · `T` tłuszcz · `W` węglowodany · `X` nieskalowane (warzywa, owoce, przyprawy).
- `DAYS` — które dwa dania trafiają w dany dzień do którego slotu.
- `SUROWKI` i `ORZECHY` — dodatki do dnia; `DANIE` to połączenie obu, używane przy wyszukiwaniu po id.
- `ZAL` — wartości zalecane i progi ostrzeżeń dla każdej płci.

## Zakres planu

Domyślnie mężczyzna, 85 kg i 2400 kcal, 2,0 g białka na kilogram, 55 g węglowodanów bazowo
i +40 g w dni treningowe. Wszystko do zmiany w zakładce Ja. Bez podrobów, baraniny i owoców morza poza rybami. Odżywka: izolat białka wołowego.

Plan idzie świadomie poniżej polskiej normy referencyjnej 130 g węglowodanów. Przy takim zakresie
warto pilnować sodu (3–5 g/d) i robić lipidogram oraz morfologię raz na pół roku.
