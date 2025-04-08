# Schemat bazy danych

## 1. Tabele i kolumny

### Tabela `users`
- **id**: UUID, PRIMARY KEY, NOT NULL, default generowany np. przez `gen_random_uuid()`
- **email**: TEXT, NOT NULL, UNIQUE
- **hashed_password**: TEXT, NOT NULL
- **created_at**: TIMESTAMPTZ, NOT NULL, DEFAULT now()

### Tabela `flashcards`
- **id**: UUID, PRIMARY KEY, NOT NULL, default generowany np. przez `gen_random_uuid()`
- **user_id**: UUID, NOT NULL, FOREIGN KEY odnosi się do `users(id)`
- **front_text**: TEXT, NOT NULL
- **back_text**: TEXT, NOT NULL
- **category**: TEXT, NULL
- **metadata**: JSONB, NOT NULL, DEFAULT '{}'  -- przechowuje ogólny stan powtórek
- **created_at**: TIMESTAMPTZ, NOT NULL, DEFAULT now()
- **updated_at**: TIMESTAMPTZ, NOT NULL, DEFAULT now()

## 2. Relacje
- Relacja 1:n między `users` a `flashcards`: jeden użytkownik może posiadać wiele fiszek.
- Klucz obcy: `flashcards.user_id` odnosi się do `users.id`.

## 3. Indeksy
- Indeks na kolumnie `flashcards.user_id` w celu optymalizacji zapytań:
  - ```sql
    CREATE INDEX idx_flashcards_user_id ON flashcards(user_id);
    ```

## 4. Zasady RLS (Row-Level Security)
- **Włączenie RLS** na obu tabelach:
  - ```sql
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
    ```
- **Przykładowa polityka RLS dla tabeli `flashcards`**:
  - Umożliwia dostęp tylko użytkownikowi, którego `id` jest równe `user_id` dla danej fiszki.
  - ```sql
    CREATE POLICY flashcards_owner_policy ON flashcards
      USING (user_id = current_setting('app.current_user_id')::uuid);
    ```

## Dodatkowe uwagi
- Schemat został zaprojektowany zgodnie z wymaganiami:
  - Oddzielenie danych użytkowników oraz ich fiszek.
  - Przechowywanie dynamicznych metadanych w formacie JSONB.
  - Użycie RLS, aby użytkownik miał dostęp wyłącznie do własnych danych.
  - Indeksowanie kolumny `user_id` dla lepszej wydajności zapytań.