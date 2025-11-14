import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { getAISuggestion } from "@/lib/openai/getSuggestion";
import { useFormContext } from "react-hook-form";

import { Field } from "@/features/applicationForm/common/Field";
import { Sparkle } from "lucide-react";
import { descriptionFields } from "@/features/applicationForm/constants/situationDescription";
import SuggestionModal from "@/features/applicationForm/modals/SuggestionModal";

const SituationDescription = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const { t } = useTranslation();

    const [activeField, setActiveField] = useState<string | null>(null);
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    /** DRY helper: AI call wrapper */
    const fetchSuggestion = useCallback(async (prompt: string) => {
        setLoading(true);
        try {
            return await getAISuggestion(prompt);
        } finally {
            setLoading(false);
        }
    }, []);

    /** Handle AI suggestion */
    const handleAIClick = useCallback(
        async (field: string) => {
            setActiveField(field);

            const userText = String(watch(field) || "").trim();
            const prompt = t("ai.prompts.suggestion", {
                text: userText.length > 0 ? userText : t("ai.none")
            });

            const result = await fetchSuggestion(prompt);
            if (!result) return;

            setSuggestion(result);
            setOpen(true);
        },
        [watch, t, fetchSuggestion]
    );

    /** Accept suggestion */
    const handleAccept = useCallback(() => {
        if (activeField) {
            setValue(activeField, suggestion, { shouldValidate: true, shouldDirty: true });
        }
        setOpen(false);
    }, [activeField, suggestion, setValue]);

    /** Rewrite suggestion */
    const handleRewrite = useCallback(async () => {
        if (!activeField || !suggestion) return;

        const prompt = t("ai.prompts.rewrite", { text: suggestion });
        const result = await fetchSuggestion(prompt);
        if (result) setSuggestion(result);
    }, [activeField, suggestion, t, fetchSuggestion]);

    return (
        <>
            <div className="space-y-6">
                {descriptionFields.map(({ id, translationKey }) => {
                    const value = watch(id) || "";
                    const allowAI = value.length > 10;
                    const active = activeField === id;
                    const aiLoading = loading && active;

                    return (
                        <div key={id} className="relative">
                            <Field
                                id={id}
                                label={t(translationKey)}
                                as="textarea"
                                className="pr-41 h-28"
                                fullWidth
                                register={register(id)}
                                error={errors[id]?.message as string | undefined}
                            />

                            {allowAI && (
                                <div className="absolute bottom-3 right-3 p-[2px] rounded-md bg-gradient-to-r from-violet-600 to-teal-400">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="secondary"
                                        className="bg-white text-violet-950 hover:bg-white w-full rounded-md disabled:opacity-100"
                                        disabled={aiLoading}
                                        onClick={() => handleAIClick(id)}
                                    >
                                        <Sparkle
                                            size={16}
                                            className={`inline-block text-violet-900 mr-2 ${aiLoading ? "animate-spin" : ""}`}
                                        />
                                        {aiLoading ? t("messages.loading") : t("buttons.getSuggestion")}
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
