# Dokument wymagań produktu (PRD) - FlashMaster AI

## 1. Przegląd produktu

FlashMaster AI to aplikacja webowa do tworzenia i zarządzania fiszkami edukacyjnymi z wykorzystaniem sztucznej inteligencji. Narzędzie umożliwia szybkie generowanie wysokiej jakości fiszek na podstawie wprowadzonego tekstu, co znacząco przyspiesza proces nauki metodą powtórek odstępowych (spaced repetition).

Głównym celem produktu jest automatyzacja czasochłonnego procesu tworzenia fiszek edukacyjnych, przy jednoczesnym zachowaniu ich wysokiej jakości. Aplikacja skierowana jest przede wszystkim do studentów i uczniów, ale będzie również dostępna dla wszystkich osób zainteresowanych efektywną nauką.

FlashMaster AI będzie uniwersalnym narzędziem, które może być wykorzystywane do nauki różnych dziedzin wiedzy. Dzięki zastosowaniu sztucznej inteligencji, użytkownicy będą mogli tworzyć fiszki nawet 75% szybciej niż metodami tradycyjnymi, co pozwoli im skupić się na właściwej nauce zamiast na przygotowywaniu materiałów.

## 2. Problem użytkownika

Manualne tworzenie wysokiej jakości fiszek edukacyjnych jest czasochłonne, co zniechęca do korzystania z efektywnej metody nauki jaką jest spaced repetition. Użytkownicy napotykają następujące problemy:

1. Tworzenie fiszek wymaga znacznego nakładu czasu, który mógłby być spożytkowany na faktyczną naukę
2. Identyfikacja kluczowych informacji w materiałach edukacyjnych często sprawia trudność
3. Formułowanie pytań i odpowiedzi w odpowiedni sposób wymaga umiejętności, których wielu uczących się nie posiada
4. Utrzymanie systematycznego systemu powtórek jest trudne bez odpowiednich narzędzi
5. Manualne tworzenie fiszek często prowadzi do ich niskiej jakości, co obniża efektywność nauki

FlashMaster AI rozwiązuje te problemy poprzez automatyzację procesu tworzenia fiszek, identyfikację kluczowych informacji w tekście oraz integrację z algorytmem powtórek, co umożliwia efektywne zarządzanie procesem nauki.

## 3. Wymagania funkcjonalne

### 3.1 Generowanie fiszek przez AI

System umożliwia automatyczne generowanie fiszek na podstawie wprowadzonego tekstu. AI samodzielnie identyfikuje kluczowe informacje i tworzy fiszki w odpowiednim formacie. Użytkownik może wprowadzić tekst przez kopiowanie i wklejanie materiałów edukacyjnych.

### 3.2 Manualne tworzenie fiszek

Aplikacja zapewnia możliwość ręcznego tworzenia fiszek. Użytkownik może definiować przednią i tylną stronę fiszki oraz kategoryzować je według własnych potrzeb.

### 3.3 Zarządzanie fiszkami

System umożliwia przeglądanie, edytowanie i usuwanie fiszek. Użytkownicy mogą sortować, filtrować i organizować swoje fiszki w intuicyjny sposób.

### 3.4 System kont użytkowników

Aplikacja zawiera prosty system rejestracji i logowania, umożliwiający użytkownikom przechowywanie swoich fiszek i śledzenie postępów w nauce.

### 3.5 Integracja z algorytmem powtórek

System integruje się z gotowym, open-source'owym algorytmem powtórek, który pomaga użytkownikom efektywnie zarządzać procesem nauki.

## 4. Granice produktu

Następujące funkcjonalności i cechy NIE wchodzą w zakres MVP:

### 4.1 Poza zakresem

1. Własny, zaawansowany algorytm powtórek (jak SuperMemo, Anki)
2. Import wielu formatów plików (PDF, DOCX, itp.) - obsługiwany będzie tylko tekst przez kopiuj-wklej
3. Współdzielenie zestawów fiszek między użytkownikami
4. Integracje z innymi platformami edukacyjnymi
5. Aplikacje mobilne (na początek tylko web)
6. Zaawansowany system kategoryzacji i tagowania fiszek
7. Szczegółowe statystyki i analizy postępów w nauce
8. Rozbudowane profile użytkowników
9. Funkcje społecznościowe i współpracy
10. Zaawansowane opcje personalizacji wyglądu fiszek

