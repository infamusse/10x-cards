import { useState, useCallback } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, FlipVertical } from "lucide-react";
import { type GeneratedFlashcardViewModel } from "./GeneratorView";

interface PreviewCardProps {
    flashcard: GeneratedFlashcardViewModel;
    onAccept: () => void;
    onReject: () => void;
}

export default function PreviewCard({ flashcard, onAccept, onReject }: PreviewCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Memoize the flip handler to prevent unnecessary re-renders
    const handleFlip = useCallback(() => {
        setIsFlipped(prev => !prev);
    }, []);

    // Determine the card status for styling
    const getCardStatusClass = () => {
        if (flashcard.approved === true) return "border-green-500";
        if (flashcard.approved === false) return "border-red-500";
        return "border-gray-200";
    };

    return (
        <Card className={`transition-all duration-200 ${getCardStatusClass()}`}>
            <CardContent className="p-6">
                <div className="relative min-h-[120px] flex items-center justify-center">
                    {/* Front of card */}
                    <div
                        className={`w-full transition-all duration-300 ${isFlipped ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            }`}
                    >
                        <h3 className="font-bold mb-2">Front</h3>
                        <p>{flashcard.front_text}</p>
                    </div>

                    {/* Back of card */}
                    <div
                        className={`absolute inset-0 w-full transition-all duration-300 ${isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                    >
                        <h3 className="font-bold mb-2">Back</h3>
                        <p>{flashcard.back_text}</p>
                    </div>
                </div>

                {flashcard.category && (
                    <div className="mt-4">
                        <span className="bg-gray-100 dark:bg-gray-800 text-xs rounded-full px-2 py-1">
                            {flashcard.category}
                        </span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between gap-2 p-4 bg-gray-50 dark:bg-gray-900">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFlip}
                    aria-label="Flip card"
                    className="flex items-center gap-1"
                >
                    <FlipVertical className="w-4 h-4" />
                    <span>Flip</span>
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReject}
                        disabled={flashcard.approved === false}
                        className={`text-red-600 ${flashcard.approved === false ? "bg-red-100" : ""
                            }`}
                        aria-label="Reject flashcard"
                    >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onAccept}
                        disabled={flashcard.approved === true}
                        className={`text-green-600 ${flashcard.approved === true ? "bg-green-100" : ""
                            }`}
                        aria-label="Accept flashcard"
                    >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Accept
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
