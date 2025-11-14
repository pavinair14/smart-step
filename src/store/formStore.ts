import { defaultFormValues } from "@/features/applicationForm/constants/formDefaults";
import type { FormDraft } from "@/types/formField";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type FormStore = {
    formdata: FormDraft;
    activeStep: number;
    setField: <K extends keyof FormDraft>(key: K, value: FormDraft[K]) => void;
    setFormData: (values: Partial<FormDraft>) => void;
    setActiveStep: (step: number) => void;
    reset: () => void;
};

export const useFormStore = create<FormStore>()(
    persist(
        (set) => ({
            formdata: { ...defaultFormValues },
            activeStep: 0,
            setField: (key, value) =>
                set((state) => ({ formdata: { ...state.formdata, [key]: value } })),
            setFormData: (values) =>
                set((state) => ({ formdata: { ...state.formdata, ...values } })),
            setActiveStep: (step) => set({ activeStep: step }),
            reset: () => set({ formdata: { ...defaultFormValues }, activeStep: 0 }),
        }),
        {
            name: "smart-step-form",
            partialize: (state) => ({ formdata: state.formdata }), // to persist only form data
        }
    )
);
