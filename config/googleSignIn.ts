import { GoogleSignin } from "@react-native-google-signin/google-signin";

let configured = false;

/**
 * webClientId must be the same OAuth Web client ID the backend verifies
 * ID token audiences against (GOOGLE_CLIENT_ID) — it's what makes the
 * native-issued idToken acceptable to the shared /auth/google-login route,
 * not an Android/iOS-specific client.
 */
export function configureGoogleSignIn() {
  if (configured) return;
  configured = true;

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    offlineAccess: false,
  });
}
