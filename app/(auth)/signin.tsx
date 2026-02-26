import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import Button, { AppleButton, GoogleButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { Text } from '@/components/Text';
import Colors from "@/constants/Colors";
import { ROUTES } from '@/constants/routes';

export default function SignInScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.TABS);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BackButton onPress={handleBack} />

          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Great to see you again, sign in to your HealthBridge account.</Text>
          </View>

          <View style={styles.form}>
            <View>
              <View style={styles.inputGroup}>
                <InputField
                  icon="mail-outline"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!error}
                />
                <InputField
                  icon="lock-closed-outline"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                  onRightIconPress={() => setShowPassword(!showPassword)}
                  error={!!error}
                />
              </View>
              {error && <Text style={styles.errorText}>{error}</Text>}
              <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Button onPress={() => router.replace(ROUTES.TABS)} style={styles.submitBtn}>Sign In →</Button>
            
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            <View>
              <View style={styles.socialBtnGroup}>
                <GoogleButton onPress={() => {}} />
                <AppleButton onPress={() => {}} />
              </View>
              <TouchableOpacity style={styles.footerLink} onPress={() => router.push(ROUTES.SIGN_UP)}>
                <Text style={styles.footerText}>Don't have an account? <Text style={styles.link}>Sign Up</Text></Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: { padding: 16 },
  header: { marginBlock: 12 },
  title: { fontSize: 26, marginBottom: 8, lineHeight: 26, color: '#161A1D', letterSpacing: -0.5 },
  subtitle: { color: '#6B7280', fontSize: 12.5, lineHeight: 12.5, letterSpacing: -0.2 },
  form: { width: '100%', marginTop: 11, gap: 16},
  inputGroup: { gap: 12, marginBottom: 16,  },
  errorText: { color: Colors.red500, fontSize: 13, marginBottom: 16, marginTop: -8 },
  forgotPassword: { alignSelf: 'flex-end' },
  linkText: { color: Colors.primary, fontWeight: '600', fontSize: 14, lineHeight: 18, letterSpacing: -0.5 },
  submitBtn: { marginVertical: 0 },
  socialBtnGroup: { gap: 12 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  divider: { flex: 1, height: 1, backgroundColor: '#D2D6DB' },
  orText: { marginHorizontal: 16, color: '#9DA4AE', fontSize: 16, lineHeight: 16, letterSpacing: -0.2  },
  footerLink: { marginTop: 24, alignItems: 'center' },
  footerText: {fontSize: 14, color: '#6C737F', fontWeight: '400', lineHeight: 14, letterSpacing: -0.5 },
  link: { fontSize: 14, color: Colors.primary, fontWeight: '600', lineHeight: 14, letterSpacing: -0.5 }
});
