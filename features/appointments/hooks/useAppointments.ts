import { queryClient } from "@/config/queryClient";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelBooking,
  createBooking,
  createProfessionalReview,
  getBookingById,
  getBookings,
  getProfessionalById,
  getProfessionalReviews,
  getProfessionalsBySpeciality,
  getSpecialities,
  getSpecialityById,
} from "../services/appointments";
import type { CreateBookingPayload, CreateReviewPayload } from "../types";

// ── Specialities ──────────────────────────────────────────────────────────────

export function useSpecialities() {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.specialities,
    queryFn: getSpecialities,
  });
}

export function useSpeciality(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.speciality(id),
    queryFn: () => getSpecialityById(id),
    enabled: !!id,
  });
}

// ── Professionals ─────────────────────────────────────────────────────────────

export function useProfessionalsBySpeciality(specialityId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.professionalsBySpeciality(specialityId),
    queryFn: () => getProfessionalsBySpeciality(specialityId),
    enabled: !!specialityId,
  });
}

export function useProfessional(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.professional(id),
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
  });
}

export function useProfessionalReviews(professionalId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.professionalReviews(professionalId),
    queryFn: () => getProfessionalReviews(professionalId),
    enabled: !!professionalId,
  });
}

export function useCreateProfessionalReview(professionalId: string) {
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      createProfessionalReview(professionalId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.professional(professionalId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.professionalReviews(professionalId),
      });
      // Also invalidate the professionals list for this professional's speciality
      // (rating may have changed). We do a broad invalidation.
      queryClient.invalidateQueries({
        queryKey: ["appointments", "professionals", "speciality"],
        exact: false,
      });
    },
  });
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export function useBookings() {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.bookings,
    queryFn: getBookings,
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.booking(id),
    queryFn: () => getBookingById(id),
    enabled: !!id,
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.bookings,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.professional(booking.professional_id),
      });
    },
  });
}

export function useCancelBooking() {
  return useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.bookings,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.booking(booking.id),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.appointments.professional(booking.professional_id),
      });
    },
  });
}
