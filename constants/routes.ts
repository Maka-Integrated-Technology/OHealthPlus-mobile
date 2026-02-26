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
    OTP: "/(auth)/otp",
    FORGOT_PASSWORD: "/(auth)/forgetpassword",
    EMAIL_VERIFICATION: "/(auth)/emailverification",
    PASSWORD_SUCCESS: "/(auth)/passwordsuccess",
    LEGAL_TERMS: "/(auth)/legalTerm",

    // ============================================
    // Main App Routes
    // ============================================
    TABS: "/(tabs)",
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
