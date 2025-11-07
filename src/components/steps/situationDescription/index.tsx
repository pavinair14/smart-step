import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getAISuggestion } from "@/services/aiClient";
import { useFormContext } from "react-hook-form";
import { descriptionFields } from "./constants";
import { SuggestionModal } from "./SuggestionModal";
import { Field } from "@/components/shared/Field";
import { Sparkle } from "lucide-react";

export const SituationDescription = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();

    const [activeField, setActiveField] = useState<string | null>(null);
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    /** Handle AI suggestion */
    const handleAIClick = useCallback(async (field: string, label: string) => {
        setActiveField(field);
        setLoading(true);

        const userText = watch(field);
        const prompt = `Write a short, realistic, professional description for "${label}". Be concise and avoid lists. Current text: ${userText ? `"${userText}"` : "none"}.`;

        try {
            const aiText = await getAISuggestion(prompt);
            setSuggestion(aiText);
            setOpen(true);
        } catch (err) {
            console.error("AI suggestion failed:", err);
        } finally {
            setLoading(false);
        }
    }, [watch]);

    /** Accept suggestion */
    const handleAccept = useCallback(() => {
        if (activeField && suggestion) {
            setValue(activeField, suggestion, { shouldValidate: true, shouldDirty: true });
        }
        setOpen(false);
    }, [activeField, suggestion, setValue]);

    /** Rewrite suggestion */
    const handleRewrite = useCallback(async () => {
        if (!activeField || !suggestion) return;

        setLoading(true);
        const prompt = `Rewrite this text to an alternative concise professional version. Keep it realistic, plain text, no lists: "${suggestion}"`;

        try {
            const aiText = await getAISuggestion(prompt);
            setSuggestion(aiText);
        } catch (err) {
            console.error("AI rewrite failed:", err);
        } finally {
            setLoading(false);
        }
    }, [activeField, suggestion]);

    return (
        <>
            <div className="space-y-6">
                {descriptionFields.map(({ id, label }) => {
                    const isActive = activeField === id;
                    const isLoading = loading && isActive;

                    return (
                        <div key={id} className="relative">
                            <Field
                                id={id}
                                label={label}
                                as="textarea"
                                fullWidth
                                className="pr-41 h-28"
                                register={register(id)}
                                error={errors[id]?.message as string | undefined}
                            />
                            <div className="absolute bottom-3 right-3 p-[2px] rounded-md bg-gradient-to-r from-violet-600 to-teal-400">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleAIClick(id, label)}
                                    disabled={isLoading}
                                    aria-busy={isLoading}
                                    className="bg-white text-violet-950 hover:bg-white w-full rounded-md disabled:opacity-100"
                                >
                                    <Sparkle
                                        className={`inline-block text-violet-900 mr-2 ${isLoading ? "animate-spin" : ""}`}
                                        size={16}
                                    />
                                    {isLoading ? "Thinking..." : "Help me write"}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <SuggestionModal
                open={open}
                setOpen={setOpen}
                loading={loading}
                suggestion={suggestion}
                setSuggestion={setSuggestion}
                handleRewrite={handleRewrite}
                handleAccept={handleAccept}
            />
        </>
    );
};

export default SituationDescription;
