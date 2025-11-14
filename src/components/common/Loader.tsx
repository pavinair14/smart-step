import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LoaderCircle = ({ className, hideText }: { className?: string, hideText?: boolean }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Loader2 className={`h-8 w-8 animate-spin mb-2 ${className}`} />
            {!hideText && <span>{t('messages.loading')}</span>}
        </div>
    );
};