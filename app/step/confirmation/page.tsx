"use client";

import { useBusinessDetailsStore } from "@/app/store/businessDetailsStore";
import { usePhoneConfigStore } from "@/app/store/phoneConfigStore";
import { useCreateAccountStore } from "@/app/store/createAccountStore";
import { useStepper } from "@/app/context/StepperContext";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ConfirmationStep() {
    const { businessName } = useBusinessDetailsStore();
    const { email } = useCreateAccountStore();
    const { setStepValid, currentStep } = useStepper();

    useEffect(() => {
        // Mark the current step as valid
        setStepValid(currentStep, true);
    }, [currentStep]);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Next Steps */}
            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-medium text-gray-900">What's Next?</h3>
                <ul className="space-y-3">
                    <li>
                        <span>Your phone system is now active and ready to receive calls</span>
                    </li>
                    <li>
                        <span>Access your dashboard to manage settings and view call logs</span>
                    </li>
                    <li>
                        <span>Set up additional features like call routing and voicemail</span>
                    </li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Go to Dashboard
                </Link>
                <Link
                    href="/help"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Get Started Guide
                </Link>
            </div>
        </div>
    );
} 