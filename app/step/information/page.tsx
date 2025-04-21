"use client";

import { useState, useEffect } from "react";
import { useStepper } from "@/app/context/StepperContext";
import { useBusinessDetailsStore } from "@/app/store/businessDetailsStore";
import { businessInfoSchema, type BusinessInfoFormData } from "@/app/lib/validation";
import { z } from "zod";

export default function Information() {
    const { businessName, phoneNumber, numberOfUnits, businessType,
        setBusinessName, setPhoneNumber, setNumberOfUnits, setBusinessType } = useBusinessDetailsStore();
    const { setStepValid, currentStep } = useStepper();
    const [errors, setErrors] = useState<Partial<Record<keyof BusinessInfoFormData, string>>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateStep = () => {
        try {
            const formData = {
                businessName,
                phoneNumber,
                numberOfUnits,
                businessType
            };
            businessInfoSchema.parse(formData);
            setErrors({});
            setStepValid(currentStep, true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof BusinessInfoFormData, string>> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof BusinessInfoFormData] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            setStepValid(currentStep, false);
        }
    };

    useEffect(() => {
        if (businessName !== undefined && phoneNumber !== undefined &&
            numberOfUnits !== undefined && businessType !== undefined) {
            validateStep();
        }
    }, [businessName, phoneNumber, numberOfUnits, businessType, currentStep]);

    const handleInputChange = (field: string, value: string | number) => {
        switch (field) {
            case 'businessName':
                setBusinessName(value as string);
                break;
            case 'phoneNumber':
                setPhoneNumber(value as string);
                break;
            case 'numberOfUnits':
                setNumberOfUnits(value as number);
                break;
            case 'businessType':
                setBusinessType(value as string);
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

    return (
        <form className="space-y-4">
            <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                </label>
                <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    onBlur={() => handleBlur('businessName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${touched.businessName && errors.businessName ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter your business name"
                    autoComplete="off"
                />
                {touched.businessName && errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                )}
            </div>

            <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    onBlur={() => handleBlur('phoneNumber')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${touched.phoneNumber && errors.phoneNumber ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter your phone number"
                    autoComplete="off"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
            </div>

            <div>
                <label htmlFor="numberOfUnits" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Units
                </label>
                <input
                    type="number"
                    id="numberOfUnits"
                    value={numberOfUnits}
                    onChange={(e) => handleInputChange('numberOfUnits', parseInt(e.target.value) || 0)}
                    onBlur={() => handleBlur('numberOfUnits')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${touched.numberOfUnits && errors.numberOfUnits ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter number of units"
                    min="1"
                    autoComplete="off"
                />
                {touched.numberOfUnits && errors.numberOfUnits && (
                    <p className="mt-1 text-sm text-red-600">{errors.numberOfUnits}</p>
                )}
            </div>

            <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type
                </label>
                <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    onBlur={() => handleBlur('businessType')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${touched.businessType && errors.businessType ? "border-red-500" : "border-gray-300"
                        }`}
                    autoComplete="off"
                >
                    <option value="">Select business type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="service">Service</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                </select>
                {touched.businessType && errors.businessType && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
                )}
            </div>
        </form>
    );
} 