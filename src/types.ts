import { z } from 'zod';

/**
 * Generic JSON type from the database definitions.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * The FlashcardDTO corresponds to the flashcards entity from the database.
 */
export interface FlashcardDTO {
  id: string;
  user_id: string;
  front_text: string;
  back_text: string;
  category?: string | null;
  created_at: string;
  metadata: Record<string, unknown>;
}

/**
 * 1. Flashcards Endpoints DTOs & Command Models
 */

/* POST /api/flashcards/generate */

// Request DTO for generating flashcards via AI.
export const generateFlashcardsSchema = z.object({
  text: z.string().min(1).max(5000),
  category: z.string().optional()
});

export type GenerateFlashcardsRequestDTO = z.infer<typeof generateFlashcardsSchema>;

// Response DTO with a list of generated flashcards (subset of FlashcardDTO).
export interface GenerateFlashcardsResponseDTO {
  flashcards: FlashcardDTO[];
}

/* POST /api/flashcards */

// Request DTO for creating a flashcard manually.
export interface CreateFlashcardRequestDTO {
  front_text: string;
  back_text: string;
  category?: string;
}

// Response DTO reusing FlashcardDTO.
export interface CreateFlashcardResponseDTO extends FlashcardDTO {}

/* GET /api/flashcards */

// Response DTO including paginated flashcards.
export interface GetFlashcardsResponseDTO {
  flashcards: FlashcardDTO[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

/* PATCH /api/flashcards/:id */

// Request DTO for updating a flashcard.
export interface UpdateFlashcardRequestDTO {
  front_text?: string;
  back_text?: string;
  category?: string;
}

// Response DTO after updating, reusing FlashcardDTO.
export interface UpdateFlashcardResponseDTO extends FlashcardDTO {}

/* DELETE /api/flashcards/:id */
// No DTO response; a 204 No Content status is returned.

/**
 * 2. Study Sessions Endpoints DTOs & Command Models
 */

/* POST /api/study/start */

// Request DTO for starting a study session.
export interface StartStudySessionRequestDTO {
  category?: string;
  limit?: number;
}

// A minimal flashcard representation used during study sessions.
export interface StudyFlashcardDTO {
  id: string;
  front_text: string;
}

// Response DTO for starting a study session.
export interface StartStudySessionResponseDTO {
  session_id: string;
  flashcards: StudyFlashcardDTO[];
}

/* POST /api/study/:session_id/rate */

// Request DTO for rating a flashcard during a study session.
export interface RateFlashcardRequestDTO {
  flashcard_id: string;
  rating: number; // Expected to be between 1 and 5
}

// Response DTO providing next review information.
export interface RateFlashcardResponseDTO {
  next_review_date: string;
  next_flashcard: StudyFlashcardDTO;
}

/* GET /api/study/progress */

// Response DTO for study progress statistics.
export interface StudyProgressResponseDTO {
  total_cards: number;
  mastered_cards: number;
  study_sessions: number;
  average_rating: number;
  next_reviews: {
    date: string;
    count: number;
  }[];
}