import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { SuggestionModalProps } from "./types";
import { Sparkle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SuggestionModal: React.FC<SuggestionModalProps> = (props) => {
    const { open, setOpen, loading, suggestion, setSuggestion, handleRewrite, handleAccept } = props;
    const { t } = useTranslation();

    const handleCancel = useCallback(() => {
        setOpen(false);
        setSuggestion("");
    }, [setOpen, setSuggestion]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('messages.aiSuggestion')}</DialogTitle>
                </DialogHeader>

                {/* Suggestion Content */}
                <div className="min-h-[100px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-24 text-muted-foreground">
                            <Sparkle className="animate-spin text-violet-600 mr-2" size={18} />
                            {t('messages.loading')}
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {suggestion ? (
                                <motion.div
                                    key={suggestion}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="p-3 h-full bg-muted rounded-md text-sm whitespace-pre-wrap"
                                >
                                    {suggestion}
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="no-suggestion"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-muted-foreground italic text-sm"
                                >
                                    {t('messages.noSuggestionYet')}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    )}
                </div>

                {/* Footer buttons */}
                <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={handleCancel}>
                        {t('buttons.cancel')}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleRewrite}
                        disabled={loading || !suggestion}
                    >
                        <Sparkle
                            className={`inline-block text-violet-900 mr-2 ${loading ? "animate-spin" : ""
                                }`}
                            size={16}
                        />
                        {t('buttons.rewrite')}
                    </Button>
                    <Button onClick={handleAccept} disabled={loading}>
                        {t('buttons.useSuggestion')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SuggestionModal;