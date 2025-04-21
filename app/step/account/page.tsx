"use client";

import { useState, useEffect } from "react";
import { useStepper } from "@/app/context/StepperContext";
import { useCreateAccountStore } from "@/app/store/createAccountStore";
import { accountSchema, type AccountFormData } from "@/app/lib/validation";
import { z } from "zod";

export default function Account() {
    const { email, password, isMagicLink, setEmail, setPassword, setIsMagicLink } = useCreateAccountStore();
    const [errors, setErrors] = useState<Partial<Record<keyof AccountFormData, string>>>({});
    const { setStepValid } = useStepper();

    const validateStep = () => {
        try {
            const formData = {
                email,
                password: isMagicLink ? undefined : password,
                isMagicLink
            };
            accountSchema.parse(formData);
            setErrors({});
            setStepValid(1, true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof AccountFormData, string>> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof AccountFormData] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            setStepValid(1, false);
        }
    };

    useEffect(() => {
        if (email !== undefined && password !== undefined && isMagicLink !== undefined) {
            validateStep();
        }
    }, [email, password, isMagicLink]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateStep();
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validateStep();
    };

    const handleMagicLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIsMagicLink = e.target.checked;
        setIsMagicLink(newIsMagicLink);
        validateStep();
    };

    return (
        <form className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter your email"
                    autoComplete="off"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
            </div>

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="magicLink"
                    checked={isMagicLink}
                    onChange={handleMagicLinkChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="magicLink" className="ml-2 block text-sm text-gray-900">
                    Use Magic Link for login
                </label>
            </div>

            {!isMagicLink && (
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your password"
                        autoComplete="off"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>
            )}
        </form>
    );
} 