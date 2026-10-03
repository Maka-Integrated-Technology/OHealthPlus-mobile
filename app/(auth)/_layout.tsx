import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "onboarding",
};

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="EmailVerification" />
      <Stack.Screen name="NewPassword" />
      <Stack.Screen name="PasswordResetSuccess" />
      <Stack.Screen name="legalTerm" />
    </Stack>
  );
}
