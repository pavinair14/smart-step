import { FamilyFinancialInfoSchema, getPersonalInfoSchema, personalInfoSchema, SituationDescriptionSchema } from "@/schemas/validationSchema";
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

export type SuggestionModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    loading: boolean;
    suggestion: string;
    setSuggestion: (suggestion: string) => void;
    handleRewrite: () => void;
    handleAccept: () => void;
};

import type z from "zod";
import { getFamilyFinancialInfoSchema, getSituationDescriptionSchema, } from "@/schemas/validationSchema";

export const getSchemas = () => [
    getPersonalInfoSchema(),
    getFamilyFinancialInfoSchema(),
    getSituationDescriptionSchema()
];

export const schemas = [personalInfoSchema, FamilyFinancialInfoSchema, SituationDescriptionSchema];

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type FamilyFinancialInfoData = z.infer<typeof FamilyFinancialInfoSchema>;
export type SituationDescriptionData = z.infer<typeof SituationDescriptionSchema>;

export type FormData = PersonalInfoData & FamilyFinancialInfoData & SituationDescriptionData;

export type FamilyFinancialInfoInput = z.input<typeof FamilyFinancialInfoSchema>;
export type FormDraft = PersonalInfoData & FamilyFinancialInfoInput & SituationDescriptionData;

export type StepperType = {
    steps: { translationKey: string; title?: string }[],
    currentStep: number
}