# API Endpoint Implementation Plan: Generate Flashcards

## 1. Przegląd punktu końcowego
Endpoint generujący fiszki na podstawie dostarczonego tekstu przy użyciu modelu AI. Przetwarza tekst wejściowy, generuje fiszki i zapisuje je w bazie danych dla zalogowanego użytkownika.

## 2. Szczegóły żądania
- Metoda HTTP: POST
- Ścieżka URL: /api/flashcards/generate
- Headers:
  - Authorization: Bearer token
  - Content-Type: application/json
- Request Body:
  ```typescript
  {
    text: string;      // Required, text to generate flashcards from
    category?: string  // Optional, category for generated flashcards
  }
  ```

## 3. Wykorzystywane typy
```typescript
// Reuse existing types from src/types.ts
import type { 
  GenerateFlashcardsRequestDTO,
  GenerateFlashcardsResponseDTO,
  FlashcardDTO
} from '../types';

// New types for internal use
interface AIFlashcardPrompt {
  text: string;
  maxCards?: number;
}

interface AIFlashcardResult {
  front: string;
  back: string;
}

// Zod schema for validation
const generateFlashcardsSchema = z.object({
  text: z.string().min(1).max(5000),
  category: z.string().optional()
});
```

## 4. Szczegóły odpowiedzi
- Success (200):
  ```typescript
  {
    flashcards: {
      id: string;
      front_text: string;
      back_text: string;
      category?: string;
      created_at: string;
    }[]
  }
  ```
- Errors:
  - 400: Invalid input
  - 401: Unauthorized
  - 429: Rate limit exceeded
  - 500: Server/AI error

## 5. Przepływ danych
1. Walidacja żądania
2. Autoryzacja użytkownika
3. Sprawdzenie limitów rate-limit
4. Wywołanie AI do generacji fiszek
5. Zapis wygenerowanych fiszek do bazy
6. Zwrot odpowiedzi z utworzonymi fiszkami

## 6. Względy bezpieczeństwa
1. Autentykacja:
   - Wymagany ważny JWT token
   - Weryfikacja user_id z tokena
2. Autoryzacja:
   - RLS w bazie danych
   - Sprawdzanie uprawnień użytkownika
3. Rate Limiting:
   - Limit 10 requestów/minutę per użytkownik
   - Limit dzienny na wykorzystanie AI
4. Walidacja danych:
   - Sanityzacja tekstu wejściowego
   - Maksymalna długość tekstu
   - Walidacja kategorii

## 7. Obsługa błędów
1. Walidacja wejścia:
   ```typescript
   if (!isValidInput) {
     throw new Error('Invalid input', { status: 400 });
   }
   ```
2. Rate limiting:
   ```typescript
   if (isRateLimited) {
     throw new Error('Too many requests', { status: 429 });
   }
   ```
3. AI errors:
   ```typescript
   if (aiError) {
     throw new Error('AI service error', { status: 500 });
   }
   ```

## 8. Rozważania dotyczące wydajności
1. Caching:
   - Cache wyników AI dla podobnych tekstów
   - Cache kosztownych operacji parsowania
2. Optymalizacja DB:
   - Batch insert dla wielu fiszek
   - Indeksy na często używanych polach
3. AI:
   - Timeout dla długich requestów
   - Retry strategy dla failed requests
   - Kolejkowanie długich zadań

## 9. Etapy wdrożenia

### 1. Serwis AI
```typescript
// src/lib/services/ai.service.ts
export class AIService {
  constructor(private readonly openRouter: OpenRouterClient) {}

  async generateFlashcards(prompt: AIFlashcardPrompt): Promise<AIFlashcardResult[]> {
    const response = await this.openRouter.generate({
      prompt: this.createPrompt(prompt),
      max_tokens: 1000,
      temperature: 0.7
    });

    return this.parseResponse(response);
  }
}
```

### 2. Serwis fiszek
```typescript
// src/lib/services/flashcard.service.ts
export class FlashcardService {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly ai: AIService
  ) {}

  async generateFromText(
    text: string, 
    userId: string, 
    category?: string
  ): Promise<FlashcardDTO[]> {
    const aiResults = await this.ai.generateFlashcards({ text });
    const flashcards = aiResults.map(result => ({
      user_id: userId,
      front_text: result.front,
      back_text: result.back,
      category,
      metadata: {}
    }));

    const { data, error } = await this.supabase
      .from('flashcards')
      .insert(flashcards)
      .select();

    if (error) throw error;
    return data;
  }
}
```

### 3. Endpoint API
```typescript
// src/pages/api/flashcards/generate.ts
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { text, category } = generateFlashcardsSchema.parse(
      await request.json()
    );
    
    const userId = locals.user?.id;
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const flashcardService = new FlashcardService(
      locals.supabase,
      new AIService(new OpenRouterClient())
    );

    const flashcards = await flashcardService.generateFromText(
      text,
      userId,
      category
    );

    return new Response(JSON.stringify({ flashcards }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response('Invalid input', { status: 400 });
    }
    // Handle other errors...
    return new Response('Internal server error', { status: 500 });
  }
};

export const prerender = false;
```

### 4. Testy
```typescript
// src/lib/services/__tests__/flashcard.service.test.ts
describe('FlashcardService', () => {
  describe('generateFromText', () => {
    test('generates and saves flashcards');
    test('handles AI service errors');
    test('validates user access');
  });
});
```

### 5. Dokumentacja API
Aktualizacja dokumentacji OpenAPI/Swagger o nowy endpoint.

### 6. Monitoring
Dodanie metryk dla:
- Czasu odpowiedzi AI
- Liczby generowanych fiszek
- Błędów AI
- Wykorzystania rate limitu