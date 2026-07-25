// Lab-test-booking types.
// NOTE: the lab-booking API does not exist in the backend yet — these shapes
// are inferred (UI-only flow, driven by dummy data in ./constants) following
// the same conventions as features/appointments/types.

import type { Ionicons } from "@expo/vector-icons";

export type PaymentMethodId = "card" | "bank_transfer" | "ussd" | "wallet";

export interface ExtractedTest {
  id: string;
  name: string;
  price: number;
}

export interface UploadedFile {
  name: string;
  sizeLabel: string;
  /** Local asset used to render a stand-in preview for the dummy flow. */
  previewImage: number;
}

export interface LabAvailabilitySlot {
  id: string;
  label: string; // e.g. "10:30 AM"
  isAvailable: boolean;
}

export interface Lab {
  id: string;
  name: string;
  image: number;
  rating: number;
  distanceKm: number;
  isOpenNow: boolean;
  closesAtLabel?: string;
  waitTimeLabel: string;
  offersHomeCollection: boolean;
  address: string;
  about: string;
  services: string[];
  price: number;
}

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface LabBookingSummary {
  id: string;
  labName: string;
  tests: ExtractedTest[];
  serviceFee: number;
  date: string;
  time: string;
}

export interface UpcomingLabTest {
  id: string;
  testName: string;
  labName: string;
  daysAwayLabel: string;
  date: string;
  time: string;
}

export interface LabResultValue {
  label: string;
  value: string;
  normalRangeLabel: string;
}

export interface CompletedLabTest {
  id: string;
  testName: string;
  labName: string;
  completedDateLabel: string;
  results: LabResultValue[];
}
