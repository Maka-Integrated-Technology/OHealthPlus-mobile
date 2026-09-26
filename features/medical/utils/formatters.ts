import type { AllergySeverity, AllergyType } from "../types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "June 26, 2026" */
export function formatLongDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** "Added on June 26, 2026" */
export function formatAddedOn(iso: string): string {
  return `Added on ${formatLongDate(iso)}`;
}

/** "May 2026" — used to group lab results. */
export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export const ALLERGY_TYPE_LABELS: Record<AllergyType, string> = {
  food: "Food Allergy",
  drug: "Drug Allergy",
};

export const ALLERGY_SEVERITY_LABELS: Record<AllergySeverity, string> = {
  mild: "Mild",
  life_threatening: "Life Threatening",
};

/** Groups items by month-year label, preserving input order of first appearance. */
export function groupByMonth<T>(
  items: T[],
  getDate: (item: T) => string,
): { label: string; items: T[] }[] {
  const groups: { label: string; items: T[] }[] = [];
  const index = new Map<string, number>();

  for (const item of items) {
    const label = formatMonthYear(getDate(item));
    if (!index.has(label)) {
      index.set(label, groups.length);
      groups.push({ label, items: [] });
    }
    groups[index.get(label)!].items.push(item);
  }

  return groups;
}
