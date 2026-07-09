export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
    session: ["auth", "session"] as const,
    twoFactor: (userId: string) => ["auth", "2fa", userId] as const,
  },

  appointments: {
    specialities: ["appointments", "specialities"] as const,
    speciality: (id: string) => ["appointments", "specialities", id] as const,

    professionalsBySpeciality: (specialityId: string) =>
      ["appointments", "professionals", "speciality", specialityId] as const,
    professional: (id: string) =>
      ["appointments", "professionals", id] as const,
    professionalReviews: (id: string) =>
      ["appointments", "professionals", id, "reviews"] as const,

    bookings: ["appointments", "bookings"] as const,
    booking: (id: string) => ["appointments", "bookings", id] as const,
  },

  medical: {
    generalInfo: ["medical", "general-info"] as const,
    allergies: ["medical", "allergies"] as const,
    labResults: ["medical", "lab-results"] as const,
    labResult: (id: string) => ["medical", "lab-results", id] as const,
    healthConditions: ["medical", "health-conditions"] as const,
  },

  messages: {
    chatHistory: ["messages", "chat", "history"] as const,
  },
} as const;
