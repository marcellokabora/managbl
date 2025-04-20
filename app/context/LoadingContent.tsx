"use client";

import { useCreateAccountStore } from "@/app/store/createAccountStore";
import { useBusinessDetailsStore } from "@/app/store/businessDetailsStore";
import { useState, useEffect } from "react";

interface LoadingContentProps {
    currentStep: number;
    children: React.ReactNode;
}

export default function LoadingContent({ currentStep, children }: LoadingContentProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Get store values
    const { email, password, isMagicLink } = useCreateAccountStore();
    const { businessName, phoneNumber, numberOfUnits, businessType } = useBusinessDetailsStore();

    // Check if stores are hydrated
    useEffect(() => {
        if (currentStep === 1) {
            if (email !== undefined && password !== undefined && isMagicLink !== undefined) {
                setIsLoading(false);
            }
        } else if (currentStep === 2) {
            if (businessName !== undefined && phoneNumber !== undefined &&
                numberOfUnits !== undefined && businessType !== undefined) {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [currentStep, email, password, isMagicLink, businessName, phoneNumber, numberOfUnits, businessType]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <p className="text-gray-600">Loading your data...</p>
            </div>
        );
    }

    return <>{children}</>;
} 