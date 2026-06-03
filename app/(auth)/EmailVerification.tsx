import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { otpCodeSchema } from "@/features/auth/validationSchema";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CODE_LENGTH = 5;

export default function VerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...code];
    updated[index] = digit;
    setCode(updated);
    setError("");
    if (digit && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (!digit && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    const result = otpCodeSchema.safeParse({ code: fullCode });
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Please enter the complete 5-digit code",
      );
      return;
    }
    setError("");
    // TODO: verify code with API
    router.push(ROUTES.NEW_PASSWORD);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    // TODO: resend code
    setResendTimer(30);
    setCode(Array(CODE_LENGTH).fill(""));
    inputs.current[0]?.focus();
  };

  const maskedEmail = email
    ? email.replace(
        /(.{2})(.*)(@.*)/,
        (_, a, b, c) => a + "*".repeat(Math.min(b.length, 4)) + c,
      )
    : "";

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
            Enter Verification Code
          </Text>
          <Text style={styles.subtitle}>
            Enter the verification code sent to your email
            {maskedEmail ? ` ${maskedEmail}` : ""}.
          </Text>
        </View>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              style={[
                styles.codeBox,
                digit ? styles.codeBoxFilled : null,
                error ? styles.codeBoxError : null,
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button onPress={handleVerify} style={styles.button}>
          Verify
        </Button>

        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>No Code Received?</Text>
          <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
            <Text
              style={[
                styles.resendText,
                resendTimer > 0 && styles.resendDisabled,
              ]}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>
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
  codeRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 11,
  },
  codeBox: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 59,
    height: 59,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: Colors.neutral200,
    backgroundColor: Colors.neutral50,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black200,
    lineHeight: 20,
    letterSpacing: -0.8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  codeBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightBlue,
  },
  codeBoxError: {
    borderColor: Colors.red500,
  },
  errorText: { fontSize: 13, color: Colors.red500, marginBottom: 8 },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  resendLabel: {
    fontFamily: "Inter",
    fontSize: 14,
    color: Colors.neutral600,
    fontWeight: "400",
    lineHeight: 16.8,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  resendText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  resendDisabled: { color: Colors.neutral600 },
  button: {},
});
