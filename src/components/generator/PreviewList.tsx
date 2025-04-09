import { useState } from "react";
import { Button } from "../ui/button";
import { type GeneratedFlashcardViewModel } from "./GeneratorView";

interface PreviewListProps {
    flashcards: GeneratedFlashcardViewModel[];
    onAcceptCard: (id: string) => void;
    onRejectCard: (id: string) => void;
}

export default function PreviewList({
    flashcards,
    onAcceptCard,
    onRejectCard
}: PreviewListProps) {
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

    const toggleFlip = (id: string) => {
        setFlippedCardId(flippedCardId === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Generated Flashcards</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcards.map((card) => (
                    <div
                        key={card.id}
                        className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${card.approved === true ? 'border-green-500' :
                                card.approved === false ? 'border-red-500' : 'border-gray-200'
                            }`}
                    >
                        <div
                            className="cursor-pointer p-6 min-h-[160px] flex items-center justify-center bg-white"
                            onClick={() => toggleFlip(card.id)}
                        >
                            <p className="text-center">
                                {flippedCardId === card.id ? card.back_text : card.front_text}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 flex justify-between">
                            {card.category && (
                                <span className="text-sm text-gray-500">#{card.category}</span>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={card.approved === false ? "outline" : "destructive"}
                                    onClick={() => onRejectCard(card.id)}
                                    className="text-xs"
                                >
                                    Reject
                                </Button>
                                <Button
                                    size="sm"
                                    variant={card.approved === true ? "outline" : "default"}
                                    onClick={() => onAcceptCard(card.id)}
                                    className="text-xs"
                                >
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
