# 📋 PM Toolbox – Project Readiness Assessment

> Interaktywna ankieta oceny gotowości projektu do startu.
> Narzędzie dla Project Managerów do szybkiej diagnozy stanu projektu
> przed uruchomieniem realizacji.

**Wersja:** 1.0.0
**Ostatnia aktualizacja:** Maj 2026
**Technologia:** HTML / CSS / JavaScript (zero zależności)

---

## 📖 Spis treści

1. [Co to jest?](#-co-to-jest)
2. [Po co to powstało?](#-po-co-to-powstało)
3. [Jak to działa?](#-jak-to-działa)
4. [Struktura ankiety](#-struktura-ankiety)
5. [System scoringu](#-system-scoringu)
6. [Wyniki i rekomendacje](#-wyniki-i-rekomendacje)
7. [Funkcje UX](#-funkcje-ux)
8. [Definicje pojęć](#-definicje-pojęć)
9. [Jak uruchomić?](#-jak-uruchomić)
10. [Dla kogo?](#-dla-kogo)
11. [Ograniczenia i plany rozwoju](#-ograniczenia-i-plany-rozwoju)

---

## 🎯 Co to jest?

**PM Toolbox – Project Readiness Assessment** to jednoplikowe narzędzie webowe
(pojedynczy plik `.html`) umożliwiające Project Managerowi przeprowadzenie
ustrukturyzowanej oceny gotowości projektu przed jego formalnym startem.

Narzędzie działa w **każdej przeglądarce**, bez instalacji, bez serwera,
bez połączenia z internetem. Wystarczy otworzyć plik HTML.

### Czym NIE jest

- ❌ Nie jest systemem do zarządzania projektami (nie zastępuje Jiry, MS Project itp.)
- ❌ Nie zapisuje danych – każde odświeżenie strony resetuje ankietę
- ❌ Nie jest audytem formalnym ani narzędziem do raportowania do zarządu
- ❌ Nie ocenia postępu projektu w trakcie realizacji

---

## 💡 Po co to powstało?

### Problem

Projekty często startują z istotnymi lukami:

- Niejasny cel lub brak wspólnego rozumienia zakresu
- Brak wyznaczonego sponsora lub governance
- Harmonogram narzucony bez weryfikacji z zespołem
- Ryzyka niezidentyfikowane przed startem
- Brak planu komunikacji z interesariuszami

Efekt: projekty wchodzą w realizację nieprzygotowane, co generuje
opóźnienia, konflikty i przeplanowania już w pierwszych tygodniach.

### Rozwiązanie

Ankieta wymusza na PM ustrukturyzowane myślenie o **5 kluczowych obszarach**
gotowości projektu jeszcze przed startem. Wynik wskazuje:

- Gdzie są największe luki (scoring per obszar)
- Co konkretnie zrobić, żeby je zamknąć (next steps per obszar)
- Jakie akcje podjąć w jakiej kolejności (dynamiczny plan naprawczy)

### Kiedy używać?

| Moment | Zastosowanie |
|---|---|
| **Pre-kick-off** | Ocena czy projekt jest gotowy do uruchomienia |
| **Gate review** | Weryfikacja gotowości przed przejściem do kolejnej fazy |
| **Onboarding PM** | Szybka diagnoza projektu przejętego od innej osoby |
| **Portfolio review** | Porównanie poziomu przygotowania wielu projektów |
| **Retrospektywa** | Analiza co było niedoprzygotowane na starcie |

---

## ⚙️ Jak to działa?

### Przepływ działania

```
Użytkownik otwiera plik HTML
│
▼
Wypełnia 10 pytań (skala 1–5)
każde pytanie = jeden aspekt gotowości
│
▼
Klika "Generuj podsumowanie"
│
▼
Silnik scoringowy oblicza:
• Wynik globalny (% gotowości)
• Wynik per sekcja (% per obszar)
│
▼
Renderowane są wyniki:
• Ogólny status (🔴/🟡/🟢)
• Breakdown per obszar z paskiem postępu
• Next step dla PM per obszar
• Dynamiczny plan działań naprawczych
```

### Architektura techniczna

Narzędzie to **Single File Application** – cały kod (HTML, CSS, JS)
zawarty jest w jednym pliku bez zewnętrznych zależności.

```
index.html
├── <head>
│ └── <style> – cały CSS (layout, komponenty, responsywność)
├── <body>
│ ├── <header> – nagłówek narzędzia
│ ├── <main>
│ │ ├── #progressWrap – sticky progress bar
│ │ ├── <form#surveyForm> – 10 pytań w 5 sekcjach
│ │ │ ├── .question (×10) – karty pytań
│ │ │ │ ├── .question-title – tytuł + przycisk tooltipa
│ │ │ │ ├── .tooltip-body – wskazówki PM (click-toggle)
│ │ │ │ └── .option (×5) – opcje odpowiedzi
│ │ │ │ ├── .option-header – radio + bold label
│ │ │ │ └── .option-detail – rozwijany opis (CSS only)
│ │ │ └── <textarea> – pole uwag PM
│ │ └── #result – sekcja wyników (hidden → visible po obliczeniu)
│ │ ├── #resultHeader – ogólny wynik
│ │ ├── #breakdownGrid – karty per obszar
│ │ ├── #actionPlan – dynamiczny plan naprawczy
│ │ └── .legend-table – tabela skali oceny
│ └── <script> – cała logika JS
```


### Kluczowe funkcje JavaScript

| Funkcja | Opis |
|---|---|
| `calculateScore()` | Główna funkcja – waliduje, oblicza wyniki, wywołuje rendery |
| `renderHeader(pct)` | Renderuje ogólny wynik z kolorem i opisem statusu |
| `renderBreakdown(sectionScores)` | Renderuje karty per obszar z paskiem postępu i next stepem |
| `renderActionPlan(sectionScores)` | Generuje posortowany plan działań naprawczych |
| `toggleTip(btn)` | Otwiera/zamyka tooltip po kliknięciu (mobile-friendly) |
| `highlightSelected(radio)` | Podświetla wybraną opcję i rozwija jej opis |
| `updateProgress()` | Aktualizuje pasek postępu i licznik wypełnionych pytań |
| `resetSurvey()` | Resetuje cały stan formularza i widok wyników |

---

## 📐 Struktura ankiety

Ankieta składa się z **10 pytań** pogrupowanych w **5 obszarów tematycznych**.
Każde pytanie oceniane jest na **skali 1–5**.
```
┌─────────────────────────────────────────────────────────┐
│ OBSZAR 1: Strategia i cele (pytania 1–2) │
│ OBSZAR 2: Zakres i wymagania (pytania 3–4) │
│ OBSZAR 3: Governance i zespół (pytania 5–6) │
│ OBSZAR 4: Planowanie i ryzyka (pytania 7–8) │
│ OBSZAR 5: Komunikacja i gotowość (pytania 9–10) │
└─────────────────────────────────────────────────────────┘
```


### Pytania szczegółowe

| # | Pytanie | Obszar |
|---|---|---|
| 1 | Czy cel projektu jest jasno opisany? | Strategia i cele |
| 2 | Czy istnieje opis happy path / procesu docelowego? | Strategia i cele |
| 3 | Czy zakres projektu został uzgodniony? | Zakres i wymagania |
| 4 | Czy wymagania biznesowe są gotowe? | Zakres i wymagania |
| 5 | Czy role i odpowiedzialności są zdefiniowane? | Governance i zespół |
| 6 | Czy sponsor projektu jest aktywnie zaangażowany? | Governance i zespół |
| 7 | Czy harmonogram jest realistyczny? | Planowanie i ryzyka |
| 8 | Czy ryzyka projektu zostały zidentyfikowane? | Planowanie i ryzyka |
| 9 | Czy istnieje plan komunikacji? | Komunikacja i gotowość |
| 10 | Czy organizacja jest gotowa do startu projektu? | Komunikacja i gotowość |

---

## 📊 System scoringu

### Obliczanie wyniku globalnego

Każde pytanie daje od 1 do 5 punktów.
Maksymalny wynik to **50 punktów** (10 pytań × 5 punktów).

$$\text{Wynik globalny [\%]} = \frac{\sum_{i=1}^{10} \text{odpowiedź}_i}{50} \times 100$$

### Obliczanie wyniku per obszar

Każdy obszar składa się z 2 pytań, maksimum to **10 punktów**.

$$\text{Wynik obszaru [\%]} = \frac{\text{pytanie}_A + \text{pytanie}_B}{10} \times 100$$

### Progi oceny

| Wynik | Status | Interpretacja |
|---|---|---|
| **0–49%** | 🔴 Niegotowy | Projekt wymaga gruntownego przygotowania przed startem |
| **50–79%** | 🟡 Częściowo gotowy | Projekt może startować warunkowo po zamknięciu kluczowych luk |
| **80–100%** | 🟢 Gotowy | Projekt ma odpowiedni poziom przygotowania do realizacji |

### Progi rekomendacji per obszar

Ten sam trójstopniowy próg stosowany jest do każdego obszaru osobno,
co pozwala wykryć słabe punkty nawet gdy wynik globalny jest wysoki.

| Wynik obszaru | Tier | Typ rekomendacji |
|---|---|---|
| 0–49% | `low` | Akcje priorytetowe HIGH – blokery startu |
| 50–79% | `med` | Akcje uzupełniające MED – luki do zamknięcia |
| 80–100% | `high` | Brak akcji – monitoruj i utrzymuj |

---

## 📋 Wyniki i rekomendacje

### Co generuje narzędzie po wypełnieniu?

#### 1. Ogólny wynik gotowości

Duży, kolorowy blok z procentem gotowości i opisem statusu.
Kolor tła odpowiada progowi (czerwony / żółty / zielony).

#### 2. Breakdown per obszar

5 kart – jedna per obszar – zawierających:
- Pasek postępu (wizualizacja % wyniku dla obszaru)
- Wynik liczbowy (np. `7/10 pkt · 70%`)
- **Next step dla PM** – konkretna rekomendacja dopasowana do poziomu wyniku

Każdy obszar ma 3 wersje rekomendacji (low / med / high),
dobierane automatycznie na podstawie uzyskanego wyniku.

#### 3. Dynamiczny plan działań naprawczych

Lista konkretnych akcji wygenerowana tylko dla obszarów z wynikiem < 80%.
Akcje posortowane według priorytetu: **Wysoki → Średni → Niski**.

Każda akcja zawiera:
- Etykietę priorytetu (Wysoki / Średni / Niski)
- Nazwę obszaru, z którego pochodzi
- Treść akcji do podjęcia przez PM

Jeśli wszystkie obszary mają wynik ≥ 80%, plan akcji wyświetla
komunikat o braku wymaganych działań naprawczych.

---

## 🖥️ Funkcje UX

### Progress bar (sticky)

Pasek postępu przyklejony do górnej krawędzi ekranu.
Aktualizuje się w czasie rzeczywistym po każdej odpowiedzi.
Pokazuje liczbę wypełnionych pytań (np. `Wypełniono: 6 / 10 pytań`).

### Tooltips (click-toggle, mobile-friendly)

Przycisk `?` przy każdym pytaniu otwiera panel z pytaniami
pomocniczymi dla PM. Działa przez kliknięcie/tap (nie hover),
dzięki czemu jest w pełni funkcjonalny na urządzeniach dotykowych.
Kliknięcie poza tooltipem zamyka go automatycznie.

### Rozwijane opisy opcji

Po wybraniu opcji pojawia się jej szczegółowy opis:
lista bullet points i praktyczna wskazówka `👉 W praktyce`.
Mechanizm działa czysto w CSS (klasa `.selected` + `display:block`
na `.option-detail`) – bez dodatkowego JavaScriptu.

### Highlight wybranej opcji

Zaznaczona opcja zmienia tło na niebieskie i wytłuszcza tekst.
Karta pytania zmienia obramowanie na granatowe po udzieleniu odpowiedzi.

### Walidacja inline

Brak odpowiedzi na pytanie nie powoduje `alert()`.
Zamiast tego: pierwsze nieuzupełnione pytanie jest przewijane
do widoku, obramowanie karty zmienia kolor na czerwony,
a obok tytułu pojawia się komunikat `← uzupełnij`.
Po 3 sekundach błąd jest automatycznie usuwany.

### Badge per sekcja

Po wygenerowaniu wyników, przy każdym nagłówku sekcji
pojawia się kolorowy badge z wynikiem procentowym obszaru
(czerwony / żółty / zielony).

### Responsywność (mobile-first)

- `box-sizing: border-box` globalnie
- `clamp()` na rozmiarach czcionek i paddingach
- `auto-fill` grid w breakdownie wyników
- Brak stałych szerokości tooltipów wychodzących poza ekran
- Elementy dotykowe mają wystarczający obszar tap target

### Reset

Przycisk `↺ Wypełnij ponownie` całkowicie resetuje stan narzędzia:
formularz, wyniki, podświetlenia opcji, badge'e sekcji, tooltips i progress bar.

---

## 📚 Definicje pojęć

### Project Readiness Assessment
Ustrukturyzowana ocena stanu przygotowania projektu przed jego formalnym
uruchomieniem. Celem jest identyfikacja luk organizacyjnych, procesowych
i dokumentacyjnych, które mogą zagrozić powodzeniu projektu.

### Happy Path
Główna, optymistyczna ścieżka przepływu procesu – scenariusz, w którym
wszystko działa zgodnie z planem, bez wyjątków ani błędów. Opisuje
docelowe działanie systemu lub procesu krok po kroku dla standardowego użytkownika.

### Scope (Zakres)
Granice projektu definiujące co jest, a co nie jest przedmiotem realizacji.

- **IN scope** – elementy objęte projektem, które zostaną dostarczone
- **OUT scope** – elementy świadomie wyłączone z projektu

### Scope Creep
Niekontrolowane rozszerzanie zakresu projektu w trakcie realizacji,
bez formalnej oceny wpływu na harmonogram, budżet i zasoby.
Najczęstsza przyczyna przekroczeń czasowych i kosztowych.

### Sponsor projektu
Osoba posiadająca uprawnienia decyzyjne i odpowiedzialność biznesową
za projekt. Zatwierdza zakres i budżet, usuwa strategiczne blokery,
chroni priorytety projektu wobec innych inicjatyw organizacji.

### RACI
Macierz odpowiedzialności definiująca role wobec każdego zadania lub obszaru:

| Litera | Słowo | Znaczenie |
|---|---|---|
| **R** | Responsible | Osoba wykonująca zadanie |
| **A** | Accountable | Osoba odpowiedzialna za wynik (decydent, właściciel) |
| **C** | Consulted | Osoba konsultowana przed podjęciem decyzji |
| **I** | Informed | Osoba informowana o wynikach i decyzjach |

### Decision Log
Rejestr podjętych decyzji projektowych zawierający: treść decyzji,
datę podjęcia, osobę decydującą i uzasadnienie. Zapobiega
„przepisywaniu historii" i przyspieszonym zmianom uzgodnionych założeń.

### Risk Register (Rejestr Ryzyk)
Dokument zawierający listę zidentyfikowanych ryzyk projektu wraz z:
oceną prawdopodobieństwa, oceną wpływu, przypisanym ownerem
i planem mitigacji lub planem awaryjnym (contingency plan).

### Mitygacja ryzyka
Działania podejmowane z wyprzedzeniem w celu zmniejszenia
prawdopodobieństwa wystąpienia ryzyka lub jego wpływu na projekt.
Różni się od contingency plan, który jest uruchamiany dopiero
gdy ryzyko się zmaterializuje.

### Contingency Plan (Plan Awaryjny)
Gotowy scenariusz działania na wypadek materializacji konkretnego ryzyka.
Odpowiada na pytanie: „co robimy, gdy X się wydarzy?"

### Kamień milowy (Milestone)
Kluczowy punkt kontrolny w harmonogramie projektu, oznaczający
zakończenie istotnego etapu lub dostarczenie określonego produktu.
Nie ma czasu trwania – jest zdarzeniem, nie zadaniem.

### Krytyczna ścieżka (Critical Path)
Najdłuższa sekwencja zależnych od siebie zadań w projekcie,
której opóźnienie bezpośrednio powoduje opóźnienie całego projektu.
Zadania na krytycznej ścieżce nie mają rezerwy czasowej (float = 0).

### Interesariusz (Stakeholder)
Każda osoba lub grupa, która ma wpływ na projekt lub jest przez niego
dotknięta. Dzieli się na:

- **Interesariusze wewnętrzni** – sponsor, zespół projektowy, inne zespoły organizacji
- **Interesariusze zewnętrzni** – klienci, dostawcy, regulatorzy

### Plan komunikacji
Dokument określający: kto komunikuje, co komunikuje, do kogo, jak często
i w jakiej formie. Zwykle przyjmuje formę matrycy komunikacji
z przypisaniem typów raportów do grup interesariuszy.

### Governance projektu
Struktura decyzyjna i nadzorcza projektu. Obejmuje:
zdefiniowane role i odpowiedzialności, fora decyzyjne (np. steering committee),
procesy eskalacji i raportowania oraz mechanizmy zarządzania zmianami.

### BRD (Business Requirements Document)
Dokument opisujący wymagania biznesowe projektu – co organizacja chce
osiągnąć i jakie potrzeby ma zaspokoić. Stanowi podstawę do tworzenia
wymagań funkcjonalnych i technicznych.

### Change Request (Wniosek o zmianę)
Formalny wniosek o modyfikację zatwierdzonego zakresu, harmonogramu
lub budżetu projektu. Wymaga oceny wpływu i akceptacji przez sponsora
lub steering committee przed wprowadzeniem zmiany.

### Bottom-up Estimation
Technika szacowania harmonogramu i kosztów projektu polegająca na
estymowaniu poszczególnych zadań przez osoby je wykonujące,
a następnie agregowaniu wyników do poziomu projektu.
Przeciwieństwo top-down (estymaty narzucane odgórnie).

### Steering Committee
Komitet sterujący projektu – organ decyzyjny wyższego szczebla,
zwykle złożony ze sponsora, kluczowych interesariuszy biznesowych
i technicznych. Zatwierdza strategiczne zmiany, przegląda status
i rozstrzyga konflikty eskalowane przez PM.

---

## 👥 Dla kogo?

### Główni odbiorcy

| Rola |	Jak używa |
|---|---|
|Project Manager |	Diagnoza gotowości własnego projektu przed startem |
|PMO |	Standaryzacja oceny gotowości projektów w portfolio |
|Sponsor projektu |	Szybki przegląd luk przed podjęciem decyzji o starcie |
|Program Manager |	Gate review przed wejściem projektu do kolejnej fazy |
|Konsultant / PM coach |	Narzędzie diagnostyczne przy onboardingu do projektu klienta |

### Kiedy NIE używać

- Do projektów w trakcie realizacji (narzędzie ocenia gotowość do startu)
- Jako jedyne źródło decyzji o starcie projektu (to narzędzie wspomagające, nie zastępuje oceny PM)
- Do formalnych audytów wymagających udokumentowanego procesu i narzędzi certyfikowanych

## 🔧 Ograniczenia i plany rozwoju

### Aktualne ograniczenia

| Ograniczenie | Opis |
|---|---|
| Brak persystencji |	Dane nie są zapisywane – odświeżenie strony resetuje ankietę |
| Brak eksportu |	Wyniki nie mogą być wyeksportowane do PDF ani CSV |
| Równe wagi pytań |	Wszystkie pytania mają taką samą wagę w scoringu |
| Brak historii |	Nie można porównać wyników z różnych dat |
| Brak multi-user |	Ankieta nie obsługuje współpracy wielu osób jednocześnie |

### Potencjalne kierunki rozwoju 

- Eksport do PDF – window.print() z dedykowanym print stylesheet
- Zapis w localStorage – przywracanie stanu po zamknięciu przeglądarki
- Ważone pytania – różne wagi dla różnych obszarów
- Radar chart – wizualizacja 5 obszarów jako wykres pajęczynowy (SVG)
- Tryb porównawczy – zestawienie wyników dwóch projektów obok siebie
-  Parametryzacja URL – ?project=NazwaProjektu do pre-fillowania nagłówka raportu
-  Wersja wielojęzyczna – EN / PL toggle
-  Tryb PMO – zapis wyników wielu projektów i ranking gotowości portfolio
