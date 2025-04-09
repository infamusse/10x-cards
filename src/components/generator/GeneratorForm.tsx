import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type GeneratorFormValues } from "./GeneratorView";

interface GeneratorFormProps {
    onGenerate: (values: GeneratorFormValues) => void;
}

export default function GeneratorForm({ onGenerate }: GeneratorFormProps) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [textError, setTextError] = useState("");

    const MAX_TEXT_LENGTH = 5000;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!text.trim()) {
            setTextError("Text is required");
            return;
        }

        if (text.trim().length > MAX_TEXT_LENGTH) {
            setTextError(`Text must be ${MAX_TEXT_LENGTH} characters or less`);
            return;
        }

        // Clear any previous errors
        setTextError("");

        // Call the parent handler
        onGenerate({
            text: text.trim(),
            category: category.trim() || undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="space-y-2">
                <Label htmlFor="text">Text content</Label>
                <Textarea
                    id="text"
                    placeholder="Paste your text here to generate flashcards..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`min-h-40 ${textError ? 'border-red-500' : ''}`}
                    aria-describedby={textError ? "text-error" : undefined}
                />
                {textError && (
                    <p id="text-error" className="text-red-500 text-sm mt-1">{textError}</p>
                )}
                <p className="text-gray-500 text-sm">
                    {text.length}/{MAX_TEXT_LENGTH} characters
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category (optional)</Label>
                <Input
                    id="category"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
                Generate Flashcards
            </Button>
        </form>
    );
}
