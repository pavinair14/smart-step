import { useCallback, useMemo, useState, lazy, Suspense, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
;
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

import { useFormStore } from "@/store/formStore";
import { mockSubmitAPI } from "@/services/submitApplication";
import { AlertCircle, X } from "lucide-react";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import PersonalInfo from "../steps/PersonalInfo";
import { Stepper } from "./Stepper";
import { getSchemas, type FormDraft } from "@/types/formField";
import { defaultFormValues, steps } from "@/constants/formDefaults";
import { LoaderCircle } from "@/components/common/Loader";
import { SubmissionSuccessModal } from "../modals/SubmissionSuccessModal";
import { generateReferenceId } from "@/lib/utils/references";
import { formatSubmissionDate } from "@/lib/utils/dateFormat";


const FamilyFinancialInfo = lazy(() => import("../steps/FamilyFinancialInfo"));
const SituationDescription = lazy(() => import("../steps/SituationDescription"));

export const MultiStepForm = () => {
    const { formdata, activeStep, setActiveStep, setFormData, reset: resetStore } = useFormStore();
    const { t, i18n } = useTranslation();
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [referenceId, setReferenceId] = useState("");
    const [submissionDate, setSubmissionDate] = useState("");

    const currentSchemas = useMemo(() => getSchemas(), [i18n.language]);

    const methods = useForm<FormDraft>({
        resolver: zodResolver(currentSchemas[activeStep]) as any,
        mode: "onChange",
        defaultValues: formdata,
    });

    useEffect(() => {
        methods.clearErrors();
    }, [i18n.language, activeStep, methods]);

    // Debounced formstore - prevents excessive writes
    useDebouncedEffect(
        (values) => setFormData(values as Partial<FormDraft>),
        methods.watch(),
        500
    );

    const OnFormSubmit = useCallback(async () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            setSubmitError(null);
            setIsSubmitting(true);
            try {
                await mockSubmitAPI();
                setReferenceId(generateReferenceId());
                setSubmissionDate(formatSubmissionDate());
                setShowSubmitModal(true);
            } catch (error) {
                console.error("Form submission failed:", error);
                const errorMessage = error instanceof Error
                    ? error.message
                    : t('messages.unexpectedError');
                setSubmitError(errorMessage);
            } finally {
                setIsSubmitting(false);
            }
        }
    }, [activeStep, setActiveStep, formdata]);

    // Handle form reset after submission
    const handleFormReset = useCallback(() => {
        setShowSubmitModal(false);
        resetStore();
        methods.reset(defaultFormValues as FormDraft);
    }, [methods, resetStore]);

    // Handle click for back button
    const handleBackBtnClick = useCallback(() => {
        setActiveStep(activeStep - 1);
    }, [activeStep, setActiveStep]);

    const renderStep = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <PersonalInfo />;
            case 1:
                return <FamilyFinancialInfo />;
            case 2:
                return <SituationDescription />;
            default:
                return null;
        }
    }, [activeStep]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(OnFormSubmit)} className="flex flex-col justify-between h-full">
                <div>
                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={activeStep} />
                    <div className="flex flex-row justify-between items-center">
                        <p className="pb-4"><span className="text-red-500 pr-1.5">*</span>{t('messages.allFieldsRequired')}</p>

                        <Button type="button" variant="link" className="text-sm text-violet-900 z-10" onClick={handleFormReset}>{t('buttons.clearForm')}</Button>
                    </div>
                    {/* Error message */}
                    {submitError && (
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 shrink-0" />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-red-800">{t('messages.submissionFailedTitle')}</h3>
                                <p className="mt-1 text-sm text-red-700">{submitError}</p>
                            </div>
                            <button
                                onClick={() => setSubmitError(null)}
                                className="ml-3 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                                aria-label={t('aria.dismissError')}
                                type="button"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}


                    <div className="overflow-auto">
                        <Suspense fallback={<LoaderCircle />}>
                            {renderStep}
                        </Suspense>
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className={cn("flex pt-4", activeStep === 0 ? "justify-end" : "justify-between")}>
                    {activeStep > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleBackBtnClick}
                        >
                            {t('buttons.back')}
                        </Button>
                    )}
                    <Button type="submit" disabled={isSubmitting}><>{isSubmitting ? <LoaderCircle hideText /> : activeStep === 2 ? t('buttons.submit') : t('buttons.next')}</></Button>
                </div >
            </form >

            <SubmissionSuccessModal
                open={showSubmitModal}
                onClose={handleFormReset}
                referenceId={referenceId}
                submissionDate={submissionDate}
            />
        </FormProvider >
    )
}
