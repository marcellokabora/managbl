"use client";

import { useState, useEffect } from "react";
import { useStepper } from "@/app/context/StepperContext";
import { usePhoneConfigStore } from "@/app/store/phoneConfigStore";

export default function Step3() {
    const { announcement, forwardingNumber, isTested,
        setAnnouncement, setForwardingNumber, setIsTested } = usePhoneConfigStore();
    const { setStepValid } = useStepper();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (field: string, value: string | boolean) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'announcement':
                if (!(value as string).trim()) {
                    newErrors.announcement = "Announcement is required";
                } else if ((value as string).length < 10) {
                    newErrors.announcement = "Announcement must be at least 10 characters";
                } else {
                    delete newErrors.announcement;
                }
                break;
            case 'forwardingNumber':
                if (!(value as string).trim()) {
                    newErrors.forwardingNumber = "Forwarding number is required";
                } else if ((value as string).replace(/\D/g, '').length < 7) {
                    newErrors.forwardingNumber = "Please enter a valid phone number";
                } else {
                    delete newErrors.forwardingNumber;
                }
                break;
            case 'isTested':
                if (!value) {
                    newErrors.isTested = "Please test the configuration before proceeding";
                } else {
                    delete newErrors.isTested;
                }
                break;
        }

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setStepValid(3, isValid);
    };

    // Add validation when store values change
    useEffect(() => {
        if (announcement !== undefined && forwardingNumber !== undefined && isTested !== undefined) {
            validateField('announcement', announcement);
            validateField('forwardingNumber', forwardingNumber);
            validateField('isTested', isTested);
        }
    }, [announcement, forwardingNumber, isTested]);

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
            validateField(field, value);
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        switch (field) {
            case 'announcement':
                validateField(field, announcement);
                break;
            case 'forwardingNumber':
                validateField(field, forwardingNumber);
                break;
            case 'isTested':
                validateField(field, isTested);
                break;
        }
    };

    const handleTestConfiguration = () => {
        // Simulate testing the configuration
        setIsTested(true);
        validateField('isTested', true);
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
                <button
                    type="button"
                    onClick={handleTestConfiguration}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Test Configuration
                </button>
                {touched.isTested && errors.isTested && (
                    <p className="text-sm text-red-600">{errors.isTested}</p>
                )}
            </div>
        </form>
    );
} 