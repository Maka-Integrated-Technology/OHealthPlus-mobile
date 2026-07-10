import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine((val) => val === "" || val.replace(/\D/g, "").length >= 7, {
      message: "Please enter a valid phone number",
    }),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
