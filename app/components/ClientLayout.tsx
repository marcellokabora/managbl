"use client";

import { useStepper } from "@/app/context/StepperContext";
import { useCreateAccountStore } from "@/app/store/createAccountStore";
import { useBusinessDetailsStore } from "@/app/store/businessDetailsStore";
import { useState, useEffect, Suspense } from "react";
import Loading from "@/app/components/Loading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { currentStep, goToNextStep, goToPreviousStep, goToStep, steps, totalSteps, isStepValid } = useStepper();
    const currentStepInfo = steps[currentStep - 1];
    const [isMounted, setIsMounted] = useState(false);

    // Get store values
    const { email, password, isMagicLink } = useCreateAccountStore();
    const { businessName, phoneNumber, numberOfUnits, businessType } = useBusinessDetailsStore();

    // Handle mounting
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check if stores are hydrated
    useEffect(() => {
        if (!isMounted) return;

        if (currentStep === 1) {
            if (email !== undefined && password !== undefined && isMagicLink !== undefined) {
                console.log('Step 1 store hydrated');
            }
        } else if (currentStep === 2) {
            if (businessName !== undefined && phoneNumber !== undefined &&
                numberOfUnits !== undefined && businessType !== undefined) {
                console.log('Step 2 store hydrated');
            }
        } else {
            console.log('Other step, no loading needed');
        }
    }, [currentStep, email, password, isMagicLink, businessName, phoneNumber, numberOfUnits, businessType, isMounted]);

    // Don't render anything until mounted to prevent hydration mismatch
    if (!isMounted) {
        return null;
    }

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
                <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex items-center justify-center">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </div>

                {/* Footer with Steps and Actions */}
                <div className="mt-4 flex items-center justify-between pt-4">
                    {/* Steps */}
                    <div className="flex items-center gap-2">
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
                                    className={`rounded-sm flex items-center justify-center text-sm font-medium transition-all ${currentStep === index + 1
                                        ? 'bg-blue-600 text-white px-4'
                                        : currentStep > index + 1
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        } ${currentStep === index + 1 ? 'w-auto' : 'w-12 h-12'} ${!isStepValid(index + 1) && currentStep !== index + 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                                >
                                    {currentStep === index + 1 ? (
                                        <div className="flex items-center gap-2 py-2">
                                            <span className="font-bold">{index + 1}</span>
                                            <span className="text-sm">{step.title}</span>
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
                    <div className="flex gap-4">
                        <button
                            onClick={goToPreviousStep}
                            disabled={currentStep === 1}
                            className="px-6 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                if (currentStep === totalSteps) {
                                    alert('Congratulations! You have completed all steps.');
                                } else {
                                    goToNextStep();
                                }
                            }}
                            disabled={!isStepValid(currentStep)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {currentStep === totalSteps ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 