// ─────────────────────────────────────────────
// data.js — single source of truth for all content
// Questions are defined here; HTML is generated from this data.
// ─────────────────────────────────────────────

export const SCORING = {
  QUESTIONS_TOTAL: 10,
  MAX_PER_QUESTION: 5,
  TIER_HIGH_MIN: 80,   // % >= this → "high" (ready)
  TIER_MED_MIN:  50,   // % >= this → "medium" (partial)
                       // below TIER_MED_MIN → "low" (not ready)
};

export const TIER_META = {
  low:    { label: 'Projekt niegotowy do startu', icon: '🔴', cssClass: 'low',    desc: 'Projekt wymaga doprecyzowania zakresu, governance oraz planu realizacji przed uruchomieniem.' },
  medium: { label: 'Częściowa gotowość',          icon: '🟡', cssClass: 'medium', desc: 'Projekt może zostać uruchomiony warunkowo, ale wymaga zamknięcia kluczowych luk.' },
  high:   { label: 'Projekt gotowy do startu',    icon: '🟢', cssClass: 'high',   desc: 'Projekt posiada odpowiedni poziom przygotowania organizacyjnego i operacyjnego.' },
};

// ── Option definitions are reused for both HTML render and JSON export ──────

const SCORE_OPTIONS = [
  // Each option: { value, label, bullets, hint }
  // Defined per-question below inside SECTIONS[].questions[].options
];

