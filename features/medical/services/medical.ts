import { axiosPrivate } from "@/config/axios";
import { unwrapApiData } from "@/utils/apiResponse";
import type {
  Allergy,
  CreateAllergyPayload,
  CreateHealthConditionsPayload,
  GeneralInfo,
  HealthCondition,
  LabResultDetail,
  LabResultSummary,
  UpdateGeneralInfoPayload,
} from "../types";

// Re-export so callers can import types from this module.
export type {
  Allergy,
  CreateAllergyPayload,
  CreateHealthConditionsPayload,
  GeneralInfo,
  HealthCondition,
  LabResultDetail,
  LabResultSummary,
  UpdateGeneralInfoPayload,
};

const BASE = "/medical-records";

// ── General information ────────────────────────────────────────────────────────

export async function getGeneralInfo(): Promise<GeneralInfo | null> {
  const res = await axiosPrivate.get(`${BASE}/general-info`);
  return unwrapApiData<GeneralInfo | null>(res.data) ?? null;
}

export async function updateGeneralInfo(
  payload: UpdateGeneralInfoPayload,
): Promise<GeneralInfo> {
  const res = await axiosPrivate.patch(`${BASE}/general-info`, payload);
  const data = unwrapApiData<GeneralInfo>(res.data);
  if (!data) throw new Error("Failed to update general information");
  return data;
}

// ── Allergies ──────────────────────────────────────────────────────────────────

export async function getAllergies(): Promise<Allergy[]> {
  const res = await axiosPrivate.get(`${BASE}/allergies`);
  return unwrapApiData<Allergy[]>(res.data) ?? [];
}

export async function createAllergy(
  payload: CreateAllergyPayload,
): Promise<Allergy> {
  const res = await axiosPrivate.post(`${BASE}/allergies`, payload);
  const data = unwrapApiData<Allergy>(res.data);
  if (!data) throw new Error("Failed to add allergy");
  return data;
}

export async function deleteAllergy(id: string): Promise<void> {
  await axiosPrivate.delete(`${BASE}/allergies/${id}`);
}

// ── Lab results ────────────────────────────────────────────────────────────────

export async function getLabResults(): Promise<LabResultSummary[]> {
  const res = await axiosPrivate.get(`${BASE}/lab-results`);
  return unwrapApiData<LabResultSummary[]>(res.data) ?? [];
}

export async function getLabResultById(id: string): Promise<LabResultDetail> {
  const res = await axiosPrivate.get(`${BASE}/lab-results/${id}`);
  const data = unwrapApiData<LabResultDetail>(res.data);
  if (!data) throw new Error(`Lab result ${id} not found in response`);
  return data;
}

// ── Health conditions ──────────────────────────────────────────────────────────

export async function getHealthConditions(): Promise<HealthCondition[]> {
  const res = await axiosPrivate.get(`${BASE}/health-conditions`);
  return unwrapApiData<HealthCondition[]>(res.data) ?? [];
}

export async function createHealthConditions(
  payload: CreateHealthConditionsPayload,
): Promise<HealthCondition[]> {
  const res = await axiosPrivate.post(`${BASE}/health-conditions`, payload);
  return unwrapApiData<HealthCondition[]>(res.data) ?? [];
}

export async function deleteHealthCondition(id: string): Promise<void> {
  await axiosPrivate.delete(`${BASE}/health-conditions/${id}`);
}
