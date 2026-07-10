import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import {
  ChangePasswordValues,
  changePasswordSchema,
} from "@/features/auth/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const initialValues: ChangePasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordScreen() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Change Password" />

        <Formik
          initialValues={initialValues}
          validate={toFormikValidate(changePasswordSchema)}
          onSubmit={() => {}}
        >
          {({ handleSubmit, isSubmitting }) => (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Helper text */}
              <View style={styles.helperCard}>
                <Text weight="regular" style={styles.helperText}>
                  Your new password should be at least 8 characters and include
                  a mix of letters, numbers, and symbols.
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <FormInputField
                  name="currentPassword"
                  label="Current Password"
                  icon="password"
                  placeholder="Current Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showCurrent}
                  rightIcon={showCurrent ? "eye-off-outline" : "eye-outline"}
                  onRightIconPress={() => setShowCurrent((v) => !v)}
                />

                <FormInputField
                  name="newPassword"
                  label="New Password"
                  icon="password"
                  placeholder="New Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showNew}
                  rightIcon={showNew ? "eye-off-outline" : "eye-outline"}
                  onRightIconPress={() => setShowNew((v) => !v)}
                />

                <FormInputField
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  icon="password"
                  placeholder="Confirm New Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirm}
                  rightIcon={showConfirm ? "eye-off-outline" : "eye-outline"}
                  onRightIconPress={() => setShowConfirm((v) => !v)}
                />
              </View>

              {/* Update button — disabled: backend does not expose an
                  authenticated change-password endpoint yet. */}
              <View style={styles.buttonWrapper}>
                <Button onPress={() => handleSubmit()} isLoading={isSubmitting}>
                  Update Password
                </Button>
                <Text weight="regular" style={styles.unavailableNote}>
                  Password changes from within the app are not available yet.
                  Use the forgot-password flow to reset it.
                </Text>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
    gap: 20,
  },
  helperCard: {
    backgroundColor: Colors.lightBlue2,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  helperText: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.neutral,
  },
  form: {
    gap: 16,
  },
  buttonWrapper: {
    gap: 8,
  },
  unavailableNote: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral400,
    textAlign: "center",
  },
});
