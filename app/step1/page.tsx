"use client";

import { useState, useEffect } from "react";
import { useStepper } from "@/app/context/StepperContext";
import { useCreateAccountStore } from "@/app/store/createAccountStore";

export default function Step1() {
    const { email, password, isMagicLink, setEmail, setPassword, setIsMagicLink } = useCreateAccountStore();
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { setStepValid, validateEmail } = useStepper();

    const validateStep = (email: string, password: string, isMagicLink: boolean) => {
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setStepValid(1, false);
            return;
        }

        if (!isMagicLink && !password) {
            setPasswordError("Please set a password or use magic link");
            setStepValid(1, false);
            return;
        }

        if (!isMagicLink && passwordError) {
            setStepValid(1, false);
            return;
        }

        setStepValid(1, true);
    };

    useEffect(() => {
        if (email !== undefined && password !== undefined && isMagicLink !== undefined) {
            validateStep(email, password, isMagicLink);
        }
    }, [email, password, isMagicLink]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const validationResult = validateEmail(newEmail);
        if (!validationResult.isValid) {
            setError(validationResult.error || "");
            setStepValid(1, false);
        } else {
            setError("");
            validateStep(newEmail, password, isMagicLink);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!isMagicLink && newPassword) {
            if (newPassword.length < 8) {
                setPasswordError("Password must be at least 8 characters long");
                setStepValid(1, false);
            } else {
                setPasswordError("");
                validateStep(email, newPassword, isMagicLink);
            }
        } else {
            setPasswordError("");
            validateStep(email, newPassword, isMagicLink);
        }
    };

    const handleMagicLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setIsMagicLink(newValue);
        if (newValue) {
            setPasswordError("");
            validateStep(email, password, newValue);
        } else if (password) {
            handlePasswordChange({ target: { value: password } } as React.ChangeEvent<HTMLInputElement>);
        } else {
            validateStep(email, password, newValue);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${error ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your email"
                    />
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

                {!isMagicLink && (
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password (optional)
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${passwordError ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your password"
                        />
                        {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="magicLink"
                        checked={isMagicLink}
                        onChange={handleMagicLinkChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="magicLink" className="text-sm text-gray-700">
                        Use Magic Link instead of password
                    </label>
                </div>
            </form>
        </div>
    );
} 