export const SECTIONS = [
  {
    id: 's1',
    label: 'Strategia i cele',
    questions: [
      {
        id: 'q1',
        title: 'Czy cel projektu jest jasno opisany?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy wiadomo jaki problem biznesowy rozwiązujemy?',
            'Czy istnieje wspólne rozumienie celu?',
            'Czy interesariusze akceptują rezultat projektu?',
            'Czy wiadomo co oznacza sukces wdrożenia?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Cel projektu nie został określony',
            bullets: [
              'Nikt nie potrafi jednoznacznie powiedzieć, po co robimy ten projekt',
              'Brak jakiegokolwiek dokumentu lub ustalenia opisującego cel',
              'Różne osoby mają zupełnie różne wyobrażenia o tym, co ma powstać',
            ],
            hint: 'każdy rozumie projekt inaczej i nie ma jednej wersji prawdy',
          },
          {
            value: 2, label: '2 — Cel jest ogólny i różnie rozumiany',
            bullets: [
              'Istnieje hasłowy opis celu, np. „usprawnienie procesu X", ale bez szczegółów',
              'Interesariusze różnie interpretują co oznacza sukces',
              'Brak mierzalnych kryteriów sukcesu lub KPI',
            ],
            hint: 'cel jest, ale każdy widzi go po swojemu',
          },
          {
            value: 3, label: '3 — Cel został opisany częściowo',
            bullets: [
              'Cel projektu jest zapisany, ale nie wszystkie aspekty zostały doprecyzowane',
              'Kluczowi interesariusze rozumieją cel, ale nie ma formalnej akceptacji',
              'Brakuje mierzalnych wskaźników lub kryteriów odbioru',
            ],
            hint: 'kierunek jest jasny, ale szczegóły wymagają dopracowania',
          },
          {
            value: 4, label: '4 — Cel projektu jest dobrze opisany i uzgodniony',
            bullets: [
              'Cel jest zapisany i zrozumiały dla całego zespołu oraz interesariuszy',
              'Istnieją mierzalne wskaźniki sukcesu lub kryteria odbioru',
              'Większość interesariuszy wyraziła akceptację, choć niekoniecznie formalnie',
            ],
            hint: 'wszyscy wiedzą dokąd zmierzamy i po co',
          },
          {
            value: 5, label: '5 — Cel projektu jest jednoznaczny i zaakceptowany przez interesariuszy',
            bullets: [
              'Cel jest formalnie zatwierdzony (np. w Project Charter lub dokumentacji inicjacyjnej)',
              'Istnieje jednoznaczne kryterium sukcesu zaakceptowane przez sponsora i biznes',
              'Cały zespół i interesariusze mówią jednym głosem o celu projektu',
            ],
            hint: 'cel jest zamknięty, udokumentowany i nie budzi wątpliwości',
          },
        ],
      },
      {
        id: 'q2',
        title: 'Czy istnieje opis happy path / procesu docelowego?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy wiadomo jak wygląda docelowy proces krok po kroku?',
            'Czy opisano przebieg end-to-end?',
            'Czy użytkownicy potwierdzili poprawność procesu?',
            'Czy wiadomo jakie scenariusze są krytyczne?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Brak opisu procesu docelowego',
            bullets: [
              'Nikt nie opisał jak ma wyglądać docelowy przepływ pracy',
              'Brak jakichkolwiek diagramów, user stories lub opisu kroków',
              'Zespół nie wie, od czego zacząć analizę procesu',
            ],
            hint: 'nie wiemy jak ma działać to, co budujemy',
          },
          {
            value: 2, label: '2 — Istnieją tylko ogólne założenia',
            bullets: [
              'Mamy ogólny pomysł na proces, ale bez szczegółów wykonania',
              'Brak opisu kroków, aktorów i zależności między nimi',
              'Założenia nie zostały zweryfikowane z użytkownikami końcowymi',
            ],
            hint: 'wiemy co chcemy osiągnąć, ale nie jak to ma działać krok po kroku',
          },
          {
            value: 3, label: '3 — Happy path został częściowo opisany',
            bullets: [
              'Opisano główny przepływ procesu, ale brakuje szczegółów dla niektórych kroków',
              'Scenariusze alternatywne i wyjątkowe nie zostały uwzględnione',
              'Opis nie był jeszcze weryfikowany z użytkownikami lub biznesem',
            ],
            hint: 'główna ścieżka jest naszkicowana, ale dużo białych plam',
          },
          {
            value: 4, label: '4 — Happy path jest dobrze opisany',
            bullets: [
              'Główny przepływ jest udokumentowany krok po kroku',
              'Opisano kluczowych aktorów i ich role w procesie',
              'Zidentyfikowano najważniejsze scenariusze alternatywne',
            ],
            hint: 'wiemy dokładnie jak ma działać główna ścieżka',
          },
          {
            value: 5, label: '5 — Proces docelowy został zweryfikowany i zaakceptowany',
            bullets: [
              'Happy path i scenariusze alternatywne są kompletnie opisane i zatwierdzone',
              'Użytkownicy końcowi lub biznes potwierdzili poprawność procesu',
              'Krytyczne scenariusze mają zdefiniowane reguły obsługi wyjątków',
            ],
            hint: 'proces jest domknięty i gotowy do implementacji',
          },
        ],
      },
    ],
    recs: {
      low: {
        next: 'Zorganizuj warsztat kick-off z interesariuszami i wspólnie zdefiniuj cel metodą SMART. Przygotuj Project Charter z jednoznacznym celem i kryterium sukcesu.',
        actions: [
          { priority: 'HIGH', text: 'Zorganizuj warsztat definicji celu z kluczowymi interesariuszami' },
          { priority: 'HIGH', text: 'Przygotuj Project Charter – cel SMART i kryterium sukcesu' },
          { priority: 'HIGH', text: 'Udokumentuj i zatwierdź happy path / proces docelowy end-to-end' },
        ],
      },
      med: {
        next: 'Doprecyzuj cel projektu i uzyskaj pisemną akceptację interesariuszy. Uzupełnij opis happy path o scenariusze krytyczne.',
        actions: [
          { priority: 'MED', text: 'Uzyskaj pisemną akceptację celu projektu od interesariuszy' },
          { priority: 'MED', text: 'Uzupełnij happy path o scenariusze krytyczne i edge case\'y' },
        ],
      },
      high: {
        next: 'Obszar przygotowany dobrze. Odświeżaj cel regularnie wobec zmieniającego się kontekstu biznesowego.',
        actions: [],
      },
    },
  },

  {
    id: 's2',
    label: 'Zakres i wymagania',
    questions: [
      {
        id: 'q3',
        title: 'Czy zakres projektu został uzgodniony?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy wiadomo co jest IN/OUT scope?',
            'Czy istnieją zależności między zespołami?',
            'Czy zakres został zaakceptowany przez interesariuszy?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Zakres nie został określony',
            bullets: [
              'Nie wiadomo co wchodzi, a co nie wchodzi w zakres projektu',
              'Brak jakiejkolwiek listy funkcjonalności lub obszarów do realizacji',
              'Różne osoby mają sprzeczne wyobrażenia o tym, co projekt obejmuje',
            ],
            hint: 'każdy myśli, że projekt robi co innego',
          },
          {
            value: 2, label: '2 — Zakres jest niejasny',
            bullets: [
              'Istnieje ogólny pomysł na zakres, ale wiele elementów jest nierozstrzygniętych',
              'Nie ma jasnego rozróżnienia IN/OUT scope',
              'Wysokie ryzyko scope creep – każda strona może wciągać nowe tematy',
            ],
            hint: 'zakres płynie i jest podatny na ciągłe rozszerzanie',
          },
          {
            value: 3, label: '3 — Zakres został częściowo opisany',
            bullets: [
              'Istnieje lista funkcji lub obszarów, ale niepełna',
              'Część rzeczy jest doprecyzowana, część nadal otwarta',
              'Możliwe zmiany zakresu w trakcie projektu',
            ],
            hint: 'wiemy sporo, ale jeszcze nie wszystko jest domknięte',
          },
          {
            value: 4, label: '4 — Zakres jest dobrze uzgodniony',
            bullets: [
              'Lista IN/OUT scope jest opisana i zrozumiała dla zespołu',
              'Interesariusze są zgodni co do tego, co powstaje',
              'Zmiany są możliwe, ale istnieje świadomość, że wymagają procesu change request',
            ],
            hint: 'wiemy dokładnie co robimy i wszyscy się zgadzają',
          },
          {
            value: 5, label: '5 — Zakres jest kompletny i formalnie zaakceptowany',
            bullets: [
              'Zakres jest udokumentowany, zatwierdzony i podpisany przez sponsora',
              'Jasno określono IN/OUT scope oraz zależności zewnętrzne',
              'Istnieje formalny proces zarządzania zmianami zakresu (change request)',
            ],
            hint: 'zakres jest zamknięty i chroniony przed niekontrolowanym rozszerzaniem',
          },
        ],
      },
      {
        id: 'q4',
        title: 'Czy wymagania biznesowe są gotowe?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy wymagania są opisane i zwymiarowane?',
            'Czy istnieją kluczowe decyzje biznesowe?',
            'Czy zespół rozumie oczekiwania strony biznesowej?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Brak wymagań',
            bullets: [
              'Nie istnieje żaden dokument opisujący wymagania biznesowe',
              'Biznes nie przekazał żadnych oczekiwań w ustrukturyzowanej formie',
              'Zespół nie wie co ma zaprojektować ani zbudować',
            ],
            hint: 'startujemy w ciemno – nie wiadomo co ma powstać',
          },
          {
            value: 2, label: '2 — Wymagania są fragmentaryczne',
            bullets: [
              'Istnieją pojedyncze wymagania lub notatki ze spotkań, ale bez spójnej struktury',
              'Brakuje decyzji w kluczowych obszarach biznesowych',
              'Wymagania są rozsiane w mailach, prezentacjach lub głowach ludzi',
            ],
            hint: 'mamy puzzle, ale brakuje połowy elementów',
          },
          {
            value: 3, label: '3 — Kluczowe wymagania zostały opisane',
            bullets: [
              'Najważniejsze wymagania są udokumentowane, ale nie wszystkie obszary zostały pokryte',
              'Istnieją otwarte pytania biznesowe wymagające decyzji',
              'Wymagania wymagają dalszego doprecyzowania przed realizacją',
            ],
            hint: 'fundament jest, ale dom jeszcze nie jest zaplanowany do końca',
          },
          {
            value: 4, label: '4 — Wymagania są dobrze przygotowane',
            bullets: [
              'Wymagania są opisane w spójny sposób (BRD, user stories lub specyfikacja)',
              'Kluczowe decyzje biznesowe zostały podjęte',
              'Zespół rozumie oczekiwania, choć mogą pojawić się drobne pytania w trakcie',
            ],
            hint: 'zespół wie co budować i może zacząć bez ryzyka dużych niespodzianek',
          },
          {
            value: 5, label: '5 — Wymagania są kompletne i gotowe do realizacji',
            bullets: [
              'Wymagania są kompletne, zatwierdzone przez biznes i zrozumiałe dla zespołu',
              'Wszystkie kluczowe decyzje biznesowe zostały podjęte i udokumentowane',
              'Istnieje backlog lub specyfikacja gotowa do wyceny i realizacji',
            ],
            hint: 'wymagania są zamknięte – można zacząć projektować i budować',
          },
        ],
      },
    ],
    recs: {
      low: {
        next: 'Natychmiast przeprowadź sesję scope definition z biznesem. Stwórz dokument IN/OUT scope i zbierz wymagania biznesowe przed startem.',
        actions: [
          { priority: 'HIGH', text: 'Przeprowadź sesję scope definition – lista IN/OUT scope' },
          { priority: 'HIGH', text: 'Zbierz i udokumentuj wymagania biznesowe (BRD lub user stories)' },
          { priority: 'HIGH', text: 'Uzyskaj formalną akceptację zakresu od sponsora' },
        ],
      },
      med: {
        next: 'Domknij otwarte kwestie zakresu i uzupełnij brakujące wymagania. Zorganizuj review z zespołem i biznesem.',
        actions: [
          { priority: 'MED', text: 'Domknij otwarte pytania dot. zakresu – sesja Q&A z biznesem' },
          { priority: 'MED', text: 'Uzupełnij wymagania o brakujące decyzje biznesowe' },
        ],
      },
      high: {
        next: 'Zakres i wymagania solidne. Zadbaj o process zarządzania zmianami zakresu.',
        actions: [],
      },
    },
  },

  {
    id: 's3',
    label: 'Governance i zespół',
    questions: [
      {
        id: 'q5',
        title: 'Czy role i odpowiedzialności są zdefiniowane?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy wiadomo kto podejmuje decyzje i na jakim poziomie?',
            'Czy istnieje wyznaczony owner biznesowy?',
            'Czy każdy z zespołu zna swoje odpowiedzialności?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Role nie są określone',
            bullets: [
              'Nikt formalnie nie odpowiada za projekt po stronie biznesowej ani technicznej',
              'Brak przypisania zadań i odpowiedzialności do konkretnych osób',
              'Decyzje nie są podejmowane – lub podejmuje je każdy osobno',
            ],
            hint: 'projekt jest niczyj – każdy robi co chce lub nikt nic nie robi',
          },
          {
            value: 2, label: '2 — Role są niejasne',
            bullets: [
              'Jest kilka osób zaangażowanych, ale nikt nie wie kto za co odpowiada',
              'Brak jasnego decision makera – decyzje się opóźniają',
              'Nakładające się odpowiedzialności powodują konflikty lub luki',
            ],
            hint: 'wszyscy są odpowiedzialni, więc nikt nie jest',
          },
          {
            value: 3, label: '3 — Większość ról została przypisana',
            bullets: [
              'Kluczowe role (PM, owner biznesowy) są obsadzone, ale nie wszystkie obszary',
              'Istnieje ogólna struktura zespołu, ale bez formalnego RACI',
              'Część decyzji wciąż czeka na wyznaczenie odpowiedzialnych',
            ],
            hint: 'wiemy kto jest w projekcie, ale nie zawsze kto za co odpowiada',
          },
          {
            value: 4, label: '4 — Role i odpowiedzialności są dobrze opisane',
            bullets: [
              'Każda osoba w projekcie zna swoje zadania i zakres decyzji',
              'Decision maker jest jasno wyznaczony',
              'Istnieje macierz odpowiedzialności lub jej nieformowy odpowiednik',
            ],
            hint: 'każdy wie co do niego należy i gdzie eskalować',
          },
          {
            value: 5, label: '5 — Governance projektu jest kompletny i zaakceptowany',
            bullets: [
              'RACI jest gotowy, rozesłany i zaakceptowany przez wszystkich członków zespołu',
              'Istnieje formalny decision log i proces eskalacji blokerów',
              'Struktura governance jest jasna dla interesariuszy zewnętrznych',
            ],
            hint: 'projekt ma jasną strukturę władzy i odpowiedzialności na każdym poziomie',
          },
        ],
      },
      {
        id: 'q6',
        title: 'Czy sponsor projektu jest aktywnie zaangażowany?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy sponsor uczestniczy w kluczowych decyzjach?',
            'Czy aktywnie usuwa blokery eskalowane przez PM?',
            'Czy wspiera priorytetyzację i przydzielanie zasobów?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Brak sponsora',
            bullets: [
              'Projekt nie ma wyznaczonego sponsora po stronie biznesowej',
              'Nikt nie ma uprawnień do podejmowania strategicznych decyzji',
              'Blokery i konflikty priorytetów nie mają gdzie być eskalowane',
            ],
            hint: 'projekt jedzie bez kierownicy – przy pierwszej przeszkodzie staje',
          },
          {
            value: 2, label: '2 — Sponsor jest pasywny',
            bullets: [
              'Sponsor formalnie istnieje, ale nie angażuje się w projekt',
              'Eskalacje do sponsora pozostają bez odpowiedzi lub są opóźniane',
              'PM musi sam rozwiązywać problemy wymagające wsparcia z góry',
            ],
            hint: 'sponsor jest z nazwy, ale nie z działania',
          },
          {
            value: 3, label: '3 — Sponsor uczestniczy okazjonalnie',
            bullets: [
              'Sponsor pojawia się na ważnych spotkaniach, ale nie śledzi projektu regularnie',
              'Reaguje na eskalacje, ale wymaga to dużego wysiłku ze strony PM',
              'Zaangażowanie jest reaktywne, a nie proaktywne',
            ],
            hint: 'sponsor pomaga, gdy mocno poprosisz, ale nie patrzy na projekt sam z siebie',
          },
          {
            value: 4, label: '4 — Sponsor aktywnie wspiera projekt',
            bullets: [
              'Sponsor regularnie uczestniczy w statusach i podejmuje decyzje na czas',
              'Usuwa blokery i toruje drogę dla zespołu',
              'Jest dostępny dla PM i reaguje na eskalacje w krótkim czasie',
            ],
            hint: 'mamy silne wsparcie z góry – projekt ma wiatr w żaglach',
          },
          {
            value: 5, label: '5 — Sponsor jest liderem projektu od strony biznesowej',
            bullets: [
              'Sponsor aktywnie komunikuje projekt w organizacji i buduje jego wiarygodność',
              'Podejmuje szybkie decyzje i chroni priorytety projektu wobec innych inicjatyw',
              'Regularnie spotyka się z PM i angażuje się w zarządzanie ryzykiem',
            ],
            hint: 'sponsor to prawdziwy champion projektu – nie tylko podpisuje, ale napędza',
          },
        ],
      },
    ],
    recs: {
      low: {
        next: 'Pilnie zdefiniuj strukturę governance: RACI, decision log i eskalacje. Aktywuj sponsora projektu – bez niego blokery pozostaną nierozwiązane.',
        actions: [
          { priority: 'HIGH', text: 'Stwórz macierz RACI i rozesłij do całego zespołu' },
          { priority: 'HIGH', text: 'Zidentyfikuj i aktywuj sponsora projektu' },
          { priority: 'HIGH', text: 'Wprowadź decision log i proces eskalacji blokerów' },
        ],
      },
      med: {
        next: 'Doprecyzuj niejasne role i upewnij się, że sponsor rozumie swoje obowiązki. Umów cykliczne spotkania 1:1 ze sponsorem.',
        actions: [
          { priority: 'MED', text: 'Doprecyzuj niejasne role w RACI i potwierdź z zainteresowanymi' },
          { priority: 'MED', text: 'Umów cykliczne 1:1 ze sponsorem i zdefiniuj formę eskalacji' },
        ],
      },
      high: {
        next: 'Governance działa poprawnie. Pilnuj aktualności RACI przy zmianach w zespole.',
        actions: [],
      },
    },
  },

  {
    id: 's4',
    label: 'Planowanie i ryzyka',
    questions: [
      {
        id: 'q7',
        title: 'Czy harmonogram jest realistyczny?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy uwzględniono wszystkie zależności między zadaniami?',
            'Czy zespół potwierdził estymacje czasu?',
            'Czy harmonogram zawiera bufor na ryzyka?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Brak harmonogramu',
            bullets: [
              'Nie istnieje żaden plan czasowy ani lista kamieni milowych',
              'Nikt nie wie kiedy projekt ma się zakończyć ani co po czym następuje',
              'Brak estymacji dla jakichkolwiek zadań',
            ],
            hint: 'robimy projekt bez planu – kończymy „kiedy skończymy"',
          },
          {
            value: 2, label: '2 — Harmonogram jest bardzo ryzykowny',
            bullets: [
              'Termin końcowy istnieje, ale jest narzucony odgórnie bez weryfikacji wykonalności',
              'Estymacje nie zostały potwierdzone przez zespół realizacyjny',
              'Brak uwzględnienia zależności, urlopów i ryzyk w harmonogramie',
            ],
            hint: 'data jest, ale wszyscy wiedzą, że jej nie dowieziemy',
          },
          {
            value: 3, label: '3 — Harmonogram jest wstępny',
            bullets: [
              'Istnieje plan z kamieniami milowymi, ale bez szczegółowych estymacji zadań',
              'Zależności nie są w pełni zmapowane',
              'Harmonogram będzie wymagał aktualizacji po doprecyzowaniu zakresu',
            ],
            hint: 'mamy szkielet planu, ale wymaga on dopracowania',
          },
          {
            value: 4, label: '4 — Harmonogram jest realistyczny i uzgodniony',
            bullets: [
              'Plan uwzględnia kluczowe zależności i etapy projektu',
              'Estymacje zostały skonsultowane z zespołem realizacyjnym',
              'Kamienie milowe są jasne i zaakceptowane przez interesariuszy',
            ],
            hint: 'mamy plan, w który wierzymy i który jest wykonalny',
          },
          {
            value: 5, label: '5 — Harmonogram uwzględnia ryzyka, zależności i bufor',
            bullets: [
              'Plan jest szczegółowy, zawiera krytyczną ścieżkę i bufor czasowy',
              'Zależności zewnętrzne i wewnętrzne są zmapowane i monitorowane',
              'Harmonogram jest regularnie aktualizowany i dostępny dla zespołu',
            ],
            hint: 'plan jest solidny i odporny na typowe niespodzianki projektowe',
          },
        ],
      },
      {
        id: 'q8',
        title: 'Czy ryzyka projektu zostały zidentyfikowane?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy istnieje aktualna lista ryzyk?',
            'Czy każdemu ryzyku przypisano ownera?',
            'Czy określono działania mitigacyjne i plany awaryjne?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Nie przeprowadzono analizy ryzyk',
            bullets: [
              'Nikt nie zastanawiał się co może pójść nie tak',
              'Brak jakiejkolwiek listy ryzyk lub rejestru zagrożeń',
              'Projekt jest całkowicie nieodporny na niespodziewane zdarzenia',
            ],
            hint: 'działamy na zasadzie \'jakoś to będzie\' – pierwsze ryzyko może zatopić projekt',
          },
          {
            value: 2, label: '2 — Zidentyfikowano pojedyncze ryzyka',
            bullets: [
              'Wymieniono 2-3 oczywiste ryzyka, ale analiza nie jest systematyczna',
              'Ryzyka nie mają przypisanych ownerów ani planów reagowania',
              'Brakuje oceny prawdopodobieństwa i wpływu na projekt',
            ],
            hint: 'wiemy że są ryzyka, ale nie wiemy co z nimi zrobić',
          },
          {
            value: 3, label: '3 — Istnieje podstawowa lista ryzyk',
            bullets: [
              'Przeprowadzono sesję identyfikacji ryzyk i stworzono rejestr',
              'Ryzyka mają ocenę prawdopodobieństwa i wpływu, ale nie wszystkie mają ownerów',
              'Brakuje planów mitigacyjnych dla części ryzyk',
            ],
            hint: 'wiemy na co uważać, ale nie jesteśmy gotowi na wszystkie scenariusze',
          },
          {
            value: 4, label: '4 — Ryzyka mają przypisanych ownerów i działania mitigacyjne',
            bullets: [
              'Risk register jest kompletny z oceną, ownerem i planem mitygacji dla każdego ryzyka',
              'Ryzyka są regularnie omawiane na spotkaniach statusowych',
              'Dla kluczowych ryzyk istnieją plany awaryjne (contingency plans)',
            ],
            hint: 'mamy ryzyka pod kontrolą i wiemy kto reaguje gdy coś się dzieje',
          },
          {
            value: 5, label: '5 — Zarządzanie ryzykiem działa operacyjnie i jest regularnie przeglądane',
            bullets: [
              'Risk register jest aktywnie aktualizowany i monitorowany',
              'Ryzyka są przeglądane cyklicznie, a nowe są szybko dodawane',
              'Dla wszystkich ryzyk wysokiego wpływu istnieją gotowe plany awaryjne',
            ],
            hint: 'zarządzanie ryzykiem jest wbudowane w rytm projektu, nie jest jednorazowym ćwiczeniem',
          },
        ],
      },
    ],
    recs: {
      low: {
        next: 'Stwórz realistyczny harmonogram razem z zespołem (bottom-up). Przeprowadź risk workshop i stwórz risk register z ownerami i planami mitygacji.',
        actions: [
          { priority: 'HIGH', text: 'Przeprowadź sesję estymacji z zespołem (bottom-up estimation)' },
          { priority: 'HIGH', text: 'Zidentyfikuj zależności zewnętrzne i krytyczną ścieżkę' },
          { priority: 'HIGH', text: 'Stwórz risk register: ryzyka, ownerzy, mitygacje, plany awaryjne' },
        ],
      },
      med: {
        next: 'Doprecyzuj harmonogram o zależności i bufory. Rozszerz risk register o ownerów i działania mitigacyjne.',
        actions: [
          { priority: 'MED', text: 'Dodaj bufory czasowe do harmonogramu i potwierdź z biznesem' },
          { priority: 'MED', text: 'Uzupełnij risk register o ownerów i plany mitygacji' },
        ],
      },
      high: {
        next: 'Planowanie i ryzyka na dobrym poziomie. Przeglądaj risk register na każdym statusie projektu.',
        actions: [],
      },
    },
  },

  {
    id: 's5',
    label: 'Komunikacja i gotowość organizacji',
    questions: [
      {
        id: 'q9',
        title: 'Czy istnieje plan komunikacji?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy wiadomo kto i w jakiej formie raportuje status?',
            'Czy ustalono governance meetingów (kto, kiedy, co)?',
            'Czy wszyscy kluczowi interesariusze są uwzględnieni?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Brak planu komunikacji',
            bullets: [
              'Nie ustalono kto, kiedy i w jakiej formie komunikuje postęp projektu',
              'Brak cyklicznych spotkań statusowych lub raportów',
              'Interesariusze nie są informowani o statusie projektu',
            ],
            hint: 'informacje o projekcie krążą plotkami lub wcale nie docierają',
          },
          {
            value: 2, label: '2 — Komunikacja jest ad hoc',
            bullets: [
              'Spotkania i raporty organizowane są tylko gdy pojawia się problem',
              'Brak regularnego rytmu komunikacji z interesariuszami',
              'Różne osoby dostają różne informacje – brak jednego źródła prawdy',
            ],
            hint: 'każdy dowiaduje się o projekcie przypadkowo lub za późno',
          },
          {
            value: 3, label: '3 — Istnieją podstawowe ustalenia komunikacyjne',
            bullets: [
              'Są regularne spotkania statusowe, ale nie dla wszystkich grup interesariuszy',
              'Status projektu jest komunikowany, ale bez formalnego raportu',
              'Brakuje matrycy komunikacji określającej kto dostaje jakie informacje',
            ],
            hint: 'komunikujemy się, ale nie zawsze z właściwymi osobami i nie zawsze na czas',
          },
          {
            value: 4, label: '4 — Plan komunikacji został przygotowany i rozesłany',
            bullets: [
              'Istnieje matryca komunikacji z określeniem odbiorców, częstotliwości i formatu',
              'Cykliczne spotkania i raporty statusowe są wdrożone',
              'Wszyscy kluczowi interesariusze wiedzą gdzie szukać informacji o projekcie',
            ],
            hint: 'komunikacja jest zaplanowana i wszyscy wiedzą czego się spodziewać',
          },
          {
            value: 5, label: '5 — Komunikacja jest kompleksowo zaplanowana i wdrożona',
            bullets: [
              'Plan komunikacji obejmuje wszystkie grupy interesariuszy z dopasowanym formatem',
              'Istnieje jedno centralne miejsce z aktualnym statusem projektu',
              'Komunikacja jest dwukierunkowa – interesariusze mają kanał do zgłaszania pytań i uwag',
            ],
            hint: 'nikt nie jest zaskoczony – wszyscy mają dostęp do aktualnych informacji',
          },
        ],
      },
      {
        id: 'q10',
        title: 'Czy organizacja jest gotowa do startu projektu?',
        tooltip: {
          intro: 'Pytania pomocnicze PM:',
          bullets: [
            'Czy kluczowe osoby mają potwierdzoną dostępność?',
            'Czy infrastruktura i narzędzia są gotowe?',
            'Czy znane są ograniczenia organizacyjne i zewnętrzne?',
          ],
        },
        options: [
          {
            value: 1, label: '1 — Organizacja nie jest gotowa',
            bullets: [
              'Kluczowe osoby nie są dostępne lub nie zostały jeszcze przydzielone',
              'Brak dostępu do niezbędnych narzędzi, środowisk lub danych',
              'Organizacja nie wie, że projekt ma się zacząć',
            ],
            hint: 'start jest niemożliwy – fundament organizacyjny nie istnieje',
          },
          {
            value: 2, label: '2 — Występują istotne braki organizacyjne',
            bullets: [
              'Część zasobów jest dostępna, ale brakuje kluczowych kompetencji lub osób',
              'Narzędzia lub infrastruktura wymagają istotnych przygotowań przed startem',
              'Istnieją znane blokery organizacyjne, które nie zostały jeszcze rozwiązane',
            ],
            hint: 'możemy próbować startować, ale szybko uderzymy w ścianę',
          },
          {
            value: 3, label: '3 — Gotowość organizacyjna jest częściowa',
            bullets: [
              'Większość zasobów jest dostępna, ale część czeka na potwierdzenie',
              'Narzędzia i środowiska są przygotowane, choć mogą wymagać drobnych uzupełnień',
              'Znane są ograniczenia i trwają działania naprawcze',
            ],
            hint: 'możemy startować warunkowo, ale kilka rzeczy trzeba jeszcze domknąć',
          },
          {
            value: 4, label: '4 — Organizacja jest dobrze przygotowana',
            bullets: [
              'Kluczowi członkowie zespołu mają potwierdzoną dostępność',
              'Narzędzia i środowiska projektowe są gotowe do pracy',
              'Zależności i ograniczenia są znane i zarządzane',
            ],
            hint: 'jesteśmy gotowi do startu i wiemy co nas czeka',
          },
          {
            value: 5, label: '5 — Organizacja jest w pełni gotowa do startu',
            bullets: [
              'Wszystkie zasoby ludzkie, techniczne i organizacyjne są potwierdzone i gotowe',
              'Przeprowadzono formalny readiness check i nie stwierdzono blokerów',
              'Organizacja jest zaangażowana i zmotywowana do realizacji projektu',
            ],
            hint: 'wszystko jest gotowe – możemy startować natychmiast',
          },
        ],
      },
    ],
    recs: {
      low: {
        next: 'Stwórz plan komunikacji (kto, co, kiedy, do kogo). Zweryfikuj gotowość operacyjną organizacji – dostępność ludzi, narzędzi i infrastruktury.',
        actions: [
          { priority: 'HIGH', text: 'Stwórz Communication Plan z matrycą interesariuszy' },
          { priority: 'HIGH', text: 'Zweryfikuj dostępność kluczowych zasobów przed startem' },
          { priority: 'MED',  text: 'Potwierdź gotowość narzędzi i infrastruktury projektowej' },
        ],
      },
      med: {
        next: 'Sformalizuj ustalenia komunikacyjne i zamknij luki w gotowości operacyjnej.',
        actions: [
          { priority: 'MED', text: 'Rozbuduj plan komunikacji o statusy i raporty dla interesariuszy' },
          { priority: 'MED', text: 'Zamknij zidentyfikowane luki w gotowości organizacyjnej' },
        ],
      },
      high: {
        next: 'Komunikacja i gotowość na wysokim poziomie. Dbaj o regularny przegląd planu komunikacji.',
        actions: [],
      },
    },
  },
];

// ── Derived helpers (computed once, used everywhere) ──────────────────────

/** Flat list of all questions across all sections, preserving order */
export const ALL_QUESTIONS = SECTIONS.flatMap(s => s.questions);

/** Total number of questions (used for progress bar) */
export const QUESTION_COUNT = ALL_QUESTIONS.length;

/** Max possible total score */
export const MAX_TOTAL_SCORE = QUESTION_COUNT * SCORING.MAX_PER_QUESTION;

/**
 * Classify a percentage into a tier key.
 * @param {number} pct  0–100
 * @returns {'low'|'med'|'high'}
 */
export function classifyTier(pct) {
  if (pct >= SCORING.TIER_HIGH_MIN) return 'high';
  if (pct >= SCORING.TIER_MED_MIN)  return 'med';
  return 'low';
}

/** Priority badge display config */
export const PRIORITY_META = {
  HIGH: { cssClass: 'pri-high', label: 'Wysoki' },
  MED:  { cssClass: 'pri-med',  label: 'Średni' },
  LOW:  { cssClass: 'pri-low',  label: 'Niski'  },
};
