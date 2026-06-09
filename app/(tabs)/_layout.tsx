import { CustomTabBar } from "@/components/CustomTabbar";
import { ROUTES } from "@/constants/routes";
import { hasToken } from "@/utils/secureStorage";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";

/**
 * Tabs layout — guards every tab screen behind authentication.
 * If no access token is found in SecureStore the user is redirected to
 * sign-in. This runs once on mount; logout flows handle their own redirect.
 */
export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    hasToken().then((authenticated) => {
      if (!authenticated) {
        router.replace(ROUTES.SIGN_IN as any);
      }
    });
  }, []);

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FCFCFC",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="appointments" options={{ headerShown: false }} />
      <Tabs.Screen name="messages" options={{ headerShown: false }} />
      <Tabs.Screen name="tests" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
