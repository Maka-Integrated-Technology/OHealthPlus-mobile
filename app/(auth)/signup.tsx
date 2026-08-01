import { BackButton } from "@/components/BackButton";
import Button, { AppleButton, GoogleButton } from "@/components/Button";
import { FormCheckboxField, FormInputField } from "@/components/forms";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { useSignup } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/features/auth/types/auth";
import {
  SignUpValues,
  signUpSchema,
  splitFullName,
} from "@/features/auth/validationSchema";
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

const initialValues: SignUpValues = {
  role: "PATIENT",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreetoTerms: false,
};

export default function SignUpScreen() {
  const router = useAppRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync: signUp } = useSignup();

  const handleGoogleSignUp = () => {
    Alert.alert(
      "Google Sign-Up",
      "Social sign-in is not available in this build yet. Please create an account with email and password."
    );
  };

  const handleAppleSignUp = () => {
    Alert.alert(
      "Apple Sign-In",
      Platform.OS === "ios"
        ? "Social sign-in is not available in this build yet. Please create an account with email and password."
        : "Apple Sign-In is only available on iOS. Please create an account with email and password."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BackButton onPress={() => router.toWelcome()} />

          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>
              Create Your Account
            </Text>
            <Text style={styles.subtitle}>
              Enter your info to create your OHealth account today.
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validate={toFormikValidate(signUpSchema)}
            onSubmit={async (values, { setSubmitting }) => {
              setServerError(null);
              try {
                const parts = splitFullName(values.name);
                if (!parts) {
                  setServerError("Please enter your first and last name.");
                  return;
                }
                await signUp({
                  first_name: parts.first_name,
                  last_name: parts.last_name,
                  email: values.email,
                  password: values.password,
                  role: [values.role as UserRole],
                });
                router.toEmailVerification({
                  email: values.email,
                  mode: "signup",
                });
              } catch (err) {
                setServerError(getApiErrorMessage(err));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <View style={styles.form}>
                {/* Role selector: This is commented out because I am not sure if we will need it for the onboarding */}
                {/* <View style={styles.roleSelector}>
                  {(["PATIENT", "DOCTOR"] as const).map((r) => (
                    <Pressable
                      key={r}
                      style={[
                        styles.roleBtn,
                        values.role === r && styles.roleBtnActive,
                      ]}
                      onPress={() => setFieldValue("role", r)}
                    >
                      <Text
                        style={[
                          styles.roleBtnText,
                          values.role === r && styles.roleBtnTextActive,
                        ]}
                      >
                        {r === "PATIENT" ? "Patient" : "Healthcare Professional"}
                      </Text>
                    </Pressable>
                  ))}
                </View> */}

                <View style={styles.inputGroup}>
                  <FormInputField
                    name="name"
                    icon="name"
                    placeholder="Name"
                    autoCapitalize="words"
                    placeholderTextColor="#9CA3AF"
                  />

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
                    rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                    onRightIconPress={() => setShowPassword((v) => !v)}
                  />

                  <FormInputField
                    name="confirmPassword"
                    icon="password"
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#9CA3AF"
                    rightIcon={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    onRightIconPress={() => setShowConfirmPassword((v) => !v)}
                  />
                </View>

                <FormCheckboxField name="agreetoTerms">
                  <Text style={styles.termsText}>
                    I agree to our{" "}
                    <Text
                      style={styles.link}
                      onPress={() => router.toLegalTerms({ param: "terms" })}
                    >
                      Terms & Conditions
                    </Text>{" "}
                    and{" "}
                    <Text
                      style={styles.link}
                      onPress={() => router.toLegalTerms({ param: "privacy" })}
                    >
                      Privacy Policy
                    </Text>
                    .
                  </Text>
                </FormCheckboxField>

                {serverError ? (
                  <Text style={styles.serverErrorText}>{serverError}</Text>
                ) : null}

                <Button
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={styles.submitBtn}
                >
                  {isSubmitting ? "Creating Account…" : "Sign Up →"}
                </Button>

                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.divider} />
                </View>

                <View>
                  <View style={styles.socialBtnGroup}>
                    <GoogleButton onPress={handleGoogleSignUp} />
                    <AppleButton onPress={handleAppleSignUp} />
                  </View>
                  <TouchableOpacity
                    style={styles.footerLink}
                    onPress={() => router.push(ROUTES.SIGN_IN)}
                  >
                    <Text style={styles.footerText}>
                      Already have an account?{" "}
                      <Text style={styles.link}>Sign In</Text>
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
    lineHeight: 15,
    letterSpacing: -0.2,
  },
  form: { width: "100%", marginTop: 11, gap: 16 },
  // Role segmented control
  roleSelector: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#F3F4F6",
    padding: 4,
    borderRadius: 12,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  roleBtnActive: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  roleBtnText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  roleBtnTextActive: {
    color: Colors.primary,
    fontWeight: "600",
  },
  inputGroup: { gap: 12 },
  termsText: {
    fontSize: 14,
    color: "#6C737F",
    fontWeight: "400",
    lineHeight: 16.8,
    letterSpacing: -0.5,
  },
  link: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    lineHeight: 16.8,
    letterSpacing: -0.5,
  },
  serverErrorText: {
    color: Colors.red500,
    fontSize: 13,
    marginTop: -4,
  },
  submitBtn: { marginVertical: 0 },
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
  socialBtnGroup: { gap: 12 },
  footerLink: { marginTop: 24, alignItems: "center" },
  footerText: {
    fontSize: 14,
    color: "#6C737F",
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: -0.5,
  },
});
