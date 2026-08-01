import { z } from "zod";

/** Allow letters (incl. common Latin diacritics), spaces, apostrophes, hyphens. */
const NAME_PART_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const COMMON_EMAIL_TLDS = new Set([
  "com",
  "org",
  "net",
  "edu",
  "gov",
  "mil",
  "int",
  "io",
  "co",
  "ai",
  "app",
  "dev",
  "me",
  "info",
  "biz",
  "pro",
  "xyz",
  "online",
  "site",
  "tech",
  "health",
  "care",
  "clinic",
  "doctor",
  "ng",
  "uk",
  "us",
  "ca",
  "au",
  "de",
  "fr",
  "ie",
  "za",
  "gh",
  "ke",
]);

function hasCommonEmailTld(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  const labels = domain.split(".");
  if (labels.length < 2 || labels.some((label) => label.length === 0)) {
    return false;
  }
  return COMMON_EMAIL_TLDS.has(labels[labels.length - 1]);
}

/**
 * Split a free-form name string into [first, last]:
 *  - First whitespace-separated token (trimmed) -> first_name
 *  - Remaining tokens joined by single spaces -> last_name
 * Returns null when only one token is present.
 */
export function splitFullName(fullName: string): {
  first_name: string;
  last_name: string;
} | null {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return null;
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

export const signUpSchema = z
  .object({
    /** "PATIENT" or "DOCTOR" — sent to the backend as role: [value] */
    role: z.enum(["PATIENT", "DOCTOR"]).default("PATIENT"),
    /**
     * Single free-form name field shown to the user. On submit we split this
     * into first_name/last_name before calling the backend API.
     */
    name: z
      .string()
      .trim()
      .min(1, "Please enter your name")
      .refine((val) => NAME_PART_REGEX.test(val), {
        message: "Please enter a valid name",
      })
      .refine(
        (val) => {
          const tokens = val.trim().split(/\s+/).filter(Boolean);
          return tokens.length >= 2 && tokens.every((t) => NAME_PART_REGEX.test(t));
        },
        {
          message: "Please enter your first and last name using letters only",
        },
      ),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address")
      .email("Please enter a valid email address")
      .refine(hasCommonEmailTld, {
        message: "Please use an email address with a valid domain",
      }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreetoTerms: z.boolean().refine((val) => val === true, {
      message: "Please agree to the Terms & Conditions and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordValues = z.infer<typeof newPasswordSchema>;

/** Exactly 6 numeric digits — must match CODE_LENGTH in EmailVerification.tsx */
export const otpCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Please enter the complete 6-digit code"),
});

export type OtpCodeValues = z.infer<typeof otpCodeSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
