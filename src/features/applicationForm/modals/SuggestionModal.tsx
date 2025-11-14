import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";
import { Sparkle } from "lucide-react";
import type { SuggestionModalProps } from "@/features/applicationForm/types/formField";

export const SuggestionModal: React.FC<SuggestionModalProps> = ({
    open,
    setOpen,
    loading,
    suggestion,
    setSuggestion,
    handleRewrite,
    handleAccept
}) => {
    const { t } = useTranslation();

    const handleCancel = useCallback(() => {
        setOpen(false);
        setSuggestion("");
    }, [setOpen, setSuggestion]);

    const renderLoading = () => (
        <div className="flex items-center justify-center h-24 text-muted-foreground">
            <Sparkle className="animate-spin text-violet-600 mr-2" size={18} />
            {t("messages.loading")}
        </div>
    );

    const renderSuggestionBox = () =>
        suggestion ? (
            <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="w-full p-3 bg-muted rounded-md text-sm resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder={t("messages.editSuggestion")}
            />
        ) : (
            <p className="text-muted-foreground italic text-sm">
                {t("messages.noSuggestionYet")}
            </p>
        );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{t("messages.aiSuggestion")}</DialogTitle>
                </DialogHeader>

                {/* Suggestion Content */}
                <div className="min-h-[100px]">
                    {loading ? renderLoading() : renderSuggestionBox()}
                </div>

                <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={handleCancel}>
                        {t("buttons.cancel")}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleRewrite}
                        disabled={loading || !suggestion}
                    >
                        <Sparkle
                            size={16}
                            className={`inline-block text-violet-900 mr-2 ${loading ? "animate-spin" : ""}`}
                        />
                        {t("buttons.rewrite")}
                    </Button>

                    <Button onClick={handleAccept} disabled={loading}>
                        {t("buttons.useSuggestion")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SuggestionModal;
