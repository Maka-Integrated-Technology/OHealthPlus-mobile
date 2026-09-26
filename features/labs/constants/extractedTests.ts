import type { ExtractedTest } from "../types";

// Dummy tests "extracted" from the uploaded test-request document.
export const extractedTestsData: ExtractedTest[] = [
  { id: "1", name: "Complete Blood Count (CBC)", price: 1000 },
  { id: "2", name: "HIV Test", price: 1000 },
  { id: "3", name: "Hepatitis B", price: 1000 },
];

export const suggestedAdditionalTests: ExtractedTest[] = [
  { id: "4", name: "Malaria Parasite Test", price: 1000 },
  { id: "5", name: "Widal Test", price: 1000 },
];