### 4.2 Ograniczenia i założenia

1. Aplikacja będzie działać na wszystkich podstawowych przeglądarkach internetowych
2. System będzie przyjazny dla użytkownika i intuicyjny w obsłudze
3. Czas odpowiedzi AI przy generowaniu fiszek powinien być akceptowalny (poniżej 10 sekund)
4. Aplikacja będzie dostępna jako web app, bez wersji mobilnych na początkowym etapie
5. System przechowywania danych użytkowników będzie zgodny z podstawowymi wymaganiami bezpieczeństwa

## 5. Historyjki użytkowników

### 5.1 Rejestracja i logowanie

#### US-001
- ID: US-001
- Tytuł: Rejestracja nowego użytkownika
- Opis: Jako nowy użytkownik, chcę zarejestrować konto w systemie, aby móc korzystać z aplikacji i przechowywać swoje fiszki.
- Kryteria akceptacji:
  1. Użytkownik może utworzyć konto podając adres e-mail i hasło
  2. System weryfikuje unikalność adresu e-mail
  3. System wymaga hasła o odpowiedniej sile (min. 8 znaków, zawierającego litery i cyfry)
  4. Po rejestracji użytkownik otrzymuje potwierdzenie utworzenia konta
  5. Dane użytkownika są bezpiecznie przechowywane w bazie danych

#### US-002
- ID: US-002
- Tytuł: Logowanie do systemu
- Opis: Jako zarejestrowany użytkownik, chcę zalogować się do systemu, aby uzyskać dostęp do moich fiszek i postępów w nauce.
- Kryteria akceptacji:
  1. Użytkownik może zalogować się podając swój adres e-mail i hasło
  2. System weryfikuje poprawność danych logowania
  3. Po poprawnym zalogowaniu użytkownik jest przekierowany do głównego widoku aplikacji
  4. System umożliwia zapamiętanie sesji logowania (opcja "zapamiętaj mnie")
  5. System zapewnia bezpieczny mechanizm odzyskiwania hasła

#### US-003
- ID: US-003
- Tytuł: Wylogowanie z systemu
- Opis: Jako zalogowany użytkownik, chcę wylogować się z systemu, aby zabezpieczyć swoje konto przed nieautoryzowanym dostępem.
- Kryteria akceptacji:
  1. Użytkownik może wylogować się z systemu za pomocą jednego kliknięcia
  2. Po wylogowaniu użytkownik jest przekierowany do strony logowania
  3. Sesja użytkownika jest całkowicie zamykana
  4. Użytkownik nie może uzyskać dostępu do chronionych zasobów bez ponownego logowania

### 5.2 Generowanie fiszek przez AI

#### US-004
- ID: US-004
- Tytuł: Generowanie fiszek przez AI z tekstu
- Opis: Jako użytkownik, chcę wkleić tekst do systemu i automatycznie wygenerować fiszki za pomocą AI, aby zaoszczędzić czas na tworzeniu fiszek manualnie.
- Kryteria akceptacji:
  1. System posiada pole tekstowe do wklejenia materiału źródłowego
  2. Po wklejeniu tekstu, użytkownik może wybrać opcję "Generuj fiszki"
  3. System wykorzystuje AI do automatycznej identyfikacji kluczowych informacji w tekście
  4. AI generuje zestaw fiszek na podstawie analizy tekstu
  5. Generowanie fiszek kończy się w rozsądnym czasie (poniżej 10 sekund)
  6. Użytkownik otrzymuje powiadomienie o zakończeniu generowania

#### US-005
- ID: US-005
- Tytuł: Podgląd wygenerowanych fiszek
- Opis: Jako użytkownik, chcę zobaczyć podgląd fiszek wygenerowanych przez AI, aby ocenić ich jakość przed zapisaniem.
- Kryteria akceptacji:
  1. System wyświetla listę wygenerowanych fiszek
  2. Dla każdej fiszki widoczna jest przednia i tylna strona
  3. Użytkownik może przeglądać wygenerowane fiszki w trybie podglądu
  4. System wyświetla liczbę wygenerowanych fiszek
  5. Fiszki są prezentowane w czytelny i estetyczny sposób

