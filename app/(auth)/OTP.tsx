import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { otpCodeSchema } from "@/features/auth/validationSchema";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CODE_LENGTH = 5;

export default function OTPScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    const result = otpCodeSchema.safeParse({ code });
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Please enter the complete 5-digit code",
      );
      return;
    }
    setError("");
    // TODO: verify OTP with API
    router.replace(ROUTES.HOME);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BackButton />

        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>
            Enter Verification Code
          </Text>
          <Text style={styles.subtitle}>
            Enter the verification code sent via email to your mail.
          </Text>
        </View>

        <View style={styles.otpRow}>
          {Array(CODE_LENGTH)
            .fill(0)
            .map((_, i) => (
              <View
                key={i}
                style={[
                  styles.otpBox,
                  code[i] ? styles.otpBoxActive : null,
                  error ? styles.otpBoxError : null,
                ]}
              >
                <Text weight="bold" style={styles.otpText}>
                  {code[i] || ""}
                </Text>
              </View>
            ))}
          {/* Hidden input to handle keyboard */}
          <TextInput
            value={code}
            onChangeText={(val) => {
              if (val.length <= CODE_LENGTH) {
                setCode(val.replace(/[^0-9]/g, ""));
                setError("");
              }
            }}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            style={styles.hiddenInput}
            autoFocus
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View>
          <Button onPress={handleVerify} style={styles.verifyBtn}>
            Verify
          </Button>
          <TouchableOpacity>
            <Text style={styles.resendText}>
              No Code Received? <Text style={styles.link}>Resend Code</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { padding: 24 },
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
    lineHeight: 12.5,
    letterSpacing: -0.2,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
    marginTop: 11,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxActive: { borderColor: Colors.primary, borderWidth: 2 },
  otpBoxError: { borderColor: Colors.red500, borderWidth: 1.5 },
  otpText: { fontSize: 24 },
  hiddenInput: { ...StyleSheet.absoluteFillObject, opacity: 0 },
  errorText: {
    fontSize: 13,
    color: Colors.red500,
    marginBottom: 12,
    marginTop: 4,
  },
  verifyBtn: { width: "100%", marginBottom: 16 },
  resendText: {
    fontSize: 14,
    color: "#6C737F",
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: -0.5,
  },
  link: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    lineHeight: 16.8,
    letterSpacing: -0.5,
  },
});
