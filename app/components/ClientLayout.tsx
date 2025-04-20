"use client";

import { useStepper } from "@/app/context/StepperContext";
import Loading from "@/app/components/Loading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { currentStep, goToNextStep, goToPreviousStep, goToStep, steps, totalSteps, isStepValid, isLoading } = useStepper();
    const currentStepInfo = steps[currentStep - 1];

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
                <div className="flex-1 w-full bg-transparent sm:bg-white rounded-lg flex items-center justify-center">
                    <div className="w-full max-w-xl">
                        {isLoading ? <Loading /> : children}
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
                                    className={`rounded-sm flex items-center justify-center text-sm font-medium transition-all ${currentStep === index + 1
                                        ? 'bg-blue-600 text-white px-4'
                                        : currentStep > index + 1
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        } ${currentStep === index + 1 ? 'w-auto' : 'w-12 h-12'} ${!isStepValid(index + 1) && currentStep !== index + 1 ? 'opacity-50 cursor-not-allowed' : 'sm:hover:scale-105'}`}
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
                        <button
                            onClick={() => {
                                if (currentStep === totalSteps) {
                                    alert('Congratulations! You have completed all steps.');
                                } else {
                                    goToNextStep();
                                }
                            }}
                            disabled={!isStepValid(currentStep)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                        >
                            {currentStep === totalSteps ? 'Confirm' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 