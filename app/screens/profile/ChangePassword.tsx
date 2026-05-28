import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { InputField } from "@/components/InputField";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Helper text */}
          <View style={styles.helperCard}>
            <Text weight="regular" style={styles.helperText}>
              Your new password should be at least 8 characters and include a
              mix of letters, numbers, and symbols.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text weight="medium" style={styles.fieldLabel}>
                Current Password
              </Text>
              <InputField
                icon="password"
                placeholder="Current Password"
                secureTextEntry={!showCurrent}
                rightIcon={showCurrent ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowCurrent(!showCurrent)}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text weight="medium" style={styles.fieldLabel}>
                New Password
              </Text>
              <InputField
                icon="password"
                placeholder="New Password"
                secureTextEntry={!showNew}
                rightIcon={showNew ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowNew(!showNew)}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text weight="medium" style={styles.fieldLabel}>
                Confirm New Password
              </Text>
              <InputField
                icon="password"
                placeholder="Confirm New Password"
                secureTextEntry={!showConfirm}
                rightIcon={showConfirm ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowConfirm(!showConfirm)}
              />
            </View>
          </View>

          <Button onPress={() => {}}>Update Password</Button>
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
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    lineHeight: 15.6,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
});
