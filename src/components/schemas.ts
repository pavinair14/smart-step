import z from "zod";
import { countryCodes } from "./steps/personalInfo/constants";

// Personal Info Schema
export const personalInfoSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 chars")
        .nonempty("Name is required"),
    nationalId: z.string()
        .regex(/^[A-Za-z0-9\-]+$/, "National ID must be alphanumeric")
        .nonempty("National ID is required"),
    dateOfBirth: z.string()
        .nonempty("Date of birth is required")
        .refine((date) => {
            const selected = new Date(date);
            const now = new Date();
            return selected <= now;
        }, "Date of birth cannot be in the future"),
    gender: z.string().nonempty("Gender is required"),
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    country: z.string().nonempty("Country is required"),
    email: z.string()
        .email("Invalid email format")
        .nonempty("Email is required"),
    phCode: z.string().nonempty("Code is required"),
    phone: z.string()
        .regex(/^[0-9]+$/, "Only digits allowed")
        .nonempty("Phone number is required"),
}).superRefine((data, ctx) => {
    const entry = countryCodes.find(c => c.code === data.phCode);
    if (entry && data.phone) {
        if (data.phone.length !== entry.digits) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["phone"],
                message: `Phone must be ${entry.digits} digits for selected code`,
            });
        }
    }
});

// Family & Financial Info Schema
export const FamilyFinancialInfoSchema = z.object({
    maritalStatus: z.string().nonempty("Marital status is required"),
    dependents: z.union([z.string(), z.number()])
        .refine((val) => val !== "" && val !== null && val !== undefined, {
            message: "Dependents count is required",
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: "Dependents must be a number",
        })
        .refine((val) => Number.isInteger(val), {
            message: "Dependents must be a whole number",
        })
        .refine((val) => val >= 0, {
            message: "Dependents cannot be negative",
        })
        .refine((val) => val <= 10, {
            message: "Maximum 10 dependents allowed",
        }),
    employmentStatus: z.string().nonempty("Employment status is required"),
    housingStatus: z.string().nonempty("Housing status is required"),
    currency: z.string().nonempty("Currency is required"),
    monthlyIncome: z.union([z.string(), z.number()])
        .refine((val) => val !== "" && val !== null && val !== undefined, {
            message: "Monthly income is required",
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: "Monthly income must be a number",
        })
        .refine((val) => val >= 0, {
            message: "Monthly income must be positive",
        }),
});

// Situation Description Schema
export const SituationDescriptionSchema = z.object({
    currentFinancialSituation: z.string()
        .min(10, "Must be at least 10 characters")
        .nonempty("Current financial situation is required"),
    employmentCircumstances: z.string()
        .min(10, "Must be at least 10 characters")
        .nonempty("Employment circumstances is required"),
    reasonForApplying: z.string()
        .min(10, "Must be at least 10 characters")
        .nonempty("Reason for applying is required"),
});