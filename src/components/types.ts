import type z from "zod";
import {
    getPersonalInfoSchema,
    getFamilyFinancialInfoSchema,
    getSituationDescriptionSchema,
    personalInfoSchema,
    FamilyFinancialInfoSchema,
    SituationDescriptionSchema
} from "./schemas";

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
    steps: { title: string; translationKey: string }[],
    currentStep: number
}