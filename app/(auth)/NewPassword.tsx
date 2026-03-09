import { BackButton } from '@/components/BackButton';
import Button from '@/components/Button';
import { InputField } from '@/components/InputField';
import { Text } from '@/components/Text';
import Colors from '@/constants/Colors';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({ password: false, confirm: false });

  const validate = () => {
    const newErrors = { password: false, confirm: false };
    if (!password || password.length < 8) newErrors.password = true;
    if (password !== confirmPassword) newErrors.confirm = true;
    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirm;
  };

  const handleReset = async () => {
    if (!validate()) return;
    // TODO: call your API to reset password
    // await resetPassword(newPassword);
    router.push(ROUTES.PASSWORD_SUCCESS);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <BackButton onPress={() => router.back()} />

        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>
            Enter your new password to successfully reset it.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <InputField
              icon="password"
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => { setPassword(t); setErrors(e => ({ ...e, password: false })); }}
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(v => !v)}
              error={errors.password}
            />
            {errors.password && (
              <Text style={styles.errorText}>Password must be at least 8 characters</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <InputField
              icon="password"
              placeholder="Re-enter password"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setErrors(e => ({ ...e, confirm: false })); }}
              rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowConfirm(v => !v)}
              error={errors.confirm}
            />
            {errors.confirm && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>
        </View>

        <Button onPress={handleReset}>
          Reset Password
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
  form: { gap: 12, marginBottom: 16, marginTop: 11 },
  errorText: { fontSize: 12, color: Colors.red500, marginTop: 4 },
  fieldGroup: { gap: 8 },
});
