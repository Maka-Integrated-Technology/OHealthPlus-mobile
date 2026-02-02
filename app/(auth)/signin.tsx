import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button, { AppleButton, GoogleButton } from '@/components/Button';
import { Text } from '@/components/Text';
import Colors from "@/constants/Colors";

export default function SignInScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color="black" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Great to see you again, sign in to your HealthBridge account.</Text>
          </View>

          <View style={styles.form}>
            <View>
              <View style={styles.inputGroup}>
                <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                  <Ionicons name="mail-outline" size={24} color="#4D5761" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                  />
                </View>
                <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={24} color="#4D5761" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#4D5761" />
                  </TouchableOpacity>
                </View>
              </View>
              {error && <Text style={styles.errorText}>{error}</Text>}
              <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Button onPress={() => router.replace('/(tabs)')} style={styles.submitBtn}>Sign In →</Button>
            
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
              <TouchableOpacity style={styles.footerLink} onPress={() => router.push('/(auth)/signup')}>
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
  backButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#155EEF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  header: { marginBlock: 12 },
  title: { fontSize: 26, marginBottom: 8, lineHeight: 26, color: '#161A1D', letterSpacing: -0.5 },
  subtitle: { color: '#6B7280', fontSize: 12.5, lineHeight: 12.5, letterSpacing: -0.2 },
  form: { width: '100%', marginTop: 11, gap: 16},
  inputGroup: { gap: 12, marginBottom: 16,  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 16, 
    padding: 16,
    gap: 12,
    // height: 56, 
    borderWidth: 0.5, 
    borderColor: '#E5E7EB' 
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: { marginRight: 0 },
  input: { flex: 1, height: '100%', color: 'black', fontSize: 16, lineHeight: 19.2, letterSpacing: -0.8 },
  errorText: { color: '#EF4444', fontSize: 13, marginBottom: 16, marginTop: -8 },
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