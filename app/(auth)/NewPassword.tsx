import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import { FormInputField } from "@/components/forms";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { useResetPassword } from "@/features/auth/hooks/useAuth";
import {
  NewPasswordValues,
  newPasswordSchema,
} from "@/features/auth/validationSchema";
import { getApiErrorMessage } from "@/utils/apiError";
import { toFormikValidate } from "@/utils/formikZod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const initialValues: NewPasswordValues = { password: "", confirmPassword: "" };

export default function NewPasswordScreen() {
  const router = useRouter();
  const { token, email: _email } = useLocalSearchParams<{
    token: string;
    email?: string;
  }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync: resetPassword } = useResetPassword();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton onPress={() => router.back()} />

        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>
            New Password
          </Text>
          <Text style={styles.subtitle}>
            Enter your new password to successfully reset it.
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validate={toFormikValidate(newPasswordSchema)}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError(null);
            try {
              await resetPassword({
                token: token ?? "",
                newPassword: values.password,
              });
              router.push(ROUTES.PASSWORD_SUCCESS);
            } catch (err) {
              setServerError(getApiErrorMessage(err));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View style={styles.form}>
              <FormInputField
                name="password"
                icon="password"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#9CA3AF"
                rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowPassword((v) => !v)}
              />

              <FormInputField
                name="confirmPassword"
                icon="password"
                placeholder="Re-enter password"
                secureTextEntry={!showConfirm}
                placeholderTextColor="#9CA3AF"
                rightIcon={showConfirm ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowConfirm((v) => !v)}
              />

              {serverError ? (
                <Text style={styles.errorText}>{serverError}</Text>
              ) : null}

              <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                {isSubmitting ? "Resetting…" : "Reset Password"}
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: { marginBlock: 12 },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: Colors.black100,
    marginBottom: 8,
    letterSpacing: -0.8,
    lineHeight: 28.6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.black80,
    lineHeight: 16.8,
    letterSpacing: -0.5,
  },
  form: { gap: 12, marginTop: 11 },
  errorText: { fontSize: 13, color: Colors.red500, marginTop: -4 },
});
