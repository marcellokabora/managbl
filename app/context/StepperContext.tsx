"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const MOCKED_EMAILS = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    "test@example.com",
    "admin@example.com"
];

interface StepInfo {
    number: number;
    link: string;
    title: string;
    subtitle: string;
}

interface StepperContextType {
    currentStep: number;
    totalSteps: number;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    goToStep: (step: number) => void;
    steps: StepInfo[];
    isStepValid: (step: number) => boolean;
    setStepValid: (step: number, isValid: boolean) => void;
    validateEmail: (email: string) => { isValid: boolean; error?: string };
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export function StepperProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({});
    const router = useRouter();
    const pathname = usePathname();

    const steps: StepInfo[] = [
        { number: 1, link: '/step1', title: 'Create Account', subtitle: 'Set up your account details' },
        { number: 2, link: '/step2', title: 'Basic Information', subtitle: 'Enter your name, phone number, and number of units' },
        { number: 3, link: '/step3', title: 'Phone Configuration', subtitle: 'Set up initial phone answering settings' },
        { number: 4, link: '/step4', title: 'Admin Access', subtitle: 'Complete setup and access admin dashboard' },
        // { number: 5, link: '/step5', title: 'Review', subtitle: 'Review and confirm your information' }
    ];

    const totalSteps = steps.length;

    // Initialize current step based on URL
    useEffect(() => {
        const stepFromUrl = steps.findIndex(step => step.link === pathname) + 1;
        if (stepFromUrl > 0) {
            setCurrentStep(stepFromUrl);
        }
    }, [pathname]);

    const isStepValid = (step: number) => {
        return stepValidation[step] === true;
    };

    const setStepValid = (step: number, isValid: boolean) => {
        setStepValidation(prev => ({
            ...prev,
            [step]: isValid
        }));
    };

    const validateEmail = (email: string) => {
        if (!email) {
            return { isValid: false, error: "Email is required" };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { isValid: false, error: "Please enter a valid email address" };
        }
        if (MOCKED_EMAILS.includes(email)) {
            return { isValid: false, error: "This email is not allowed" };
        }
        return { isValid: true };
    };

    const goToNextStep = () => {
        if (currentStep < totalSteps && isStepValid(currentStep)) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            router.push(steps[nextStep - 1].link);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            router.push(steps[prevStep - 1].link);
        }
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            // Allow going back to previous steps without validation
            if (step < currentStep || isStepValid(currentStep)) {
                setCurrentStep(step);
                router.push(steps[step - 1].link);
            }
        }
    };

    return (
        <StepperContext.Provider value={{
            currentStep,
            totalSteps,
            goToNextStep,
            goToPreviousStep,
            goToStep,
            steps,
            isStepValid,
            setStepValid,
            validateEmail
        }}>
            {children}
        </StepperContext.Provider>
    );
}

export function useStepper() {
    const context = useContext(StepperContext);
    if (context === undefined) {
        throw new Error('useStepper must be used within a StepperProvider');
    }
    return context;
} 