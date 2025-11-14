import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Field } from "@/components/common/Field";
import { Sparkle } from "lucide-react";
import { descriptionFields } from "../constants/situationDescription";
import SuggestionModal from "@/features/applicationForm/modals/SuggestionModal";
import { getContextualSuggestion, getRewrittenSuggestion } from "@/lib/openai/suggestionService";

const SituationDescription = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const { t } = useTranslation();

    const [activeField, setActiveField] = useState<string | null>(null);
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    /** Handle AI suggestion */
    const handleAIClick = useCallback(async (fieldId: string, context: string) => {
        setActiveField(fieldId);
        setLoading(true);

        try {
            const userText = String(watch(fieldId) || "").trim();
            const result = await getContextualSuggestion(userText, context, t);

            setSuggestion(result.content);
            setOpen(true);
        } catch (err) {
            console.error("AI suggestion failed:", err);
        } finally {
            setLoading(false);
        }
    }, [watch, t]);

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

        try {
            // Get field context
            const fieldContext = descriptionFields.find(f => f.id === activeField)?.context ?? "";
            const result = await getRewrittenSuggestion(suggestion, fieldContext, t);

            setSuggestion(result.content);
        } catch (err) {
            console.error("AI rewrite failed:", err);
        } finally {
            setLoading(false);
        }
    }, [activeField, suggestion, t]);

    return (
        <>
            <div className="space-y-6">
                {descriptionFields.map(({ id, translationKey, context }) => {
                    const fieldValue = watch(id) || "";
                    const showAIButton = fieldValue.trim().length > 0;

                    return (
                        <div key={id} className="relative">
                            <Field
                                id={id}
                                label={t(translationKey)}
                                as="textarea"
                                fullWidth
                                className="!pr-41 !h-28"
                                register={register(id)}
                                error={errors[id]?.message as string | undefined}
                            />

                            {showAIButton && (
                                <div className="absolute bottom-3 right-3 p-[2px] rounded-md bg-gradient-to-r from-violet-600 to-teal-400">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleAIClick(id, context)}
                                        disabled={loading && activeField === id}
                                        className="bg-white text-violet-950 hover:bg-white rounded-md disabled:opacity-100"
                                    >
                                        <Sparkle
                                            size={16}
                                            className={`mr-2 text-violet-900 ${loading && activeField === id ? "animate-spin" : ""}`}
                                        />
                                        {loading && activeField === id
                                            ? t("messages.thinking")
                                            : t("buttons.getSuggestion")}
                                    </Button>
                                </div>
                            )}
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
