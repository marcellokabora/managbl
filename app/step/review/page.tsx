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
    const { setStepValid } = useStepper();

    // Set step as valid since we don't need validation for this step
    useEffect(() => {
        setStepValid(4, true);
    }, []); // Empty dependency array since we only want this to run once on mount

    return (
        <div className="space-y-6">
            {/* Account Information */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Account Information</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-900">{email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Login Method:</span>
                        <span className="text-gray-900">{isMagicLink ? "Magic Link" : "Password"}</span>
                    </div>
                </div>
            </div>

            {/* Business Details */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Business Details</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Business Name:</span>
                        <span className="text-gray-900">{businessName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Phone Number:</span>
                        <span className="text-gray-900">{phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Number of Units:</span>
                        <span className="text-gray-900">{numberOfUnits}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Business Type:</span>
                        <span className="text-gray-900">{businessType}</span>
                    </div>
                </div>
            </div>

            {/* Phone Configuration */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Phone Configuration</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Announcement:</span>
                        <span className="text-gray-900">{announcement}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Forwarding Number:</span>
                        <span className="text-gray-900">{forwardingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Configuration Tested:</span>
                        <span className="text-gray-900">{isTested ? "Yes" : "No"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 