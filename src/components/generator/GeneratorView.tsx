import { useState } from "react";
import GeneratorForm from "./GeneratorForm";
import PreviewList from "./PreviewList";

// Define the types needed for the generator
export type GeneratorFormValues = {
    text: string;
    category?: string;
};

export interface GeneratedFlashcardViewModel {
    id: string;
    front_text: string;
    back_text: string;
    category?: string;
    created_at?: string;
    approved?: boolean; // Local UI state, not stored in database
}

export default function GeneratorView() {
    const [inputText, setInputText] = useState<string>("");
    const [flashcards, setFlashcards] = useState<GeneratedFlashcardViewModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (values: GeneratorFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/flashcards/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Invalid input data");
                } else {
                    throw new Error("Server error occurred");
                }
            }

            const data = await response.json();
            setFlashcards(data.flashcards);
            setInputText(values.text);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
            console.error("Error generating flashcards:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptCard = (id: string) => {
        setFlashcards(cards =>
            cards.map(card =>
                card.id === id ? { ...card, approved: true } : card
            )
        );
    };

    const handleRejectCard = (id: string) => {
        setFlashcards(cards =>
            cards.map(card =>
                card.id === id ? { ...card, approved: false } : card
            )
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Generator Fiszek AI</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
                    <p>{error}</p>
                </div>
            )}

            <GeneratorForm onGenerate={handleGenerate} />

            {isLoading && (
                <div className="flex justify-center my-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}

            {!isLoading && flashcards.length > 0 && (
                <PreviewList
                    flashcards={flashcards}
                    onAcceptCard={handleAcceptCard}
                    onRejectCard={handleRejectCard}
                />
            )}
        </div>
    );
}
