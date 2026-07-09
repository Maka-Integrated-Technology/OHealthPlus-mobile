import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useGetMe } from "@/features/auth/hooks/useAuth";
import {
  PersonalInfoValues,
  personalInfoSchema,
} from "@/features/profile/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function PersonalInformationScreen() {
  const router = useAppRouter();
  const { data: user, isLoading, isError, refetch } = useGetMe();

  const initialValues: PersonalInfoValues = {
    name: user
      ? `${user.first_name} ${user.last_name}`.trim()
      : "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  };

  if (isLoading) {
    return (
      <Screen>
        <DetailHeader title="Personal Information" />
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <DetailHeader title="Personal Information" />
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load profile.
          </Text>
          <Text
            weight="medium"
            style={styles.retryText}
            onPress={() => refetch()}
          >
            Tap to retry
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Personal Information" />

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validate={toFormikValidate(personalInfoSchema)}
          onSubmit={(values) => {
            // TODO: call API to save personal information.
            // Backend does not currently expose an update-me endpoint.
            console.log("Save personal info:", values);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Form */}
              <View style={styles.form}>
                <FormInputField
                  name="name"
                  label="Full Name"
                  icon="name"
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                />

                <FormInputField
                  name="email"
                  label="Email Address"
                  icon="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />

                <FormInputField
                  name="phone"
                  label="Phone Number"
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Divider */}
              <View style={styles.sectionDivider} />

              {/* Change Password row */}
              <TouchableOpacity
                style={styles.changePasswordRow}
                onPress={() => router.toChangePassword()}
                activeOpacity={0.7}
              >
                <View style={styles.changePasswordLeft}>
                  <View style={styles.lockIconWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={Colors.primary}
                    />
                  </View>
                  <Text weight="medium" style={styles.changePasswordLabel}>
                    Change Password
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={Colors.neutral300}
                />
              </TouchableOpacity>

              {/* Save button */}
              <View style={styles.buttonWrapper}>
                <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                  Save Changes
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: Colors.neutral,
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: Colors.primary,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
    gap: 16,
  },
  form: {
    gap: 16,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.homeneutral,
    marginVertical: 4,
  },
  changePasswordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  changePasswordLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lockIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightBlue2,
    alignItems: "center",
    justifyContent: "center",
  },
  changePasswordLabel: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
