import { z } from 'zod';

// Mocked emails for validation
const MOCKED_EMAILS = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    "test@example.com",
    "admin@example.com"
];

// Mocked phone numbers for validation
const MOCKED_PHONE_NUMBERS = [
    "1234567890",
    "0987654321",
    "5555555555",
    "1112223333",
    "9998887777"
];

// Account validation schema
export const accountSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .refine((email) => !MOCKED_EMAILS.includes(email), {
            message: "This email is not allowed"
        }),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .optional(),
    isMagicLink: z.boolean()
}).refine((data) => {
    if (!data.isMagicLink && !data.password) {
        return false;
    }
    return true;
}, {
    message: "Password is required when not using magic link",
    path: ["password"]
});

// Business information validation schema
export const businessInfoSchema = z.object({
    businessName: z.string()
        .min(1, "Business name is required")
        .max(100, "Business name must be less than 100 characters"),
    phoneNumber: z.string()
        .min(1, "Phone number is required")
        .transform((val) => val.replace(/\D/g, ''))
        .refine((val) => val.length >= 10, {
            message: "Phone number must be at least 10 digits"
        })
        .refine((val) => val.length <= 15, {
            message: "Phone number must be less than 15 digits"
        })
        .refine((val) => !MOCKED_PHONE_NUMBERS.includes(val), {
            message: "This phone number is not allowed"
        }),
    numberOfUnits: z.number()
        .min(1, "Number of units must be greater than 0")
        .max(1000, "Number of units must be less than 1000"),
    businessType: z.string()
        .min(1, "Business type is required")
        .refine((val) =>
            ["restaurant", "retail", "service", "manufacturing", "other"].includes(val),
            { message: "Please select a valid business type" }
        )
});

// Phone configuration validation schema
export const phoneConfigSchema = z.object({
    announcement: z.string()
        .min(1, "Announcement is required")
        .min(10, "Announcement must be at least 10 characters")
        .max(500, "Announcement must be less than 500 characters"),
    forwardingNumber: z.string()
        .min(1, "Forwarding number is required")
        .transform((val) => val.replace(/\D/g, ''))
        .refine((val) => val.length >= 10, {
            message: "Forwarding number must be at least 10 digits"
        })
        .refine((val) => val.length <= 15, {
            message: "Forwarding number must be less than 15 digits"
        })
        .refine((val) => !MOCKED_PHONE_NUMBERS.includes(val), {
            message: "This phone number is not allowed"
        }),
    isTested: z.boolean()
        .refine((val) => val === true, {
            message: "Please test the configuration before proceeding"
        })
});

// Type exports
export type AccountFormData = z.infer<typeof accountSchema>;
export type BusinessInfoFormData = z.infer<typeof businessInfoSchema>;
export type PhoneConfigFormData = z.infer<typeof phoneConfigSchema>; 