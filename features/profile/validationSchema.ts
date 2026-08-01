import { z } from "zod";

/**
 * The Personal Information screen shows a single "Full Name" field per Figma.
 * On submit we split this into first_name + last_name before calling the API.
 */
export const personalInfoSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .refine(
      (val) => {
        const parts = val.trim().split(/\s+/).filter(Boolean);
        return parts.length >= 2;
      },
      { message: "Please enter your first and last name" },
    ),
  email: z.string().trim().email("Please enter a valid email address"),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
