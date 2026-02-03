import { BackButton } from '@/components/BackButton';
import Button from '@/components/Button';
import { Text } from '@/components/Text';
import Colors from "@/constants/Colors";
import { ROUTES } from '@/constants/routes';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const codeLength = 5;

    const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.TABS);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BackButton onPress={handleBack} />

        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>Enter the verification code sent via email to your mail.</Text>
        </View>

        <View style={styles.otpRow}>
          {Array(codeLength).fill(0).map((_, i) => (
            <View key={i} style={[styles.otpBox, code[i] ? styles.otpBoxActive : null]}>
              <Text weight="bold" style={styles.otpText}>{code[i] || ""}</Text>
            </View>
          ))}
          {/* Hidden input to handle keyboard */}
          <TextInput
            value={code}
            onChangeText={(val) => val.length <= codeLength && setCode(val)}
            keyboardType="number-pad"
            maxLength={codeLength}
            style={styles.hiddenInput}
            autoFocus
          />
        </View>

        <View>
          <Button onPress={() => router.replace(ROUTES.TABS)} style={styles.verifyBtn}>Verify</Button>
          <TouchableOpacity>
            <Text style={styles.resendText}>No Code Received? <Text style={styles.link}>Resend Code</Text></Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { padding: 24, },
  header: { marginBlock: 12 },
  title: { fontSize: 26, marginBottom: 8, lineHeight: 26, color: '#161A1D', letterSpacing: -0.5 },
  subtitle: { color: '#6B7280', fontSize: 12.5, lineHeight: 12.5, letterSpacing: -0.2 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16, marginTop: 11 },
  otpBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#F9FAFB', borderWidth: 0.5, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  otpBoxActive: { borderColor: Colors.primary, borderWidth: 2 },
  otpText: { fontSize: 24 },
  hiddenInput: { ...StyleSheet.absoluteFillObject, opacity: 0 },
  verifyBtn: { width: '100%', marginBottom: 16 },
  resendText: {fontSize: 14, color: '#6C737F', fontWeight: '400', lineHeight: 14, letterSpacing: -0.5 },
  link: { fontSize: 14, color: Colors.primary, fontWeight: '600', lineHeight: 16.8, letterSpacing: -0.5 },
});