import { z } from "zod";
import { BLOOD_GROUPS, GENOTYPES } from "./types";

// ── General information ────────────────────────────────────────────────────────

const numericString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
      message: `Enter a valid ${label.toLowerCase()}`,
    })
    .refine((val) => Number(val) <= max, {
      message: `${label} looks too high`,
    });

export const generalInfoSchema = z.object({
  height: numericString("Height", 300), // cm
  weight: numericString("Weight", 700), // kg
  bloodGroup: z.enum(BLOOD_GROUPS as [string, ...string[]], {
    message: "Select a blood group",
  }),
  genotype: z.enum(GENOTYPES as [string, ...string[]], {
    message: "Select a genotype",
  }),
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;

// ── Allergies ──────────────────────────────────────────────────────────────────

export const allergySchema = z.object({
  type: z.enum(["food", "drug"], { message: "Select an allergy type" }),
  name: z.string().trim().min(2, "Enter the allergen"),
  severity: z.enum(["mild", "life_threatening"], {
    message: "Select a severity",
  }),
});

export type AllergyFormValues = z.infer<typeof allergySchema>;

// ── Other health condition ─────────────────────────────────────────────────────

export const otherConditionSchema = z.object({
  name: z.string().trim().min(2, "Enter a condition"),
});

export type OtherConditionFormValues = z.infer<typeof otherConditionSchema>;
