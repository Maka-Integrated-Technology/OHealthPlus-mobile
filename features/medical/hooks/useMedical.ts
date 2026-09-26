import { queryClient } from "@/config/queryClient";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAllergy,
  createHealthConditions,
  deleteAllergy,
  deleteHealthCondition,
  getAllergies,
  getGeneralInfo,
  getHealthConditions,
  getLabResultById,
  getLabResults,
  updateGeneralInfo,
} from "../services/medical";
import type {
  CreateAllergyPayload,
  CreateHealthConditionsPayload,
  UpdateGeneralInfoPayload,
} from "../types";

// ── General information ────────────────────────────────────────────────────────

export function useGeneralInfo() {
  return useQuery({
    queryKey: QUERY_KEYS.medical.generalInfo,
    queryFn: getGeneralInfo,
  });
}

export function useUpdateGeneralInfo() {
  return useMutation({
    mutationFn: (payload: UpdateGeneralInfoPayload) =>
      updateGeneralInfo(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.medical.generalInfo, data);
    },
  });
}

// ── Allergies ──────────────────────────────────────────────────────────────────

export function useAllergies() {
  return useQuery({
    queryKey: QUERY_KEYS.medical.allergies,
    queryFn: getAllergies,
  });
}

export function useAddAllergy() {
  return useMutation({
    mutationFn: (payload: CreateAllergyPayload) => createAllergy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.medical.allergies });
    },
  });
}

export function useDeleteAllergy() {
  return useMutation({
    mutationFn: (id: string) => deleteAllergy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.medical.allergies });
    },
  });
}

// ── Lab results ────────────────────────────────────────────────────────────────

export function useLabResults() {
  return useQuery({
    queryKey: QUERY_KEYS.medical.labResults,
    queryFn: getLabResults,
  });
}

export function useLabResult(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.medical.labResult(id),
    queryFn: () => getLabResultById(id),
    enabled: !!id,
  });
}

// ── Health conditions ──────────────────────────────────────────────────────────

export function useHealthConditions() {
  return useQuery({
    queryKey: QUERY_KEYS.medical.healthConditions,
    queryFn: getHealthConditions,
  });
}

export function useAddHealthConditions() {
  return useMutation({
    mutationFn: (payload: CreateHealthConditionsPayload) =>
      createHealthConditions(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.medical.healthConditions,
      });
    },
  });
}

export function useDeleteHealthCondition() {
  return useMutation({
    mutationFn: (id: string) => deleteHealthCondition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.medical.healthConditions,
      });
    },
  });
}
