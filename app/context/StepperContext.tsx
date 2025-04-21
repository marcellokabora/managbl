"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface StepInfo {
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
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export function StepperProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({});
    const router = useRouter();
    const pathname = usePathname();

    const steps: StepInfo[] = [
        { link: '/step/account', title: 'Account', subtitle: 'Set up your account details' },
        { link: '/step/information', title: 'Information', subtitle: 'Enter your basic informations' },
        { link: '/step/setup', title: 'Configuration', subtitle: 'Set up initial phone settings' },
        // { link: '/step/review', title: 'Review', subtitle: 'Review and confirm your setup' },
        { link: '/step/confirmation', title: 'Confirmation', subtitle: 'Your setup is complete' },
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

    const goToNextStep = () => {
        if (currentStep < totalSteps && isStepValid(currentStep)) {
            // Don't allow going forward from confirmation step
            const confirmationStepIndex = steps.findIndex(step => step.link === '/step/confirmation') + 1;
            if (currentStep === confirmationStepIndex) {
                return;
            }
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            router.push(steps[nextStep - 1].link, { scroll: false });
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            router.push(steps[prevStep - 1].link, { scroll: false });
        }
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            if (step < currentStep || isStepValid(currentStep)) {
                setCurrentStep(step);
                router.push(steps[step - 1].link, { scroll: false });
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
            setStepValid
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