import { Info } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";

export const ErrorField: React.FC<{ error: string; fieldId?: string; isSelect?: boolean }> = memo(({ error, fieldId, isSelect = false }) => {
    const { t } = useTranslation();
    const [showTooltip, setShowTooltip] = useState(false);

    const errorId = fieldId ? `${fieldId}-error` : undefined;

    const show = useCallback(() => setShowTooltip(true), []);
    const hide = useCallback(() => setShowTooltip(false), []);

    return (
        <div
            className={`absolute top-2.5 text-red-500 cursor-pointer ${isSelect ? 'right-6' : 'right-4'}`}
            onMouseEnter={show}
            onMouseLeave={hide}
            aria-describedby={showTooltip ? errorId : undefined}
        >
            <Info
                size={16}
                aria-label={t("aria.errorInfo")}
            />

            {/* Tooltip */}
            {showTooltip && (
                <div
                    id={errorId}
                    className="absolute -top-8 w-max right-0 z-20 bg-red-50 text-red-700 rounded shadow px-2 py-1 text-xs"
                    role="tooltip"
                >
                    {error}
                </div>
            )}
        </div>
    );
});
