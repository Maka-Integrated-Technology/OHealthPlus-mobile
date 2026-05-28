// ============================================
// config/router.ts - Navigation logic and hook
// ============================================
import { ROUTES } from "@/constants/routes";
import { Href, useRouter } from "expo-router";

// ============================================
// Types
// ============================================
type RouteParams = Record<string, string | number | boolean>;

// ============================================
// Custom Router Hook - Clean & Simple
// ============================================
export const useAppRouter = () => {
    const router = useRouter();

    // Helper to navigate with optional params
    const navigate = (path: string, params?: RouteParams) => {
        let finalPath = path;

        if (params) {
            const queryString = Object.entries(params)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join("&");
            finalPath = `${path}?${queryString}`;
        }

        router.push(finalPath as Href);
    };

    // Helper to replace with optional params
    const navigateReplace = (path: string, params?: RouteParams) => {
        let finalPath = path;

        if (params) {
            const queryString = Object.entries(params)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join("&");
            finalPath = `${path}?${queryString}`;
        }

        router.replace(finalPath as Href);
    };

    return {
        // ============================================
        // Core Navigation Methods
        // ============================================
        push: navigate,
        replace: navigateReplace,
        back: () => router.back(),
        canGoBack: () => router.canGoBack(),

        goBackOrHome: () => {
            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace(ROUTES.HOME as Href);
            }
        },

        // ============================================
        // Onboarding Navigation
        // ============================================
        toWelcome: () => navigateReplace(ROUTES.ONBOARDING),
        toLegalTerms: (params: { param: 'terms' | 'privacy' }) => navigate(ROUTES.LEGAL_TERMS, params),

        // ============================================
        // Authentication Navigation
        // ============================================
        toSignUp: () => navigate(ROUTES.SIGN_UP),
        toSignIn: () => navigateReplace(ROUTES.SIGN_IN),
        toForgotPassword: () => navigate(ROUTES.FORGOT_PASSWORD),
        toEmailVerification: (params?: { email?: string }) =>
            navigate(ROUTES.EMAIL_VERIFICATION, params),
        toPasswordSuccess: () => navigate(ROUTES.PASSWORD_SUCCESS),

        // ============================================
        // Main App Navigation
        // ============================================
        toHome: () => navigateReplace(ROUTES.HOME),
        toBookAppointments: () => navigate(ROUTES.BOOK_APPOINTMENT),
        toAvailabeleProfessionals: () => navigate(ROUTES.AVAILABLE_PROFESSIONALS),
        toProfessionalProfile: (params?: { professionalId?: string }) => 
            navigate(ROUTES.PROFESSIONAL_PROFILE, params),
        toSelectDateTime: (params?: { professionalId?: string; consultationType?: string }) => 
            navigate(ROUTES.SELECT_DATE_TIME, params),
        toConfirmAppointment: (params?: { professionalId?: string; consultationType?: string; date?: string; time?: string }) => 
            navigate(ROUTES.CONFIRM_APPOINTMENT, params),
        toAppointmentConfirmed: (params?: { professionalId?: string; consultationType?: string; date?: string; time?: string }) => 
            navigate(ROUTES.APPOINTMENT_CONFIRMED, params),
        toAppointmentDetails: (params?: { id?: string }) =>
            navigate(ROUTES.APPOINTMENT_DETAILS, params),
        toVideoConsultationSetup: (params?: { appointmentId?: string; doctorName?: string }) =>
            navigate(ROUTES.VIDEO_CONSULTATION_SETUP, params),
        toVideoCall: (params?: { appointmentId?: string; doctorName?: string }) =>
            navigate(ROUTES.VIDEO_CALL, params),
        toConsultationCompleted: (params?: { doctorName?: string }) =>
            navigate(ROUTES.CONSULTATION_COMPLETED, params),
        toAppointmentSummary: (params?: { appointmentId?: string }) =>
            navigate(ROUTES.APPOINTMENT_SUMMARY, params),

        toFavourites: () => navigate(ROUTES.FAVOURITES),

        toProfile: () => navigate(ROUTES.PROFILE),

        toEvents: () => navigate(ROUTES.ALL_EVENTS),

        toEventPreview: (params?: {
            id?: string;
            image?: string;
            title?: string;
            location?: string;
            date: string;
            attendees?: number;
        }) => {
            navigate(ROUTES.EVENTS_PREVIEW, params || {});
        },

        // ============================================
        // Paywall Navigation
        // ============================================
        toSubscription: () => navigate(ROUTES.SUBSCRIPTION),
        toOtp: () => navigate(ROUTES.OTP),
        toUpgradePlan: () => navigate(ROUTES.UPGRADE_PLAN),
        toPaymentSuccess: (params?: { plan?: string; amount?: string }) =>
            navigate(ROUTES.PAYMENT_SUCCESS, params),

        // ============================================
        // Profile Navigation (uncomment when routes are added)
        // ============================================
        // toProfile: () => navigate(ROUTES.PROFILE),
        // toUserProfile: (userId: string) =>
        //   navigate(ROUTES.USER_PROFILE, { userId }),
        // toEditProfile: () => navigate(ROUTES.EDIT_PROFILE),
        // toSettings: () => navigate(ROUTES.SETTINGS),
    };
};

