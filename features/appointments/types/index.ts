// Backend-aligned appointment types.
// All shapes match the server's response DTOs exactly.

export type ConsultationType = "chat" | "video" | "both";
export type BookingConsultationType = "chat" | "video";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface ApiSpeciality {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiProfessional {
  id: string;
  name: string;
  image?: string;
  speciality_id: string;
  speciality: string;
  rating: number;
  total_reviews: number;
  consultation_fee: number;
  years_of_experience: number;
  about?: string;
  consultation_type: ConsultationType;
  is_available: boolean;
}

export interface AvailabilitySlot {
  id: string;
  start_time: string; // HH:MM or HH:MM:SS from DB
  end_time: string;
  is_available: boolean;
}

export interface AvailabilityGroup {
  date: string; // YYYY-MM-DD
  slots: AvailabilitySlot[];
}

export interface ApiProfessionalDetail extends ApiProfessional {
  availabilities: AvailabilityGroup[];
}

export interface ApiProfessionalReview {
  id: string;
  reviewer_id: string;
  professional_id: string;
  rating: number;
  comment?: string;
  booking_id?: string;
  created_at: string;
}

export interface CreateBookingPayload {
  professional_id: string;
  booking_date: string; // YYYY-MM-DD
  booking_time: string; // HH:MM — must equal slot.start_time
  consultation_type: BookingConsultationType;
  notes?: string;
}

export interface CreateReviewPayload {
  rating: number;
  comment?: string;
  booking_id?: string;
}

export interface ApiBooking {
  id: string;
  patient_id: string;
  professional_id: string;
  professional_name: string;
  professional_image?: string;
  speciality_id: string;
  speciality_name: string;
  booking_date: string; // YYYY-MM-DD
  booking_time: string; // HH:MM or HH:MM:SS
  consultation_type: BookingConsultationType;
  amount: number;
  status: BookingStatus;
  payment_status: "paid" | "unpaid";
  notes?: string;
  is_paid: boolean;
  created_at: string;
}
