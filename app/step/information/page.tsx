"use client";

import { useState, useEffect } from "react";
import { useStepper } from "@/app/context/StepperContext";
import { useBusinessDetailsStore } from "@/app/store/businessDetailsStore";

export default function Information() {
    const { businessName, phoneNumber, numberOfUnits, businessType,
        setBusinessName, setPhoneNumber, setNumberOfUnits, setBusinessType } = useBusinessDetailsStore();
    const { setStepValid } = useStepper();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (field: string, value: string | number) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'businessName':
                if (!(value as string).trim()) {
                    newErrors.businessName = "Business name is required";
                } else {
                    delete newErrors.businessName;
                }
                break;
            case 'phoneNumber':
                if (!(value as string).trim()) {
                    newErrors.phoneNumber = "Phone number is required";
                } else if ((value as string).replace(/\D/g, '').length < 7) {
                    newErrors.phoneNumber = "Please enter a valid phone number";
                } else {
                    delete newErrors.phoneNumber;
                }
                break;
            case 'numberOfUnits':
                if (!value || (value as number) <= 0) {
                    newErrors.numberOfUnits = "Number of units is required and must be greater than 0";
                } else {
                    delete newErrors.numberOfUnits;
                }
                break;
            case 'businessType':
                if (!value || (value as string).trim() === '') {
                    newErrors.businessType = "Business type is required";
                } else {
                    delete newErrors.businessType;
                }
                break;
        }

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setStepValid(2, isValid);
    };

    // Add validation when store values change
    useEffect(() => {
        if (businessName !== undefined && phoneNumber !== undefined &&
            numberOfUnits !== undefined && businessType !== undefined) {
            validateField('businessName', businessName);
            validateField('phoneNumber', phoneNumber);
            validateField('numberOfUnits', numberOfUnits);
            validateField('businessType', businessType);
        }
    }, [businessName, phoneNumber, numberOfUnits, businessType]);

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
            validateField(field, value);
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        switch (field) {
            case 'businessName':
                validateField(field, businessName);
                break;
            case 'phoneNumber':
                validateField(field, phoneNumber);
                break;
            case 'numberOfUnits':
                validateField(field, numberOfUnits);
                break;
            case 'businessType':
                validateField(field, businessType);
                break;
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
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
        </div>
    );
} 