// ============================================
// USAGE EXAMPLES
// ============================================
//
// Import in your components:
// --------------------------
// import { useAppRouter } from '@/config/router';
// import { ROUTES } from '@/constants/routes'; // If you need raw route strings
//
// const MyComponent = () => {
//   const router = useAppRouter();
//
//   // Use the clean methods
//   router.toHome();
//   router.toGalleryPreview({ id: '123', imageUrl: '...' });
//   router.back();
// };
//
// ============================================
//
// Example 1: Login Flow
// --------------------
// import { useAppRouter } from '@/config/router';
//
// const LoginScreen = () => {
//   const router = useAppRouter();
//
//   const handleLogin = async () => {
//     const success = await login(email, password);
//     if (success) {
//       router.toHome(); // ✅ Clean!
//     }
//   };
//
//   return (
//     <Button onPress={handleLogin}>Login</Button>
//   );
// };
//
//
// Example 2: Gallery Item
// ----------------------
// import { useAppRouter } from '@/config/router';
//
// const GalleryItem = ({ id, imageUrl, title }) => {
//   const router = useAppRouter();
//
//   const handlePress = () => {
//     router.toGalleryPreview({ id, imageUrl, title }); // ✅ With params!
//   };
//
//   return (
//     <TouchableOpacity onPress={handlePress}>
//       <Image source={{ uri: imageUrl }} />
//     </TouchableOpacity>
//   );
// };
//
//
// Example 3: Email Verification
// ----------------------------
// import { useAppRouter } from '@/config/router';
//
// const ForgotPasswordScreen = () => {
//   const router = useAppRouter();
//
//   const handleSendCode = (email: string) => {
//     router.toEmailVerification({ email }); // ✅ Pass email as param!
//   };
//
//   return (
//     <Button onPress={() => handleSendCode(email)}>
//       Send Code
//     </Button>
//   );
// };
//

// ============================================
//
// HOW TO ADD NEW ROUTES:
// ----------------------
// 1. Add route to constants/routes.ts:
//    SETTINGS: '/(profile)/screens/Settings',
//
// 2. Add navigation method here:
//    toSettings: () => navigate(ROUTES.SETTINGS),
//
// 3. Use in component:
//    router.toSettings();
//
// ===========================================
// ===========================================

//// HOW TO ADD NEW ROUTES WITH PARAMS AND QUERYPARAMS
// 1. Add Route to constants/routes.ts
//   YOUR_ROUTE: "/(group)/screens/YourScreen",

//// 2. config/router.ts
// return {
//   // Path param only
//   toYourRoute: (id: string) =>
//     navigate(`${ROUTES.YOUR_ROUTE}/${id}`),

//// Query params only
//   toYourRoute: (params: { key?: string }) =>
//     navigate(ROUTES.YOUR_ROUTE, params),

//// Both
//   toYourRoute: (id: string, params?: { key?: string }) =>
//     navigate(`${ROUTES.YOUR_ROUTE}/${id}`, params),
// };

// // 3. Use it
// router.toYourRoute('123');
// router.toYourRoute({ key: 'value' });
// router.toYourRoute('123', { key: 'value' });
