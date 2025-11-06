import { useState, useCallback, useMemo, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form";
import { defaultFormValues, steps } from "./constant";
import { Stepper } from "./Stepper";
import { FamilyFinancialInfo } from "./steps/familyfinancialInfo/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfo } from "./steps/personalInfo/index";
import { SituationDescription } from "./steps/situationDescription/index";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { schemas } from "./types";

export const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const methods = useForm({
        resolver: zodResolver(schemas[activeStep]),
        mode: "onChange",
        defaultValues: defaultFormValues
    });

    useEffect(() => {
        methods.clearErrors();
    }, [activeStep, methods]);

    const OnFormSubmit = useCallback(() => {
        if (activeStep < 2) {
            setActiveStep(activeStep + 1);
        } else {
            setShowSubmitModal(true);
        }
    }, [activeStep, methods]);

    const handleFormReset = useCallback(() => {
        setShowSubmitModal(false);
        methods.reset();
        setActiveStep(0);
    }, [methods]);

    const handleBackBtnClick = useCallback(() => {
        setActiveStep(activeStep - 1);
    }, [activeStep]);

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
                    <div className="overflow-auto">
                        {/* Step content */}
                        {renderStep}
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
                        <h2 className="text-xl font-semibold">Form Submitted</h2>
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
