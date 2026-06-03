import { BackButton } from "@/components/BackButton";
import Button, { AppleButton, GoogleButton } from "@/components/Button";
import { FormCheckboxField, FormInputField } from "@/components/forms";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { SignUpValues, signUpSchema } from "@/features/auth/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialValues: SignUpValues = {
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
          <BackButton />

          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>
              Create Your Account
            </Text>
            <Text style={styles.subtitle}>
              Enter your info to create your HealthBridge account today.
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validate={toFormikValidate(signUpSchema)}
            onSubmit={() => {
              router.toOtp();
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <FormInputField
                    name="name"
                    icon="name"
                    placeholder="Name"
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

                <Button
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={styles.submitBtn}
                >
                  Sign Up →
                </Button>

                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.divider} />
                </View>

                <View>
                  <View style={styles.socialBtnGroup}>
                    <GoogleButton onPress={() => {}} />
                    <AppleButton onPress={() => {}} />
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
