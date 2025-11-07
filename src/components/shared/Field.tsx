import { useEffect, useState, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import type { FieldProps } from "../steps/personalInfo/types";
import { cityMap } from "../steps/personalInfo/constants";
import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";

export const Field: React.FC<FieldProps> = memo(({
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
}) => {
    const [focused, setFocused] = useState(false);
    const reduceMotion = useReducedMotion();
    const { watch, setValue } = useFormContext();

    const city = watch("city");
    const stateVal = watch("state");
    const countryVal = watch("country");

    // Auto fills state & country when city is selected
    useEffect(() => {
        if (id !== "city" || !city) return;
        const key = Object.keys(cityMap).find(
            (k) => k.toLowerCase() === city.toLowerCase()
        );
        if (!key) return;

        const mapping = cityMap[key];
        if (!stateVal)
            setValue("state", mapping.state, { shouldValidate: true, shouldDirty: true });
        if (!countryVal)
            setValue("country", mapping.country, { shouldValidate: true, shouldDirty: true });
    }, [id, city, stateVal, countryVal, setValue]);

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const baseClass = cn(
        "w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none",
        "autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]",
        "autofill:[-webkit-text-fill-color:rgb(31,41,55)]",
        className
    );

    const errorId = error ? `${id}-error` : undefined;
    const fieldProps = {
        id,
        ...register,
        onFocus: handleFocus,
        onBlur: handleBlur,
        "aria-invalid": !!error,
        "aria-describedby": errorId,
        placeholder,
        className: baseClass,
    };

    return (
        <div className={cn({ "sm:col-span-2": fullWidth }, "relative")}>
            <label htmlFor={id} className="block text-gray-600 text-base font-medium mb-1">
                {label}
            </label>

            <div className="relative">
                {as === "select" ? (
                    <select {...fieldProps}>
                        <option value="">Select</option>
                        {options.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                ) : as === "textarea" ? (
                    <textarea {...fieldProps} className={`${baseClass} resize-none h-20`} />
                ) : (
                    <input {...fieldProps} type={type} />
                )}

                {/* Bottom border */}
                <motion.div
                    animate={{
                        width: focused ? "100%" : "0%",
                        opacity: focused ? 1 : 0,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.28 }}
                    className={cn(
                        "absolute bottom-0 left-0 h-[2px] rounded-full",
                        error ? "bg-red-500" : "bg-gradient-to-r from-violet-600 to-teal-400"
                    )}
                />

                {error && <ErrorField error={error} fieldId={id} />}
            </div>
        </div>
    );
}
);
