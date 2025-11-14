import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Copy, Home, Check } from "lucide-react";

interface SubmissionSuccessModalProps {
    open: boolean;
    onClose: () => void;
    referenceId: string;
    submissionDate: string;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
    open,
    onClose,
    referenceId,
    submissionDate,
}) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(referenceId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }, [referenceId]);

    const renderReferenceId = () => (
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-base text-gray-600 mb-1">{t("submission.referenceId")}</p>

            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-violet-900">
                    {referenceId}
                </span>

                <button
                    onClick={handleCopy}
                    className="p-1 font-semibold cursor-pointer rounded text-violet-600 hover:text-violet-800 focus:outline-none focus:ring-0 focus:ring-violet-500 transition-colors"
                    aria-label={copied ? t("submission.copied") : t("submission.copy")}
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );

    const renderSubmissionDate = () => (
        <div className="flex justify-between text-base">
            <span className="text-gray-600">{t("submission.submissionDate")}</span>
            <span className="font-medium text-gray-900">{submissionDate}</span>
        </div>
    );

    const renderNextSteps = () => (
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-1">
                {t("submission.nextSteps")}
            </p>
            <p className="text-sm text-blue-700">{t("submission.nextStepsMessage")}</p>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md" aria-describedby="submission-success-description">
                <span id="submission-success-description" className="sr-only">
                    {t("submission.message")} {t("submission.nextStepsMessage")}
                </span>

                <DialogHeader>
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-6 w-6" />
                        <DialogTitle className="text-green-600">
                            {t("submission.title")}
                        </DialogTitle>
                    </div>
                </DialogHeader>


                <div className="space-y-4 py-4">
                    <p className="text-gray-700 text-base">{t("submission.message")}</p>
                    {renderReferenceId()}
                    {renderSubmissionDate()}
                    {renderNextSteps()}
                </div>
                {/* Footer Action */}
                <div className="flex justify-center pt-2">
                    <Button onClick={onClose} className="w-full max-w-xs" size="lg">
                        <Home className="h-4 w-4 mr-2" />
                        {t("submission.backToHome")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
