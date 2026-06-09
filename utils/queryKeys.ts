export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
    session: ["auth", "session"] as const,
    twoFactor: (userId: string) => ["auth", "2fa", userId] as const,
  },
} as const;
