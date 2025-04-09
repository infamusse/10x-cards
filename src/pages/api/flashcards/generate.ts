import type { APIRoute } from 'astro';
import { generateFlashcardsSchema } from '../../../types';
import { AIService } from '../../../lib/services/ai.service';
import { FlashcardService } from '../../../lib/services/flashcard.service';
import { ZodError } from 'zod';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    console.log('Processing request for flashcards generation');
    const json = await request.json();
    console.log('Request body:', json);

    const { text, category } = generateFlashcardsSchema.parse(json);
    console.log('Validated input - text length:', text.length, 'category:', category);
    
    const flashcardService = new FlashcardService(
      locals.supabase,
      new AIService()
    );

    // Using a valid UUID for testing
    const flashcards = await flashcardService.generateFromText(
      text,
      '00000000-0000-0000-0000-000000000000',  // Valid UUID format for testing
      category
    );
    console.log('Generated flashcards:', flashcards);

    return new Response(JSON.stringify({ flashcards }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Detailed error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      supabase: !!locals.supabase
    });
    
    return new Response(JSON.stringify({
      error: error?.message || 'Unknown error occurred',
      type: error?.name || 'UnknownError'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const prerender = false;
