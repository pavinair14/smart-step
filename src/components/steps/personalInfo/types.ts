import type { UseFormRegisterReturn } from "react-hook-form";

export type FieldConfig = {
    id: string;
    label: string;
    type?: string;
    as?: "input" | "select" | "textarea";
    options?: { label: string; value: string }[];
    fullWidth?: boolean;
    validation?: any;
};

type Option = { label: string; value: string };

export type FormField = "input" | "select" | "textarea";

export interface FieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: string | null;
    as?: FormField;
    options?: Option[];
    fullWidth?: boolean;
    className?: string;
}