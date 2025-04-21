"use client";

import { useState, useEffect } from "react";
import { useStepper } from "@/app/context/StepperContext";
import { usePhoneConfigStore } from "@/app/store/phoneConfigStore";
import { phoneConfigSchema, type PhoneConfigFormData } from "@/app/lib/validation";
import { z } from "zod";

export default function Step3() {
    const { announcement, forwardingNumber, isTested,
        setAnnouncement, setForwardingNumber, setIsTested } = usePhoneConfigStore();
    const { setStepValid, currentStep } = useStepper();
    const [errors, setErrors] = useState<Partial<Record<keyof PhoneConfigFormData, string>>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isTesting, setIsTesting] = useState(false);
    const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateStep = () => {
        try {
            const formData = {
                announcement,
                forwardingNumber,
                isTested
            };
            phoneConfigSchema.parse(formData);
            setErrors({});
            setStepValid(currentStep, true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof PhoneConfigFormData, string>> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof PhoneConfigFormData] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            setStepValid(currentStep, false);
        }
    };

    useEffect(() => {
        if (announcement !== undefined && forwardingNumber !== undefined && isTested !== undefined) {
            validateStep();
        }
    }, [announcement, forwardingNumber, isTested, currentStep]);

    const handleInputChange = (field: string, value: string | boolean) => {
        switch (field) {
            case 'announcement':
                setAnnouncement(value as string);
                break;
            case 'forwardingNumber':
                setForwardingNumber(value as string);
                break;
            case 'isTested':
                setIsTested(value as boolean);
                break;
        }

        if (touched[field]) {
            validateStep();
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateStep();
    };

    const handleTestConfiguration = async () => {
        setIsTesting(true);
        setTestStatus('idle');

        try {
            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate successful test
            setIsTested(true);
            setTestStatus('success');
            validateStep();
        } catch (error) {
            setTestStatus('error');
            setIsTested(false);
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="announcement" className="block text-sm font-medium text-gray-700 mb-1">
                    Welcome Announcement
                </label>
                <textarea
                    id="announcement"
                    value={announcement}
                    onChange={(e) => handleInputChange('announcement', e.target.value)}
                    onBlur={() => handleBlur('announcement')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 min-h-[100px] ${touched.announcement && errors.announcement ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter your welcome announcement message"
                />
                {touched.announcement && errors.announcement && (
                    <p className="mt-1 text-sm text-red-600">{errors.announcement}</p>
                )}
            </div>

            <div>
                <label htmlFor="forwardingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Forwarding Number
                </label>
                <input
                    type="tel"
                    id="forwardingNumber"
                    value={forwardingNumber}
                    onChange={(e) => handleInputChange('forwardingNumber', e.target.value)}
                    onBlur={() => handleBlur('forwardingNumber')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${touched.forwardingNumber && errors.forwardingNumber ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter forwarding phone number"
                />
                {touched.forwardingNumber && errors.forwardingNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.forwardingNumber}</p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleTestConfiguration}
                        disabled={isTesting}
                        className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer text-white ${isTesting
                            ? 'bg-blue-400 cursor-not-allowed'
                            : testStatus === 'success'
                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                : testStatus === 'error'
                                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            {isTesting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Testing...</span>
                                </>
                            ) : testStatus === 'success' ? (
                                <>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Test Successful</span>
                                </>
                            ) : testStatus === 'error' ? (
                                <>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Test Failed</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Test Configuration</span>
                                </>
                            )}
                        </div>
                    </button>
                    {testStatus === 'error' && (
                        <button
                            type="button"
                            onClick={() => setTestStatus('idle')}
                            className="text-sm text-gray-600 hover:text-gray-800"
                        >
                            Try Again
                        </button>
                    )}
                </div>
                {touched.isTested && errors.isTested && (
                    <p className="text-sm text-red-600">{errors.isTested}</p>
                )}
            </div>
        </form>
    );
} 