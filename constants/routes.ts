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
    AVAILABLE_PROFESSIONALS: "/screens/appointments/AvailableProfessionals",
    PROFESSIONAL_PROFILE: "/screens/appointments/ProfessionalProfile",
    SELECT_DATE_TIME: "/screens/appointments/SelectDateTime",
    CONFIRM_APPOINTMENT: "/screens/appointments/ConfirmAppointment",
    APPOINTMENT_CONFIRMED: "/screens/appointments/AppointmentConfirmed",
    APPOINTMENT_DETAILS: "/screens/appointments/AppointmentDetails",
    VIDEO_CONSULTATION_SETUP: "/screens/appointments/VideoConsultationSetup",
    VIDEO_CALL: "/screens/appointments/VideoCall",
    CONSULTATION_COMPLETED: "/screens/appointments/ConsultationCompleted",
    APPOINTMENT_SUMMARY: "/screens/appointments/AppointmentSummary",

    // ============================================
    // Messages Routes
    // ============================================
    AI_HEALTH_ASSISTANT: "/screens/messages/AIHealthAssistant",

    // ============================================
    // Profile Routes
    // ============================================
    PERSONAL_INFORMATION: "/screens/profile/PersonalInformation",
    CHANGE_PASSWORD: "/screens/profile/ChangePassword",
    NOTIFICATIONS: "/screens/profile/Notifications",
    TERMS_AND_CONDITIONS: "/screens/profile/TermsAndConditions",
    PRIVACY_POLICY: "/screens/profile/PrivacyPolicy",

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