#### US-006
- ID: US-006
- Tytuł: Zatwierdzanie/odrzucanie wygenerowanych fiszek
- Opis: Jako użytkownik, chcę zatwierdzać lub odrzucać poszczególne fiszki wygenerowane przez AI, aby mieć kontrolę nad jakością moich materiałów do nauki.
- Kryteria akceptacji:
  1. Użytkownik może zatwierdzić wszystkie wygenerowane fiszki jednym kliknięciem
  2. Użytkownik może zatwierdzić lub odrzucić każdą fiszkę indywidualnie
  3. System umożliwia masowe zaznaczanie fiszek do zatwierdzenia lub odrzucenia
  4. Zatwierdzone fiszki są dodawane do kolekcji użytkownika
  5. Odrzucone fiszki są usuwane z podglądu
  6. System informuje o liczbie zatwierdzonych/odrzuconych fiszek

### 5.3 Manualne tworzenie i edycja fiszek

#### US-007
- ID: US-007
- Tytuł: Manualne tworzenie fiszek
- Opis: Jako użytkownik, chcę manualnie tworzyć własne fiszki, aby mieć pełną kontrolę nad ich zawartością.
- Kryteria akceptacji:
  1. System udostępnia formularz do tworzenia nowej fiszki
  2. Użytkownik może wprowadzić treść dla przedniej i tylnej strony fiszki
  3. System pozwala na opcjonalne przypisanie kategorii/tagu do fiszki
  4. Po utworzeniu fiszka jest automatycznie dodawana do kolekcji użytkownika
  5. System potwierdza utworzenie nowej fiszki

#### US-008
- ID: US-008
- Tytuł: Edycja istniejących fiszek
- Opis: Jako użytkownik, chcę edytować istniejące fiszki, aby poprawić błędy lub zaktualizować zawartość.
- Kryteria akceptacji:
  1. Użytkownik może wybrać fiszkę do edycji z listy swoich fiszek
  2. System wyświetla formularz edycji z aktualną zawartością fiszki
  3. Użytkownik może zmienić treść przedniej i tylnej strony fiszki
  4. Użytkownik może zmienić lub dodać kategorię/tag do fiszki
  5. Po zapisaniu zmian, fiszka jest aktualizowana w kolekcji użytkownika
  6. System potwierdza zapisanie zmian

#### US-009
- ID: US-009
- Tytuł: Usuwanie fiszek
- Opis: Jako użytkownik, chcę usuwać niepotrzebne fiszki, aby utrzymać porządek w mojej kolekcji.
- Kryteria akceptacji:
  1. Użytkownik może wybrać jedną lub wiele fiszek do usunięcia
  2. System wymaga potwierdzenia operacji usunięcia
  3. Po potwierdzeniu, fiszki są trwale usuwane z kolekcji użytkownika
  4. System informuje o pomyślnym usunięciu fiszek
  5. Użytkownik może anulować operację usunięcia przed potwierdzeniem

### 5.4 Zarządzanie fiszkami

#### US-010
- ID: US-010
- Tytuł: Przeglądanie kolekcji fiszek
- Opis: Jako użytkownik, chcę przeglądać moją kolekcję fiszek, aby mieć przegląd dostępnych materiałów do nauki.
- Kryteria akceptacji:
  1. System wyświetla listę wszystkich fiszek użytkownika
  2. Lista fiszek zawiera podstawowe informacje (np. przednią stronę, kategorię)
  3. Użytkownik może sortować fiszki według różnych kryteriów (np. data utworzenia)
  4. System umożliwia paginację dla dużych kolekcji fiszek
  5. Użytkownik może podejrzeć pełną treść fiszki

#### US-011
- ID: US-011
- Tytuł: Organizacja fiszek w kategorie
- Opis: Jako użytkownik, chcę organizować moje fiszki w kategorie, aby łatwiej zarządzać moimi materiałami do nauki.
- Kryteria akceptacji:
  1. Użytkownik może tworzyć nowe kategorie
  2. Użytkownik może przypisywać fiszki do istniejących kategorii
  3. System wyświetla fiszki pogrupowane według kategorii
  4. Użytkownik może filtrować fiszki według kategorii
  5. Użytkownik może zmieniać i usuwać kategorie

### 5.5 Nauka z fiszkami

