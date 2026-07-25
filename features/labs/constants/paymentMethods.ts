import type { PaymentMethodOption } from "../types";

export const paymentMethodOptions: PaymentMethodOption[] = [
  { id: "card", label: "Credit / Debit Card", icon: "card-outline" },
  { id: "bank_transfer", label: "Bank Transfer", icon: "business-outline" },
  { id: "ussd", label: "USSD", icon: "keypad-outline" },
  { id: "wallet", label: "Digital Wallet", icon: "wallet-outline" },
];
