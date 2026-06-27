import { ConfigContext, ExpoConfig } from "expo/config";

const APP_VARIANT = process.env.APP_VARIANT ?? "production";
const IS_DEV = APP_VARIANT === "development";
const IS_PREVIEW = APP_VARIANT === "preview";

const PROJECT_ID = "46030814-1813-4aaf-b866-0abca2226b63";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.ohealth.patientapp.dev";
  if (IS_PREVIEW) return "com.ohealth.patientapp.preview";
  return "com.ohealth.patientapp";
};

const getAppName = () => {
  if (IS_DEV) return "OHealth Patient App (Dev)";
  if (IS_PREVIEW) return "OHealth Patient App (Preview)";
  return "OHealth Patient App";
};

const getAppScheme = () => {
  if (IS_DEV) return "ohealth-dev";
  if (IS_PREVIEW) return "ohealth-preview";
  return "ohealth";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "ohealth-patient-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icons/logo.png",
  scheme: getAppScheme(),
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/icons/logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    infoPlist: {
      CFBundleDisplayName: getAppName(),
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icons/logo.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-web-browser",
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "16.4",
          newArchEnabled: true,
        },
        android: {
          minSdkVersion: 24,
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          newArchEnabled: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    appVariant: APP_VARIANT,
    eas: {
      projectId: PROJECT_ID,
    },
  },
  updates: {
    url: `https://u.expo.dev/${PROJECT_ID}`,
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  owner: "ohealth",
});
