import type { SupabaseClient } from '@supabase/supabase-js';
import type { FlashcardDTO } from '../../types';
import { AIService } from './ai.service';

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
    console.log('FlashcardService: Starting generation for text:', text.substring(0, 50) + '...');
    
    const aiResults = await this.ai.generateFlashcards({ text });
    console.log('FlashcardService: AI generated results:', aiResults);
    
    const flashcards = aiResults.map(result => ({
      user_id: userId,
      front_text: result.front,
      back_text: result.back,
      category,
      metadata: {}
    }));

    console.log('FlashcardService: Saving to database...');
    const { data, error } = await this.supabase
      .from('flashcards')
      .insert(flashcards)
      .select();

    if (error) {
      console.error('FlashcardService: Database error:', error);
      throw error;
    }
    
    console.log('FlashcardService: Successfully saved flashcards');
    return data;
  }
}
