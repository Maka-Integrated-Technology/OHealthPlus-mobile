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
    AUTHENTICATION: "/(auth)/",
    SIGN_UP: "/(auth)/screens/Signup",
    SIGN_IN: "/(auth)/",
    FORGOT_PASSWORD: "/(auth)/screens/ForgotPassword",
    EMAIL_VERIFICATION: "/(auth)/screens/EmailVerification",
    PASSWORD_SUCCESS: "/(auth)/screens/PasswordSuccess",
    MANIFESTATION_ASPECTS: "/(auth)/screens/ManifestationAspects",

    // ============================================
    // Main App Routes
    // ============================================
    HOME: "/(tabs)/explore",
    GALLERY_HOME: "/(manifestationMainHome)/(tabs)/gallery",
    SHARED: "/(manifestationMainHome)/(tabs)/shared",
    PROFILE: "/(manifestationMainHome)/(tabs)/profile",

    // ============================================
    // SCREENS
    // ============================================
    FAVOURITES: "/(manifestationMainHome)/screens/Favourites",
    ALL_EVENTS: "/screens/AllEvents",
    EVENTS_PREVIEW: "/screens/EventPreview",

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
