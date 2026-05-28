import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { InputField } from "@/components/InputField";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function PersonalInformationScreen() {
  const router = useAppRouter();

  const [name, setName] = useState("Olivia Jane");
  const [email, setEmail] = useState("janebetty@gmail.com");
  const [phone, setPhone] = useState("+234 801 234 5678");

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Personal Information" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text weight="medium" style={styles.fieldLabel}>
                Full Name
              </Text>
              <InputField
                icon="name"
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text weight="medium" style={styles.fieldLabel}>
                Email Address
              </Text>
              <InputField
                icon="email"
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text weight="medium" style={styles.fieldLabel}>
                Phone Number
              </Text>
              <InputField
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Save button */}
          <View style={styles.buttonWrapper}>
            <Button onPress={() => {}}>Save Changes</Button>
          </View>
        </ScrollView>
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
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    lineHeight: 15.6,
    letterSpacing: -0.3,
    color: Colors.black100,
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
