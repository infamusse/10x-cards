# FlashMaster AI

## Project Description
FlashMaster AI is a web application designed to create and manage educational flashcards using artificial intelligence. The tool streamlines the process of flashcard creation by automatically generating content from provided text, allowing users to efficiently focus on learning through spaced repetition.

## Tech Stack
- **Astro 5** – Fast, modern static site generator
- **React 19** – For interactive components
- **TypeScript 5** – Static typing for robust code
- **Tailwind CSS 4** – Utility-first styling
- **Shadcn/ui** – Accessible, pre-built UI components
- **Supabase** – Backend services including PostgreSQL and authentication

## Getting Started Locally
1. Ensure you have Node.js **22.14.0** installed (using [nvm](https://github.com/nvm-sh/nvm) is recommended).
2. Clone the repository:
   ```bash
   git clone <repository_url>
   cd 10x-cards
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts
- **dev**: Run the Astro development server.
- **build**: Build the project for production.
- **preview**: Preview the production build locally.
- **lint**: Run ESLint to analyze code quality.
- **lint:fix**: Automatically fix lint issues.
- **format**: Format the code using Prettier.

## Project Scope
FlashMaster AI offers the following features:
- **AI-Powered Flashcard Generation**: Generate flashcards automatically from provided text.
- **Manual Flashcard Creation & Editing**: Create and modify flashcards manually.
- **Flashcard Management**: Organize, review, and delete flashcards.
- **User Authentication**: Registration, login, and secure session management.
- **Review Sessions**: Spaced repetition algorithm to optimize learning.

_Out of Scope (for MVP):_
- Importing multiple file formats (only copy-paste text is supported).
- Advanced analytics, mobile applications, and extensive social features.

## Project Status
The project is currently in the MVP stage, focusing on core functionality and usability improvements.

## License
This project is licensed under the MIT License.
