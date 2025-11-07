import { useCallback, useMemo, useState, lazy, Suspense } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { steps, defaultFormValues } from "./constant";
import { Stepper } from "./Stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { schemas, type FormDraft } from "./types";
import { useFormStore } from "@/store/formStore";
import { mockSubmitAPI } from "@/services/mockSubmitAPI";
import { AlertCircle, X } from "lucide-react";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";
import { LoaderCircle } from "./shared/Loader";
import PersonalInfo from "./steps/personalInfo";

const FamilyFinancialInfo = lazy(() => import("./steps/familyfinancialInfo"));
const SituationDescription = lazy(() => import("./steps/situationDescription"));


export const MultiStepForm = () => {
    const { formdata, activeStep, setActiveStep, setFormData, reset: resetStore } = useFormStore();
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const methods = useForm<FormDraft>({
        resolver: zodResolver(schemas[activeStep]) as any,
        mode: "onChange",
        defaultValues: formdata,
    });

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
            try {
                await mockSubmitAPI();
                setShowSubmitModal(true);
            } catch (error) {
                console.error("Form submission failed:", error);
                const errorMessage = error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again.";
                setSubmitError(errorMessage);
            }
        }
    }, [activeStep, setActiveStep, formdata]);

    // Handle form reset after submission
    const handleFormReset = useCallback(() => {
        setShowSubmitModal(false);
        resetStore();
        methods.reset(defaultFormValues as FormDraft);
        setActiveStep(0);
    }, [methods, resetStore, setActiveStep]);

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

                    <p className="pb-4"><span className="text-red-500 pr-1.5">*</span>All fields must be filled to proceed</p>

                    {/* Error message */}
                    {submitError && (
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 shrink-0" />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-red-800">Submission Failed</h3>
                                <p className="mt-1 text-sm text-red-700">{submitError}</p>
                            </div>
                            <button
                                onClick={() => setSubmitError(null)}
                                className="ml-3 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                                aria-label="Dismiss error"
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
                            Back
                        </Button>
                    )}
                    <Button type="submit">{activeStep === 2 ? "Submit" : "Next"}</Button>
                </div>
            </form>

            {showSubmitModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        id="submit-modal"
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4"
                        tabIndex={-1}
                    >
                        <h2 id="modal-title" className="text-xl font-semibold">Form Submitted</h2>
                        <p className="text-gray-700">Your form has been submitted successfully.</p>
                        <div className="flex justify-end">
                            <Button type="button" onClick={handleFormReset}>OK</Button>
                        </div>
                    </div>
                </div>
            )}
        </FormProvider>
    )
}
