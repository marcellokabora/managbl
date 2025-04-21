"use client";

import { useStepper } from "@/app/context/StepperContext";
import { Suspense, useState, useEffect } from "react";
import Loading from "./Loading";
import { useRouter, usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { currentStep, goToNextStep, goToPreviousStep, goToStep, steps, totalSteps, isStepValid } = useStepper();
    const currentStepInfo = steps[currentStep - 1];
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleNextStep = () => {
        if (currentStep === totalSteps) {
            alert('Congratulations! You have completed all steps.');
        } else {
            setIsLoading(true);
            const nextStep = currentStep + 1;
            const nextStepInfo = steps[nextStep - 1];
            if (nextStepInfo?.link) {
                router.push(nextStepInfo.link);
            } else {
                goToNextStep();
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-10 flex flex-col min-h-screen">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {currentStepInfo?.title || 'Create Your Account'}
                    </h1>
                    <p className="text-gray-600">
                        {currentStepInfo?.subtitle || 'Follow the steps below to complete your registration'}
                    </p>
                </div>

                {/* Content Area */}
                <div className="flex-1 w-full bg-transparen mt-8">
                    <div className="w-full max-w-xl">
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </div>
                </div>

                {/* Footer with Steps and Actions */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    {/* Steps */}
                    <div className="flex items-center gap-2 w-full sm:w-auto pb-2">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center group relative">
                                <a
                                    href={step.link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentStep === index + 1 || isStepValid(index + 1)) {
                                            goToStep(index + 1);
                                        }
                                    }}
                                    className={getStepButtonClass(currentStep, index + 1, isStepValid(index + 1))}
                                >
                                    {currentStep === index + 1 ? (
                                        <div className="flex items-center gap-2 py-2">
                                            <span className="font-bold">{index + 1}</span>
                                            <span className="text-sm hidden sm:inline">{step.title}</span>
                                        </div>
                                    ) : (
                                        index + 1
                                    )}
                                </a>

                                {/* Hover Tooltip */}
                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg min-w-[200px]">
                                    <div className="font-semibold mb-1">{step.title}</div>
                                    <div className="text-gray-300">{step.subtitle}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-end">
                        <button
                            onClick={goToPreviousStep}
                            disabled={currentStep === 1}
                            className="px-6 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                        >
                            Previous
                        </button>
                        {currentStep !== totalSteps && (
                            <button
                                onClick={handleNextStep}
                                disabled={!isStepValid(currentStep) || isLoading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    'Next'
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function getStepButtonClass(currentStep: number, stepIndex: number, isValid: boolean) {
    const baseClasses = 'rounded-sm flex items-center justify-center text-sm font-medium transition-all';
    const isCurrent = currentStep === stepIndex;
    const isCompleted = currentStep > stepIndex || isValid;

    if (isCurrent) {
        return `${baseClasses} bg-blue-600 text-white px-4 h-12`;
    }
    if (isCompleted) {
        return `${baseClasses} bg-green-500 text-white w-12 h-12`;
    }
    return `${baseClasses} bg-gray-200 text-gray-600 w-12 h-12 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`;
} 