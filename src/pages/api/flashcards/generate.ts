import { z } from "zod";
import type { APIContext } from "astro";
import { v4 as uuidv4 } from 'uuid';
import type { GeneratedFlashcardViewModel } from "../../../components/generator/GeneratorView";

export const prerender = false;

const flashcardGenerateSchema = z.object({
  text: z.string().trim().min(1).max(5000),
  category: z.string().trim().optional(),
});

export async function POST({ request, locals }: APIContext) {
  try {
    // Check authentication
    if (!locals.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Parse and validate request body
    const body = await request.json();
    const result = flashcardGenerateSchema.safeParse(body);
    
    if (!result.success) {
      return new Response(JSON.stringify({ 
        error: "Invalid input data", 
        details: result.error.format() 
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { text, category } = result.data;

    // Simulated AI generation (in a real app, this would call an AI service)
    // This is a placeholder that creates simple flashcards from the input text
    const flashcards: GeneratedFlashcardViewModel[] = generateFlashcardsFromText(text, category);

    return new Response(JSON.stringify({ 
      flashcards,
      count: flashcards.length 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return new Response(JSON.stringify({ error: "Server error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// Helper function to generate mock flashcards for development
function generateFlashcardsFromText(text: string, category?: string): GeneratedFlashcardViewModel[] {
  // Split text into sentences for simple mock generation
  const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 0);
  const flashcards: GeneratedFlashcardViewModel[] = [];

  // Create simple flashcards (in a real app, this would use AI to generate proper Q&A pairs)
  for (let i = 0; i < sentences.length; i += 2) {
    if (i + 1 < sentences.length) {
      flashcards.push({
        id: uuidv4(),
        front_text: sentences[i],
        back_text: sentences[i + 1],
        category,
        created_at: new Date().toISOString(),
      });
    } else {
      // Handle odd number of sentences
      flashcards.push({
        id: uuidv4(),
        front_text: sentences[i],
        back_text: "...",
        category,
        created_at: new Date().toISOString(),
      });
    }
  }

  return flashcards;
}
