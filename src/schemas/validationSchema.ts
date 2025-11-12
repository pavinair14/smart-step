import z from "zod";
import i18next from "i18next";
import { countryCodes } from "@/constants/personalInfo";


const t = (key: string, options?: Record<string, string | number>) => i18next.t(key, options);

// Personal Info Schema
export const getPersonalInfoSchema = () => z.object({
    name: z.string()
        .min(2, { message: t("validation.minLength", { field: t("fields.name"), min: "2" }) })
        .nonempty(t("validation.required", { field: t("fields.name") })),
    nationalId: z.string()
        .regex(/^[A-Za-z0-9\-]+$/, { message: t("validation.alphanumeric", { field: t("fields.nationalId") }) })
        .nonempty(t("validation.required", { field: t("fields.nationalId") })),
    dateOfBirth: z.string()
        .nonempty(t("validation.required", { field: t("fields.dateOfBirth") }))
        .refine((date) => {
            const selected = new Date(date);
            const now = new Date();
            return selected <= now;
        }, t("validation.futureDate", { field: t("fields.dateOfBirth") })),
    gender: z.string().nonempty(t("validation.required", { field: t("fields.gender") })),
    address: z.string().nonempty(t("validation.required", { field: t("fields.address") })),
    city: z.string().nonempty(t("validation.required", { field: t("fields.city") })),
    state: z.string().nonempty(t("validation.required", { field: t("fields.state") })),
    country: z.string().nonempty(t("validation.required", { field: t("fields.country") })),
    email: z.string()
        .email({ message: t("validation.email") })
        .nonempty(t("validation.required", { field: t("fields.email") })),
    phCode: z.string().nonempty(t("validation.required", { field: t("fields.code") })),
    phone: z.string()
        .regex(/^[0-9]+$/, { message: t("validation.digitsOnly") })
        .nonempty(t("validation.required", { field: t("fields.phone") })),
}).superRefine((data, ctx) => {
    const entry = countryCodes.find(c => c.code === data.phCode);
    if (entry && data.phone) {
        if (data.phone.length !== entry.digits) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["phone"],
                message: t("validation.phoneDigits", { digits: entry.digits }),
            });
        }
    }
});

// Family & Financial Info Schema
export const getFamilyFinancialInfoSchema = () => z.object({
    maritalStatus: z.string().nonempty(t("validation.required", { field: t("fields.maritalStatus") })),
    dependents: z.preprocess(
        (val) => (typeof val === 'number' ? String(val) : val ?? ''),
        z.string().min(1, { message: t("validation.required", { field: t("fields.dependents") }) })
    )
        .transform((val) => Number(val))
        .refine((val) => !Number.isNaN(val), { message: t("validation.numeric", { field: t("fields.dependents") }) })
        .refine((val) => Number.isInteger(val), { message: t("validation.integer", { field: t("fields.dependents") }) })
        .refine((val) => val >= 0, { message: t("validation.negative", { field: t("fields.dependents") }) })
        .refine((val) => val <= 10, { message: t("validation.maxDependents", { max: "10" }) }),
    employmentStatus: z.string().nonempty(t("validation.required", { field: t("fields.employmentStatus") })),
    housingStatus: z.string().nonempty(t("validation.required", { field: t("fields.housingStatus") })),
    currency: z.string().nonempty(t("validation.required", { field: t("fields.currency") })),
    monthlyIncome: z.preprocess(
        (val) => (typeof val === 'number' ? String(val) : val ?? ''),
        z.string().min(1, { message: t("validation.required", { field: t("fields.monthlyIncome") }) })
    )
        .transform((val) => Number(val))
        .refine((val) => !Number.isNaN(val), { message: t("validation.numeric", { field: t("fields.monthlyIncome") }) })
        .refine((val) => val >= 0, { message: t("validation.positive", { field: t("fields.monthlyIncome") }) }),
});

// Situation Description Schema
export const getSituationDescriptionSchema = () => z.object({
    currentFinancialSituation: z.string()
        .min(10, { message: t("validation.minLength", { field: t("fields.currentFinancialSituation"), min: "10" }) })
        .nonempty(t("validation.required", { field: t("fields.currentFinancialSituation") })),
    employmentCircumstances: z.string()
        .min(10, { message: t("validation.minLength", { field: t("fields.employmentCircumstances"), min: "10" }) })
        .nonempty(t("validation.required", { field: t("fields.employmentCircumstances") })),
    reasonForApplying: z.string()
        .min(10, { message: t("validation.minLength", { field: t("fields.reasonForApplying"), min: "10" }) })
        .nonempty(t("validation.required", { field: t("fields.reasonForApplying") })),
});

// Will use current language
export const personalInfoSchema = getPersonalInfoSchema();
export const FamilyFinancialInfoSchema = getFamilyFinancialInfoSchema();
export const SituationDescriptionSchema = getSituationDescriptionSchema();