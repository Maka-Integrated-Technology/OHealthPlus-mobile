import { axiosPrivate } from "@/config/axios";
import { unwrapApiData } from "@/utils/apiResponse";
import type {
  ApiBooking,
  ApiProfessional,
  ApiProfessionalDetail,
  ApiProfessionalReview,
  ApiSpeciality,
  CreateBookingPayload,
  CreateReviewPayload,
} from "../types";

// Re-export so callers can import types from this module.
export type {
  ApiBooking,
  ApiProfessional,
  ApiProfessionalDetail,
  ApiProfessionalReview,
  ApiSpeciality,
  CreateBookingPayload,
  CreateReviewPayload,
};

// ── Specialities ──────────────────────────────────────────────────────────────

export async function getSpecialities(): Promise<ApiSpeciality[]> {
  const res = await axiosPrivate.get("/specialities");
  console.log("res", res.data);
  return unwrapApiData<ApiSpeciality[]>(res.data) ?? [];
}

export async function getSpecialityById(id: string): Promise<ApiSpeciality> {
  const res = await axiosPrivate.get(`/specialities/${id}`);
  const data = unwrapApiData<ApiSpeciality>(res.data);
  if (!data) throw new Error(`Speciality ${id} not found in response`);
  return data;
}

// ── Professionals ─────────────────────────────────────────────────────────────

export async function getProfessionalsBySpeciality(
  specialityId: string,
): Promise<ApiProfessional[]> {
  const res = await axiosPrivate.get("/professionals", {
    params: { speciality_id: specialityId },
  });
  return unwrapApiData<ApiProfessional[]>(res.data) ?? [];
}

export async function getProfessionalById(
  id: string,
): Promise<ApiProfessionalDetail> {
  const res = await axiosPrivate.get(`/professionals/${id}`);
  const data = unwrapApiData<ApiProfessionalDetail>(res.data);
  if (!data) throw new Error(`Professional ${id} not found in response`);
  return data;
}

export async function getProfessionalReviews(
  professionalId: string,
): Promise<ApiProfessionalReview[]> {
  const res = await axiosPrivate.get(
    `/professionals/${professionalId}/reviews`,
  );
  return unwrapApiData<ApiProfessionalReview[]>(res.data) ?? [];
}

export async function createProfessionalReview(
  professionalId: string,
  payload: CreateReviewPayload,
): Promise<ApiProfessionalReview> {
  const res = await axiosPrivate.post(
    `/professionals/${professionalId}/reviews`,
    payload,
  );
  const data = unwrapApiData<ApiProfessionalReview>(res.data);
  if (!data) throw new Error("No review data in response");
  return data;
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export async function getBookings(): Promise<ApiBooking[]> {
  const res = await axiosPrivate.get("/bookings");
  return unwrapApiData<ApiBooking[]>(res.data) ?? [];
}

export async function getBookingById(id: string): Promise<ApiBooking> {
  const res = await axiosPrivate.get(`/bookings/${id}`);
  const data = unwrapApiData<ApiBooking>(res.data);
  if (!data) throw new Error(`Booking ${id} not found in response`);
  return data;
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<ApiBooking> {
  const res = await axiosPrivate.post("/bookings", payload);
  const data = unwrapApiData<ApiBooking>(res.data);
  if (!data) throw new Error("No booking data in response");
  return data;
}

export async function cancelBooking(id: string): Promise<ApiBooking> {
  const res = await axiosPrivate.patch(`/bookings/${id}/cancel`);
  const data = unwrapApiData<ApiBooking>(res.data);
  if (!data) throw new Error("No booking data in cancellation response");
  return data;
}
