import { CustomTabBar } from "@/components/CustomTabbar";
import { ROUTES } from "@/constants/routes";
import { useGetMe } from "@/features/auth/hooks/useAuth";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

/**
 * Tabs layout — guards every tab screen behind a *valid* session.
 * On cold start we fetch the current user (`/auth/me`); a 401 (expired/revoked
 * token) surfaces as `isError` and redirects to sign-in. The axios response
 * interceptor handles 401s that happen mid-session.
 */
export default function TabLayout() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (isError) {
      router.replace(ROUTES.SIGN_IN as never);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  // Errored / unauthenticated: render nothing while the redirect above runs.
  if (isError || !user) {
    return null;
  }

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
