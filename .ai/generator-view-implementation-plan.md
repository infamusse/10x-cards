
# Plan implementacji widoku Generator Fiszek AI

## 1. Przegląd
Widok Generator Fiszek AI pozwala użytkownikowi wkleić treść tekstu i wygenerować fiszki za pomocą endpointu /api/flashcards/generate. Po wygenerowaniu wyświetlany jest podgląd fiszek ze wskaźnikami postępu i możliwością zatwierdzania lub odrzucania wyników.

## 2. Routing widoku
Ścieżka: /dashboard/generator  
Będzie to strona dostępna po zalogowaniu, w ramach sekcji “dashboard”.

## 3. Struktura komponentów
- GeneratorPage (strona główna widoku)
  - GeneratorForm (formularz wklejenia tekstu i przycisk “Generuj”)
  - PreviewList (lista wygenerowanych fiszek)
    - PreviewCard (pojedyncza fiszka w podglądzie)

## 4. Szczegóły komponentów

### GeneratorPage
- Opis: Kontener strony obsługujący stan i zdarzenia związane z generowaniem fiszek.
- Główne elementy:
  - Sekcja z tytułem “Generator Fiszek AI”
  - Komponent GeneratorForm
  - Komponent PreviewList
- Obsługiwane interakcje:
  - Przesyłanie danych do API
  - Wyświetlanie wyników
- Obsługiwana walidacja:
  - Sprawdzanie, czy tekst wejściowy nie jest pusty
- Typy:
  - Nie wymaga własnego typu propów, korzysta wyłącznie z wewnętrznego stanu
- Propsy: Brak

### GeneratorForm
- Opis: Formularz zawierający pole tekstowe i opcjonalnie pole kategorii, przycisk "Generuj".
- Główne elementy:
  - Pole textarea (obsługuje wklejany tekst)
  - Pole input (opcjonalna kategoria)
  - Przycisk “Generuj” z eventem onClick
- Obsługiwane interakcje:
  - Wysyłanie tekstu i wywołanie funkcji generowania
- Obsługiwana walidacja:
  - Minimalna długość tekstu > 1
  - Maksymalna długość tekstu <= 5000
- Typy:
  - GeneratorFormValues: { text: string; category?: string }
- Propsy:
  - onGenerate(values: GeneratorFormValues): void

### PreviewList
- Opis: Wyświetla listę wygenerowanych fiszek w formie kart.
- Główne elementy:
  - Mapa fiszek (PreviewCard)
  - Informacja o postępie (jeśli generowanie trwa)
- Obsługiwane interakcje:
  - Odrzucanie i zatwierdzanie poszczególnych kart
- Obsługiwana walidacja:
  - Brak bezpośredniej walidacji, używa danych otrzymanych z API
- Typy:
  - PreviewListProps: { flashcards: GeneratedFlashcardViewModel[] }
- Propsy:
  - flashcards: tablica obiektów fiszek
  - onAcceptCard?: (id: string) => void
  - onRejectCard?: (id: string) => void

### PreviewCard
- Opis: Pojedyncza fiszka w podglądzie z przyciskami “Zatwierdź” i “Odrzuć”.
- Główne elementy:
  - Front fiszki
  - Back fiszki
  - Przycisk "Zatwierdź"
  - Przycisk "Odrzuć"
- Obsługiwane interakcje:
  - onAccept, onReject
- Obsługiwana walidacja:
  - Brak wewnętrznej walidacji
- Typy:
  - PreviewCardProps: { id: string; front_text: string; back_text: string; onAccept?: () => void; onReject?: () => void }
- Propsy:
  - id, front_text, back_text
  - onAccept, onReject

## 5. Typy
- type GenerateFlashcardsRequestDTO = { text: string; category?: string; }
- interface GeneratedFlashcardViewModel {
  id: string;
  front_text: string;
  back_text: string;
  category?: string;
  created_at?: string;
}
- Rozszerzymy FlashcardDTO o pole tymczasowe “approved?: boolean” tylko w warstwie widoku (nie w bazie).

## 6. Zarządzanie stanem
- W GeneratorPage można użyć useState do przechowywania:
  - Tekstu wejściowego
  - Listy wygenerowanych fiszek (GeneratedFlashcardViewModel[])
  - Stanu ładowania (isLoading)
  - Ewentualnych błędów (error)

## 7. Integracja API
- Endpoint: POST /api/flashcards/generate
- Wywołanie w GeneratorPage:
  - fetch(‘/api/flashcards/generate’, { method: ‘POST’, body: JSON.stringify(requestDTO) })
- Odpowiedź typu: { flashcards: GeneratedFlashcardViewModel[] }
- Po otrzymaniu danych zapisujemy w stanie listę wygenerowanych fiszek.

## 8. Interakcje użytkownika
- Użytkownik wpisuje tekst w GeneratorForm i klika “Generuj” → Wywołanie API → Podczas oczekiwania pokazywany loader.
- Gdy przyjdzie odpowiedź, GeneratorPage przekazuje listę fiszek do PreviewList.
- Podgląd fiszek w PreviewList → Możliwe zatwierdzanie lub odrzucanie pojedynczych kart w PreviewCard (opcjonalnie w MVP można pominąć tę interakcję i zatwierdzać całość).

## 9. Warunki i walidacja
- Warunek wklejenia tekstu (min 1 znak) jest weryfikowany w GeneratorForm.
- W razie braku spełnienia warunku pokazujemy komunikat błędu i nie wysyłamy zapytania.
- Jeśli API zwróci błąd (400), wyświetlamy go w GeneratorPage.

## 10. Obsługa błędów
- Błędy wejściowe: Puste pole tekstu w GeneratorForm → Wyświetlenie komunikatu “Text is required”.
- Błąd 400 z API → “Niepoprawne dane” w GeneratorPage.
- Błąd 500 → Komunikat “Wystąpił błąd serwera” w GeneratorPage, logowanie w konsoli.

## 11. Kroki implementacji
1. Utworzyć routing dla ścieżki /dashboard/generator.
2. Zaimplementować GeneratorPage z useState (tekst wejściowy, lista fiszek, isLoading, error).
3. Stworzyć komponent GeneratorForm z polami textarea i category + walidacja minimalnej długości tekstu.
4. Przy submit: wywołać POST /api/flashcards/generate, ustawić isLoading i obsłużyć ewentualne błędy.
5. Po pomyślnym zapytaniu umieścić dane w stanie flashcards, wyłączyć isLoading.
6. Zaimplementować PreviewList i PreviewCard do wyświetlania wygenerowanych fiszek.
7. Obsłużyć zatwierdzanie/odrzucanie (opcjonalnie w MVP) i zaktualizować lokalny stan.
8. Przetestować interakcje i obsługę błędów.
