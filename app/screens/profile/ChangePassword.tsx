import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useChangePassword } from "@/features/auth/hooks/useAuth";
import {
  ChangePasswordValues,
  changePasswordSchema,
} from "@/features/auth/validationSchema";
import { useAppRouter } from "@/config/route";
import { clearAuthStorage } from "@/utils/secureStorage";
import { queryClient } from "@/config/queryClient";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { getApiErrorMessage } from "@/utils/apiError";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
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
  const router = useAppRouter();
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (
    values: ChangePasswordValues,
    helpers: { resetForm: () => void }
  ) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      // Backend revokes every active session on success — treat as a forced
      // logout: clear local auth, drop the cached profile, route to sign-in.
      await clearAuthStorage();
      queryClient.removeQueries({ queryKey: QUERY_KEYS.auth.me });
      helpers.resetForm();
      Alert.alert(
        "Password updated",
        "Your password has been changed. Please sign in again."
      );
      router.toSignIn();
    } catch (err) {
      Alert.alert("Couldn't update password", getApiErrorMessage(err));
    }
  };

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
          onSubmit={handleSubmit}
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
                  a mix of letters, numbers, and symbols. After changing your
                  password you'll be signed out everywhere and need to sign in
                  again.
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

              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => handleSubmit()}
                  isLoading={isPending || isSubmitting}
                >
                  Update Password
                </Button>
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
});
