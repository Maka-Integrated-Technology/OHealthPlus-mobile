import { z } from "zod";

export const signUpSchema = z
  .object({
    /** "PATIENT" or "DOCTOR" — sent to the backend as role: [value] */
    role: z.enum(["PATIENT", "DOCTOR"]).default("PATIENT"),
    first_name: z.string().trim().min(2, "First name must be at least 2 characters"),
    last_name: z.string().trim().min(2, "Last name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
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
