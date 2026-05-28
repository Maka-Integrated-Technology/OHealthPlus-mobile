import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import {
  PersonalInfoValues,
  personalInfoSchema,
} from "@/features/profile/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const initialValues: PersonalInfoValues = {
  name: "Olivia Jane",
  email: "janebetty@gmail.com",
  phone: "+234 801 234 5678",
};

export default function PersonalInformationScreen() {
  const router = useAppRouter();

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Personal Information" />

        <Formik
          initialValues={initialValues}
          validate={toFormikValidate(personalInfoSchema)}
          onSubmit={(values) => {
            // TODO: call API to save personal information
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
