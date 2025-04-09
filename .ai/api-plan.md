# REST API Plan

## 1. Resources

### 1.1 Users
- Maps to `users` table
- Represents registered users of the system
- Core fields: id, email

### 1.2 Flashcards
- Maps to `flashcards` table
- Represents individual flashcards owned by users
- Core fields: id, front_text, back_text, category, metadata

## 2. Endpoints

### 2.1 Flashcards

#### POST /api/flashcards/generate
Description: Generate flashcards from provided text using AI
```json
// Request
{
  "text": "string",
  "category": "string?"
}

// Response 200
{
  "flashcards": [{
    "id": "uuid",
    "front_text": "string",
    "back_text": "string",
    "category": "string?",
    "created_at": "datetime"
  }]
}

// Error 400 - Invalid input
{
  "error": "Text is required"
}
```

#### POST /api/flashcards
Description: Create a new flashcard manually
```json
// Request
{
  "front_text": "string",
  "back_text": "string",
  "category": "string?"
}

// Response 201
{
  "id": "uuid",
  "front_text": "string",
  "back_text": "string",
  "category": "string?",
  "created_at": "datetime"
}
```

#### GET /api/flashcards
Description: Get user's flashcards with optional filtering and pagination
Query params:
- `category`: string (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)
```json
// Response 200
{
  "flashcards": [{
    "id": "uuid",
    "front_text": "string",
    "back_text": "string",
    "category": "string?",
    "created_at": "datetime",
    "metadata": {}
  }],
  "pagination": {
    "total": "number",
    "page": "number",
    "totalPages": "number"
  }
}
```

#### PATCH /api/flashcards/:id
Description: Update flashcard content
```json
// Request
{
  "front_text": "string?",
  "back_text": "string?",
  "category": "string?"
}

// Response 200
{
  "id": "uuid",
  "front_text": "string",
  "back_text": "string",
  "category": "string?",
  "updated_at": "datetime"
}

// Error 404 - Flashcard not found
{
  "error": "Flashcard not found"
}
```

#### DELETE /api/flashcards/:id
Description: Delete a flashcard
```json
// Response 204
```

### 2.2 Study Sessions

#### POST /api/study/start
Description: Start a new study session
```json
// Request
{
  "category": "string?",
  "limit": "number?"
}

// Response 200
{
  "session_id": "uuid",
  "flashcards": [{
    "id": "uuid",
    "front_text": "string"
  }]
}
```

#### POST /api/study/:session_id/rate
Description: Rate flashcard knowledge during study session
```json
// Request
{
  "flashcard_id": "uuid",
  "rating": "number" // 1-5
}

// Response 200
{
  "next_review_date": "datetime",
  "next_flashcard": {
    "id": "uuid",
    "front_text": "string"
  }
}
```

#### GET /api/study/progress
Description: Get study progress statistics
```json
// Response 200
{
  "total_cards": "number",
  "mastered_cards": "number",
  "study_sessions": "number",
  "average_rating": "number",
  "next_reviews": [{
    "date": "datetime",
    "count": "number"
  }]
}
```

## 3. Authentication and Authorization

### 3.1 Authentication Flow
- Uses JWT (JSON Web Tokens) for session management
- Tokens are passed in Authorization header: `Authorization: Bearer <token>`
- Tokens expire after 24 hours
- Refresh token mechanism implemented for seamless session extension

### 3.2 Authorization Rules
- All API endpoints except /auth/register and /auth/login require authentication
- Users can only access their own flashcards and study sessions
- RLS policies from database are enforced at API level

## 4. Validation and Business Logic

### 4.1 User Validation
- Email must be valid format
- Password minimum 8 characters, must include letters and numbers
- Unique email constraint enforced

### 4.2 Flashcard Validation
- front_text and back_text are required
- Maximum length: 1000 characters per side
- Category is optional but must be string if provided

### 4.3 Study Session Logic
- Uses spaced repetition algorithm based on user ratings
- Review intervals calculated based on performance history
- Metadata stored in flashcard.metadata JSONB field

### 4.4 Rate Limiting
- 100 requests per minute per user for regular endpoints
- 10 requests per minute for AI generation endpoint
- Study session endpoints limited to realistic human interaction rates

### 4.5 Error Handling
- All errors return appropriate HTTP status codes
- Error responses include meaningful messages
- Validation errors include specific field-level feedback
