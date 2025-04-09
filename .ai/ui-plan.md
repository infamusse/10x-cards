# Architektura UI dla FlashMaster AI

## 1. Przegląd struktury UI

System opiera się na głównym panelu dashboard, w którym użytkownik po zalogowaniu ma dostęp do trzech głównych zakładek: fiszki, generator i sesja nauki. Layout zapewnia responsywność z naciskiem na widok desktop, z późniejszą adaptacją do urządzeń mobilnych. Projekt uwzględnia zarządzanie stanem oraz obsługę błędów z widocznymi komunikatami.

## 2. Lista widoków

- **Dashboard (Panel główny)**
  - Ścieżka: `/dashboard`
  - Główny cel: Centralne miejsce dostępu do wszystkich funkcjonalności aplikacji.
  - Kluczowe informacje: Podsumowanie statystyk, powiadomienia błędów oraz skróty do poszczególnych modułów.
  - Kluczowe komponenty: Pasek nawigacji, alerty błędów, panel powiadomień, lista skrótów.
  - UX/dostępność/bezpieczeństwo: Jasne komunikaty, czytelna hierarchia informacji, obsługa klawiatury i czytników ekranowych.

- **Zakładka Fiszek**
  - Ścieżka: `/dashboard/flashcards`
  - Główny cel: Przegląd i zarządzanie kolekcją fiszek.
  - Kluczowe informacje: Lista fiszek (tylko podgląd przedniej strony, kategoria, data utworzenia), opcje edycji i usuwania.
  - Kluczowe komponenty: Tabela/siatka fiszek, przyciski akcji (edytuj, usuń), paginacja.
  - UX/dostępność/bezpieczeństwo: Prostota interakcji, walidacja działań, potwierdzenia krytycznych operacji.

- **Zakładka Generatora Fiszek AI**
  - Ścieżka: `/dashboard/generator`
  - Główny cel: Automatyczne generowanie fiszek na podstawie wprowadzonego tekstu.
  - Kluczowe informacje: Pole tekstowe do wkleić materiał, przycisk generacji, widok podglądu wygenerowanych fiszek.
  - Kluczowe komponenty: Formularz wejściowy, loader podczas działania AI, lista podglądowych fiszek z możliwymi akcjami (zatwierdź/odrzuć).
  - UX/dostępność/bezpieczeństwo: Informacja o postępie generacji, akcenty wizualne przy błędach, aria-live dla dynamicznych aktualizacji.

- **Zakładka Sesji Nauki**
  - Ścieżka: `/dashboard/study`
  - Główny cel: Rozpoczęcie i monitorowanie sesji nauki z fiszkami.
  - Kluczowe informacje: Lista fiszek na sesję, przyciski do rozpoczęcia, opcje oceny wiedzy, alerty błędów zapisu sesji.
  - Kluczowe komponenty: Panel sesji (lista fiszek z pytaniami), mechanizm oceniania (np. skala 1-5), komunikat o zapisie sesji (alert).
  - UX/dostępność/bezpieczeństwo: Szybka informacja zwrotna, widoczne komunikaty błędów, bezpieczna komunikacja z API.

- **Widok Logowania/Rejestracji**
  - Ścieżka: `/auth/login` i `/auth/register`
  - Główny cel: Autoryzacja użytkownika i dostęp do aplikacji.
  - Kluczowe informacje: Formularz logowania/rejestracji, informacje o błędach podczas weryfikacji danych.
  - Kluczowe komponenty: Formularze wejściowe, przyciski akcji, komunikaty walidacyjne.
  - UX/dostępność/bezpieczeństwo: Bezpieczne logowanie, walidacja po stronie klienta, łatwość obsługi przez czytniki ekranowe.

## 3. Mapa podróży użytkownika

1. Użytkownik wchodzi na stronę logowania/rejestracji → wprowadza dane → uwierzytelnia się.
2. Po zalogowaniu trafia do dashboardu, który prezentuje ogólne informacje i skróty.
3. Użytkownik wybiera zakładkę:
   - Fiszki: przegląda, edytuje lub usuwa istniejące fiszki.
   - Generator: wpisuje tekst, generuje fiszki za pomocą AI, przegląda wyniki i zatwierdza te, które chce zachować.
   - Sesja nauki: wybiera zestaw fiszek, rozpoczyna sesję, ocenia wiedzę, a system zapisuje stan sesji przez dedykowany endpoint.
4. W przypadku wystąpienia błędów (np. przy zapisie sesji) użytkownik otrzymuje stylizowany alert z informacją, co poszło nie tak.

## 4. Układ i struktura nawigacji

- Pasek nawigacji umieszczony na górze dashboardu, umożliwiający szybki dostęp do zakładek: Fiszki, Generator, Sesja Nauki.
- Menu boczne lub dropdown dla dodatkowych opcji (np. profil, ustawienia, wylogowanie).
- Breadcrumbs w widokach szczegółowych (np. edycja fiszki) w celu ułatwienia nawigacji.
- Responsywne elementy umożliwiające łatwe korzystanie na urządzeniach mobilnych.

## 5. Kluczowe komponenty

- **DashboardPanel**: Główny komponent renderujący treść zależną od wybranej zakładki.
- **FlashcardList**: Komponent prezentujący listę fiszek, z opcjami filtracji, paginacji i akcji.
- **AIGeneratorForm**: Formularz do wprowadzania tekstu i uruchamiania procesu generacji fiszek AI, wraz z loaderem.
- **StudySessionPanel**: Komponent obsługujący sesję nauki, wyświetlający fiszki do nauki, mechanizm oceniania i alerty błędów.
- **Alert**: Uniwersalny komponent do wyświetlania komunikatów błędów lub powiadomień, zapewniający odpowiednią dostępność.
