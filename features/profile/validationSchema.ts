import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .refine((val) => val.replace(/\D/g, "").length >= 7, {
      message: "Please enter a valid phone number",
    }),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