#### US-012
- ID: US-012
- Tytuł: Rozpoczęcie sesji nauki
- Opis: Jako użytkownik, chcę rozpocząć sesję nauki z fiszkami, aby efektywnie przyswajać wiedzę.
- Kryteria akceptacji:
  1. Użytkownik może wybrać zestaw fiszek do nauki (wszystkie lub z określonej kategorii)
  2. System umożliwia określenie liczby fiszek na sesję
  3. Użytkownik może rozpocząć sesję nauki jednym kliknięciem
  4. System prezentuje fiszki zgodnie z algorytmem powtórek
  5. Sesja nauki może być przerwana i wznowiona w dowolnym momencie

#### US-013
- ID: US-013
- Tytuł: Ocenianie wiedzy podczas nauki
- Opis: Jako użytkownik, chcę oceniać moją znajomość materiału podczas sesji nauki, aby algorytm powtórek mógł odpowiednio zaplanować kolejne powtórki.
- Kryteria akceptacji:
  1. Po wyświetleniu przedniej strony fiszki, użytkownik może zobaczyć odpowiedź
  2. Użytkownik może ocenić swoją znajomość materiału (np. skala 1-5)
  3. Na podstawie oceny, system dostosowuje harmonogram powtórek dla danej fiszki
  4. Ocena użytkownika jest zapisywana dla celów statystycznych
  5. System przechodzi do kolejnej fiszki po ocenie

#### US-014
- ID: US-014
- Tytuł: Podgląd postępów w nauce
- Opis: Jako użytkownik, chcę widzieć moje postępy w nauce, aby śledzić efektywność mojej pracy.
- Kryteria akceptacji:
  1. System wyświetla podstawowe statystyki nauki (liczba przerobionych fiszek, skuteczność)
  2. Użytkownik może zobaczyć, kiedy przypada kolejna powtórka dla poszczególnych fiszek
  3. System prezentuje dane o postępach w formie prostych wykresów lub tabel
  4. Użytkownik może filtrować statystyki według kategorii fiszek
  5. Dane o postępach są aktualizowane po każdej sesji nauki

## 6. Metryki sukcesu

### 6.1 Główne metryki sukcesu produktu

1. 75% fiszek wygenerowanych przez AI jest akceptowane przez użytkownika
   - Mierzone przez stosunek zatwierdzonych fiszek do wszystkich wygenerowanych przez AI
   - Monitorowane na poziomie pojedynczego użytkownika i globalnie dla wszystkich użytkowników

2. Użytkownicy tworzą 75% fiszek z wykorzystaniem AI
   - Mierzone przez stosunek fiszek wygenerowanych przez AI do wszystkich fiszek w systemie
   - Monitorowane w okresach tygodniowych i miesięcznych

### 6.2 Dodatkowe metryki

1. Zadowolenie użytkowników z jakości generowanych fiszek
   - Mierzone przez opcjonalne ankiety satysfakcji
   - Cel: średnia ocena 4/5 lub wyższa

2. Czas potrzebny na wygenerowanie fiszek przez AI
   - Mierzone jako średni czas od zlecenia generowania do przedstawienia wyników
   - Cel: poniżej 10 sekund

3. Retencja użytkowników
   - Mierzone jako procent użytkowników powracających do aplikacji w ciągu 7, 14 i 28 dni
   - Cel: minimum 40% retencji po 28 dniach

4. Średni czas spędzony na sesji nauki
   - Mierzone jako czas między rozpoczęciem a zakończeniem sesji nauki
   - Cel: minimum 10 minut dziennie per aktywny użytkownik

5. Wzrost liczby użytkowników
   - Mierzone jako przyrost nowych kont w okresach tygodniowych i miesięcznych
   - Cel: stabilny wzrost o minimum 10% miesięcznie w pierwszych 6 miesiącach

### 6.3 Monitorowanie metryk

1. System będzie automatycznie zbierał dane o interakcjach użytkowników
2. Cotygodniowe raporty zawierające analizę kluczowych metryk będą generowane dla zespołu
3. Na podstawie danych z metryk będą podejmowane decyzje o priorytetyzacji funkcji w przyszłych wersjach
4. W przypadku niezadowalających wyników, zespół będzie analizował przyczyny i wprowadzał odpowiednie korekty