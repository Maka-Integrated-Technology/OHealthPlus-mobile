import type { CompletedLabTest, UpcomingLabTest } from "../types";

export const upcomingLabTestsData: UpcomingLabTest[] = [
  {
    id: "1",
    testName: "Complete Blood Count",
    labName: "Synlab Diagnostics",
    daysAwayLabel: "In 2 days",
    date: "Aug 17, 2026",
    time: "10:30 AM",
  },
];

export const completedLabTestsData: CompletedLabTest[] = [
  {
    id: "1",
    testName: "Complete Blood Count (CBC)",
    labName: "Synlab Diagnostics",
    completedDateLabel: "Completed on Oct 12, 2026",
    results: [
      {
        label: "Total Cholesterol",
        value: "160 mg/dL",
        normalRangeLabel: "Normal: < 200 mg/dL",
      },
      {
        label: "HDL (Good)",
        value: "55 mg/dL",
        normalRangeLabel: "Normal: > 40 mg/dL",
      },
      {
        label: "LDL (Bad)",
        value: "110 mg/dL",
        normalRangeLabel: "Normal: < 100 mg/dL",
      },
    ],
  },
];
