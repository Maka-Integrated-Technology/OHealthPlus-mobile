import { BackButton } from '@/components/BackButton';
import Button from '@/components/Button';
import { InputField } from '@/components/InputField';
import { Text } from '@/components/Text';
import Colors from '@/constants/Colors';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      setError(true);
      return;
    }
    setError(false);
    // TODO: call your API to send verification code
    // await sendVerificationCode(email);
    router.push({ pathname: ROUTES.EMAIL_VERIFICATION, params: { email } });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <BackButton onPress={() => router.back()} />

        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter the email address linked to your Healthbridge account.
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            icon="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={(text) => { setEmail(text); setError(false); }}
            error={error}
          />
          {error && (
            <Text style={styles.errorText}>Please enter a valid email address</Text>
          )}
        </View>

        <Button onPress={handleSendCode}>
          Send Code
        </Button>
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
  title: { fontSize: 26, fontWeight: '600', color: Colors.black100, marginBottom: 8, letterSpacing: -0.8, lineHeight: 28.6 },
  subtitle: { fontSize: 14, fontWeight: '400', color: Colors.black80, lineHeight: 16.8, letterSpacing: -0.5 },
  form: { gap: 8, marginBottom: 16, marginTop: 11 },
  errorText: { fontSize: 12, color: Colors.red500, marginTop: 4 },
});
