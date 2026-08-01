import { BackButton } from "@/components/BackButton";
import Button, { AppleButton, GoogleButton } from "@/components/Button";
import { FormInputField } from "@/components/forms";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { useLogin } from "@/features/auth/hooks/useAuth";
import { SignInValues, signInSchema } from "@/features/auth/validationSchema";
import { getApiErrorMessage } from "@/utils/apiError";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialValues: SignInValues = { email: "", password: "" };

export default function SignInScreen() {
  const router = useAppRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync: login } = useLogin();

  const handleGoogleSignIn = () => {
    Alert.alert(
      "Google Sign-In",
      "Social sign-in is not available in this build yet. Please use email and password."
    );
  };

  const handleAppleSignIn = () => {
    Alert.alert(
      "Apple Sign-In",
      Platform.OS === "ios"
        ? "Social sign-in is not available in this build yet. Please use email and password."
        : "Apple Sign-In is only available on iOS. Please use email and password."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BackButton onPress={() => router.toWelcome()} />

          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>
              Welcome Back!
            </Text>
            <Text style={styles.subtitle}>
              Great to see you again, sign in to your OHealth account.
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validate={toFormikValidate(signInSchema)}
            onSubmit={async (values, { setSubmitting }) => {
              setServerError(null);
              try {
                await login(values);
                router.toHome();
              } catch (err) {
                setServerError(getApiErrorMessage(err, "Invalid email or password."));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <View style={styles.form}>
                <View>
                  <View style={styles.inputGroup}>
                    <FormInputField
                      name="email"
                      icon="email"
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor="#9CA3AF"
                    />

                    <FormInputField
                      name="password"
                      icon="password"
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#9CA3AF"
                      rightIcon={
                        showPassword ? "eye-off-outline" : "eye-outline"
                      }
                      onRightIconPress={() => setShowPassword((v) => !v)}
                    />
                  </View>

                  {serverError ? (
                    <Text style={styles.serverErrorText}>{serverError}</Text>
                  ) : null}

                  <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => router.toForgotPassword()}
                  >
                    <Text style={styles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={styles.submitBtn}
                >
                  {isSubmitting ? "Signing In…" : "Sign In →"}
                </Button>

                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.divider} />
                </View>

                <View>
                  <View style={styles.socialBtnGroup}>
                    <GoogleButton onPress={handleGoogleSignIn} />
                    <AppleButton onPress={handleAppleSignIn} />
                  </View>
                  <TouchableOpacity
                    style={styles.footerLink}
                    onPress={() => router.toSignUp()}
                  >
                    <Text style={styles.footerText}>
                      Don't have an account?{" "}
                      <Text style={styles.link}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContent: { padding: 16 },
  header: { marginBlock: 12 },
  title: {
    fontSize: 26,
    marginBottom: 8,
    lineHeight: 26,
    color: "#161A1D",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 12.5,
    lineHeight: 12.5,
    letterSpacing: -0.2,
  },
  form: { width: "100%", marginTop: 11, gap: 16 },
  inputGroup: { gap: 12, marginBottom: 16 },
  serverErrorText: {
    color: Colors.red500,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  forgotPassword: { alignSelf: "flex-end", marginTop: 4 },
  linkText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.5,
  },
  submitBtn: { marginVertical: 0 },
  socialBtnGroup: { gap: 12 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#D2D6DB" },
  orText: {
    marginHorizontal: 16,
    color: "#9DA4AE",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.2,
  },
  footerLink: { marginTop: 24, alignItems: "center" },
  footerText: {
    fontSize: 14,
    color: "#6C737F",
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: -0.5,
  },
  link: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    lineHeight: 14,
    letterSpacing: -0.5,
  },
});
