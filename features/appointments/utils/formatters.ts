import { ImageSourcePropType } from "react-native";
import avatar from "@/assets/images/avatar.png";
import type { ApiBooking, BookingStatus, ConsultationType } from "../types";

// ── Naira formatter ───────────────────────────────────────────────────────────

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

// ── Date / time formatters ────────────────────────────────────────────────────

/** Converts "YYYY-MM-DD" → "Mon, 16 Jun" */
export function formatBookingDate(date: string): string {
  const d = new Date(date + "T00:00:00"); // avoid UTC shift
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}

/** Converts "09:00" or "09:00:00" → "9:00 AM" */
export function formatBookingTime(time: string): string {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1] ?? "00";
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${minutes} ${period}`;
}

/** "YYYY-MM-DD", "HH:MM" → "Mon, 16 Jun • 9:00 AM" */
export function formatBookingDateTime(date: string, time: string): string {
  return `${formatBookingDate(date)} • ${formatBookingTime(time)}`;
}

/**
 * Formats an availability date with human-friendly labels for today/tomorrow.
 * Input: "YYYY-MM-DD"
 */
export function formatAvailabilityDate(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const d = new Date(dateStr + "T00:00:00");
  if (d.getTime() === today.getTime()) return "Today";
  if (d.getTime() === tomorrow.getTime()) return "Tomorrow";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[d.getDay()]}, ${ordinal(d.getDate())}`;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ── Booking helpers ───────────────────────────────────────────────────────────

export function isUpcomingBooking(booking: ApiBooking): boolean {
  return booking.status === "pending" || booking.status === "confirmed";
}

export function bookingStatusLabel(status: BookingStatus): string {
  switch (status) {
    case "pending":
    case "confirmed":
      return "Upcoming";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

// ── Consultation type helpers ─────────────────────────────────────────────────

/**
 * Returns the list of selectable consultation types for a professional.
 * "both" expands to ["chat", "video"]; single types return a 1-element array.
 */
export function getSupportedConsultationTypes(
  type: ConsultationType
): ("chat" | "video")[] {
  if (type === "both") return ["chat", "video"];
  return [type];
}

// ── Image helper ──────────────────────────────────────────────────────────────

/** Returns a React Native ImageSource from an optional remote URL, with local fallback. */
export function getImageSource(
  remoteUrl: string | undefined
): ImageSourcePropType {
  if (remoteUrl) return { uri: remoteUrl };
  return avatar as ImageSourcePropType;
}
