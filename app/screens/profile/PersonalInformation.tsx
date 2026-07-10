import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useGetMe } from "@/features/auth/hooks/useAuth";
import {
  PersonalInfoValues,
  personalInfoSchema,
} from "@/features/profile/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function PersonalInformationScreen() {
  const { data: user, isLoading, isError, refetch } = useGetMe();

  const initialValues: PersonalInfoValues = {
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
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
          onSubmit={() => {}}
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
                  name="first_name"
                  label="First Name"
                  icon="name"
                  placeholder="First Name"
                  placeholderTextColor="#9CA3AF"
                />

                <FormInputField
                  name="last_name"
                  label="Last Name"
                  icon="name"
                  placeholder="Last Name"
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

              {/* Save button — disabled: backend does not expose an update-profile endpoint yet. */}
              <View style={styles.buttonWrapper}>
                <Button onPress={() => handleSubmit()} isLoading={isSubmitting}>
                  Save Changes
                </Button>
                <Text weight="regular" style={styles.unavailableNote}>
                  Profile editing is not available yet.
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
    gap: 8,
  },
  unavailableNote: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral400,
    textAlign: "center",
  },
});
