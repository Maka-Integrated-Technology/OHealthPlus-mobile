import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import { FormInputField } from "@/components/forms";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import {
  ForgotPasswordValues,
  forgotPasswordSchema,
} from "@/features/auth/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const initialValues: ForgotPasswordValues = { email: "" };

export default function ForgotPasswordScreen() {
  const router = useRouter();

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
            Forgot Password?
          </Text>
          <Text style={styles.subtitle}>
            Enter the email address linked to your Healthbridge account.
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validate={toFormikValidate(forgotPasswordSchema)}
          onSubmit={(values) => {
            // TODO: call API to send verification code
            router.push({
              pathname: ROUTES.EMAIL_VERIFICATION,
              params: { email: values.email },
            });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View style={styles.form}>
              <FormInputField
                name="email"
                icon="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                placeholderTextColor="#9CA3AF"
              />

              <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                Send Code
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
  form: { gap: 16, marginTop: 11 },
});
