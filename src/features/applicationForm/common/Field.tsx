import { useState, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ErrorField } from "@/components/ui/ErrorField";
import { cn } from "@/utils/cn";
import { useAutoFillLocation } from "@/hooks/useAutoFillLocation";
import type { FieldProps } from "@/types/formField";
import { useTranslation } from "react-i18next";

export const Field: React.FC<FieldProps> = memo((props) => {
    const {
        id,
        label,
        type = "text",
        placeholder,
        register,
        error,
        as = "input",
        options = [],
        fullWidth = false,
        className = "",
    } = props;

    const [focused, setFocused] = useState(false);
    const reduceMotion = useReducedMotion();
    const { t } = useTranslation();

    // Auto fill location logic (city → state → country)
    useAutoFillLocation();

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const errorId = error ? `${id}-error` : undefined;

    // Base styles for input/select/textarea
    const baseInputClass = cn(
        "w-full bg-transparent border border-gray-300 rounded px-2 sm:px-3 py-2 text-gray-800 focus:outline-none",
        "text-sm sm:text-base",
        className
    );

    // Shared props for all input elements
    const commonProps = {
        id,
        placeholder,
        "aria-invalid": !!error,
        "aria-describedby": errorId,
        "aria-required": true,
        ...register,
        onFocus: handleFocus,
        onBlur: handleBlur,
        className: baseInputClass,
    };

    const renderField = () => {
        switch (as) {
            case "select":
                return (
                    <select {...commonProps}>
                        <option value="">{t("common.select")}</option>
                        {options.map((o) => (
                            <option key={o.value} value={o.value} className="text-slate-950">
                                {o.label}
                            </option>
                        ))}
                    </select>
                );

            case "textarea":
                return <textarea {...commonProps} className={cn(baseInputClass, "resize-none h-20")} />;

            default:
                return <input {...commonProps} type={type} />;
        }
    };

    return (
        <div className={cn("relative", { "sm:col-span-2": fullWidth })}>
            <label htmlFor={id} className="block text-gray-600 text-base font-bold mb-1">
                {label}
            </label>

            <div className="relative">
                {renderField()}

                {/* Focus underline effect */}
                <motion.div
                    animate={{
                        width: focused ? "100%" : "0%",
                        opacity: focused ? 1 : 0,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className={cn(
                        "absolute bottom-0 left-0 h-[2px] rounded-full",
                        error ? "bg-red-500" : "bg-gradient-to-r from-violet-600 to-teal-400"
                    )}
                />

                {error && <ErrorField error={error} fieldId={id} isSelect={as === "select"} />}
            </div>
        </div>
    );
});
