interface AIFlashcardPrompt {
  text: string;
  maxCards?: number;
}

interface AIFlashcardResult {
  front: string;
  back: string;
}

export class AIService {
  async generateFlashcards(prompt: AIFlashcardPrompt): Promise<AIFlashcardResult[]> {
    // MVP: Return mock data for initial testing
    return [
      {
        front: "What is TypeScript?",
        back: "A typed superset of JavaScript that compiles to plain JavaScript."
      },
      {
        front: "What are generics in TypeScript?",
        back: "A way to create reusable components that can work with multiple types."
      }
    ];
  }
}
