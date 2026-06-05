import { ConfigContext, ExpoConfig } from "expo/config";

const APP_VARIANT = process.env.APP_VARIANT ?? "production";
const IS_DEV = APP_VARIANT === "development";
const IS_PREVIEW = APP_VARIANT === "preview";

const PROJECT_ID = "6925669e-29f1-4aec-aed2-11be70a1a138";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.ohealth.healthbridge.dev";
  if (IS_PREVIEW) return "com.ohealth.healthbridge.preview";
  return "com.ohealth.healthbridge";
};

const getAppName = () => {
  if (IS_DEV) return "Health Bridge (Dev)";
  if (IS_PREVIEW) return "Health Bridge (Preview)";
  return "Health Bridge";
};

const getAppScheme = () => {
  if (IS_DEV) return "healthbridge-dev";
  if (IS_PREVIEW) return "healthbridge-preview";
  return "healthbridge";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "health-bridge",
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
