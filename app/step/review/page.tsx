"use client";

import { useBusinessDetailsStore } from "@/app/store/businessDetailsStore";
import { usePhoneConfigStore } from "@/app/store/phoneConfigStore";
import { useCreateAccountStore } from "@/app/store/createAccountStore";
import { useStepper } from "@/app/context/StepperContext";
import { useEffect } from "react";

export default function Step4() {
    const { businessName, phoneNumber, numberOfUnits, businessType } = useBusinessDetailsStore();
    const { announcement, forwardingNumber, isTested } = usePhoneConfigStore();
    const { email, isMagicLink } = useCreateAccountStore();
    const { setStepValid, currentStep } = useStepper();

    // Set step as valid since we don't need validation for this step
    useEffect(() => {
        setStepValid(currentStep, true);
    }, [currentStep]); // Empty dependency array since we only want this to run once on mount

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Email:</span>
                        <span className="text-gray-900 font-medium truncate">{email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Login Method:</span>
                        <span className="text-gray-900 font-medium truncate">
                            {isMagicLink ? "Magic Link" : "Password"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Business Name:</span>
                        <span className="text-gray-900 font-medium truncate">{businessName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Phone Number:</span>
                        <span className="text-gray-900 font-medium truncate">{phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Number of Units:</span>
                        <span className="text-gray-900 font-medium truncate">{numberOfUnits}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Business Type:</span>
                        <span className="text-gray-900 font-medium truncate">{businessType}</span>
                    </div>
                </div>
            </div>

            {/* Phone Configuration */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Announcement:</span>
                        <span className="text-gray-900 font-medium truncate">{announcement}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Forwarding Number:</span>
                        <span className="text-gray-900 font-medium truncate">{forwardingNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 min-w-[120px]">Configuration Tested:</span>
                        <span className={`font-medium ${isTested ? 'text-green-600' : 'text-red-600'}`}>
                            {isTested ? "Yes" : "No"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
} 