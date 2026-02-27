// ============================================
// constants/routes.ts - Route path definitions
// ============================================
export const ROUTES = {
    // ============================================
    // Onboarding Routes
    // ============================================
    ONBOARDING: "/(auth)/onboarding",

    // ============================================
    // Authentication Routes
    // ============================================

    SIGN_UP: "/(auth)/signup",
    SIGN_IN: "/(auth)/signin",
    LEGAL_TERMS: "/(auth)/legalTerm",
    OTP: "/(auth)/OTP",
    FORGOT_PASSWORD: "/(auth)/ForgotPassword",
    NEW_PASSWORD: "/(auth)/NewPassword",
    EMAIL_VERIFICATION: "/(auth)/EmailVerification",
    PASSWORD_SUCCESS: "/(auth)/PasswordResetSuccess",
    MANIFESTATION_ASPECTS: "/(auth)/ManifestationAspects",

    // ============================================
    // Main App Routes
    // ============================================

    HOME: "/(tabs)",
    PROFILE: "/(tabs)/profile",

    // ============================================
    // SCREENS
    // ============================================
    FAVOURITES: "/()/screens/Favourites",
    ALL_EVENTS: "/screens/AllEvents",
    EVENTS_PREVIEW: "/screens/EventPreview",
    BOOK_APPOINTMENT: "/screens/appointments/BookAppointment",



    // ============================================
    // Paywall Routes
    // ============================================
    PAYWALL: "/(paywall)",
    SUBSCRIPTION: "/(paywall)/screens/Subscription",
    UPGRADE_PLAN: "/(paywall)/screens/UpgradePlan",
    PAYMENT_SUCCESS: "/(paywall)/screens/PaymentSuccess",

    // ============================================
    // Profile Routes (add when needed)
    // ============================================
    // PROFILE: '/(profile)',
    // USER_PROFILE: '/(profile)/screens/UserProfile',
    // EDIT_PROFILE: '/(profile)/screens/EditProfile',
    // SETTINGS: '/(profile)/screens/Settings',
} as const;
