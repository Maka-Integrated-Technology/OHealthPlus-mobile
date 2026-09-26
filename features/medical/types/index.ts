// Backend-aligned medical-records types.
// NOTE: the medical-records API does not exist in the backend yet — these
// shapes are an inferred RESTful contract following the appointments feature.
// Rename freely once the real DTOs land.

export type BloodGroup = "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";
export type Genotype = "AA" | "AS" | "AC" | "SS" | "SC";

export type AllergyType = "food" | "drug";
export type AllergySeverity = "mild" | "life_threatening";

export type LabResultStatus = "normal" | "high" | "low";

export const BLOOD_GROUPS: BloodGroup[] = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

export const GENOTYPES: Genotype[] = ["AA", "AS", "AC", "SS", "SC"];

// ── General information ────────────────────────────────────────────────────────

export interface GeneralInfo {
  height_cm: number | null;
  weight_kg: number | null;
  blood_group: BloodGroup | null;
  genotype: Genotype | null;
  /** Derived server-side from height + weight. */
  bmi: number | null;
}

export interface UpdateGeneralInfoPayload {
  height_cm?: number;
  weight_kg?: number;
  blood_group?: BloodGroup;
  genotype?: Genotype;
}

// ── Allergies ──────────────────────────────────────────────────────────────────

export interface Allergy {
  id: string;
  /** Substance the patient is allergic to, e.g. "Beans", "Diclofenac". */
  name: string;
  type: AllergyType;
  severity: AllergySeverity;
  created_at: string; // ISO date
}

export interface CreateAllergyPayload {
  name: string;
  type: AllergyType;
  severity: AllergySeverity;
}

// ── Lab results ────────────────────────────────────────────────────────────────

export interface LabResultSummary {
  id: string;
  name: string; // "Complete Blood Count"
  lab_name: string; // "Lifebridge Pathology"
  result_date: string; // ISO date
  file_url?: string;
}

export interface LabParameter {
  parameter: string; // "Total Cholesterol"
  result: string; // "245 mg/dL"
  reference_range: string; // ">300"
  status: LabResultStatus;
}

export interface LabResultDetail extends LabResultSummary {
  reference_no: string; // "Ref ID: 546-K992"
  generated_at: string; // ISO date
  ordering_physician: string; // "Dr. John Doe"
  patient_name: string;
  patient_id: string; // "PT-2026-08452"
  parameters: LabParameter[];
}

// ── Health conditions ──────────────────────────────────────────────────────────

export interface HealthCondition {
  id: string;
  name: string; // "PCOS", "Diabetes"
  created_at: string; // ISO date
}

export interface CreateHealthConditionsPayload {
  /** One or more condition names to add at once. */
  names: string[];
}
