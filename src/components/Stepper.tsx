import { memo } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { StepperType } from "./types";

export const Stepper: React.FC<StepperType> = memo(({ steps, currentStep }) => {
    const reduceMotion = useReducedMotion();

    return (
        <nav aria-label="Form progress">
            <ol
                className="relative flex justify-between items-center w-full pb-6 pt-2"
                role="list"
            >
                {steps.map(({ title }, i) => {
                    const isCompleted = i < currentStep;
                    const isActive = i === currentStep;
                    const isLast = i === steps.length - 1;

                    return (
                        <li
                            key={title}
                            className="relative flex flex-col items-center flex-1"
                            aria-current={isActive ? "step" : undefined}
                            aria-label={`Step ${i + 1}: ${title}${isCompleted ? " - Completed" : isActive ? " - Current" : ""}`}
                        >
                            {/* Connector Line */}
                            {!isLast && (
                                <div className="absolute top-5 left-1/2 w-full h-[2px]">
                                    <motion.div
                                        className="h-[2px] bg-violet-900 origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.4,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <div className="h-[2px] bg-gray-200 w-full absolute top-0 left-0 -z-10" />
                                </div>
                            )}

                            {/* Step Circle */}
                            <div
                                className={cn(
                                    "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all z-10 relative",
                                    isCompleted
                                        ? "bg-violet-900 border-white text-white"
                                        : isActive
                                            ? "bg-violet-900 border-violet-900 text-white"
                                            : "border-gray-300 bg-gray-100 text-gray-400"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="font-medium">{i + 1}</span>
                                )}
                                {isActive && !reduceMotion && (
                                    <motion.span
                                        layoutId="active-ring"
                                        className="absolute inset-0 rounded-full border-[3px] border-white animate-pulse"
                                    />
                                )}
                            </div>

                            {/* Step Title */}
                            <p
                                className={cn(
                                    "mt-4 text-center text-lg font-semibold",
                                    isCompleted || isActive ? "text-violet-900" : "text-gray-700"
                                )}
                            >
                                {title}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
});
