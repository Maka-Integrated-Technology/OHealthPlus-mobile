import { z } from "zod";

// ── Enable location (manual address entry) ────────────────────────────────────

export const manualAddressSchema = z.object({
  address: z.string().trim().min(5, "Enter a valid delivery address"),
});

export type ManualAddressFormValues = z.infer<typeof manualAddressSchema>;

// ── Payment information (card entry) ───────────────────────────────────────────

export const cardPaymentSchema = z.object({
  cardholderName: z.string().trim().min(2, "Enter the cardholder name"),
  cardNumber: z
    .string()
    .trim()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Enter a valid 16-digit card number"),
  expiryDate: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter a valid expiry date (MM/YY)"),
  cvv: z.string().trim().regex(/^\d{3,4}$/, "Enter a valid CVV"),
});

export type CardPaymentFormValues = z.infer<typeof cardPaymentSchema>;
