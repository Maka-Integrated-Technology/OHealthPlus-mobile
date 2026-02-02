import Button, { AppleButton, GoogleButton } from '@/components/Button';
import { Text } from '@/components/Text';
import Colors from "@/constants/Colors";
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
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  // Separate states for each password field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/(auth)/signin');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color="black" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>Enter your info to create your HealthBridge account today.</Text>
          </View>

          <View style={styles.form}>
            <View>
              <View style={styles.inputGroup}>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={24} color="#4D5761" style={styles.inputIcon} />
                  <TextInput
                      placeholder="Name"
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={24} color="#4D5761" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
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

                {/* Confirm Password Input with Eye Icon */}
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={24} color="#4D5761" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#4D5761" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.checkboxRow}>
                 <View style={styles.checkbox} />
                 <Text style={styles.termsText}>
                   I agree to our <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>.
                 </Text>
              </View>
            </View>

            <Button onPress={() => router.push('/(auth)/OTP')} style={styles.submitBtn}>Sign Up →</Button>
            
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
              <TouchableOpacity style={styles.footerLink} onPress={() => router.push('/(auth)/signin')}>
                <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Sign In</Text></Text>
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
  subtitle: { color: '#6B7280', fontSize: 12.5, lineHeight: 15, letterSpacing: -0.2 },
  form: { width: '100%', marginTop: 11, gap: 16 },
  inputGroup: { gap: 12 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 16, 
    padding: 16,
    gap: 12,
    borderWidth: 0.5, 
    borderColor: '#E5E7EB' 
  },
  inputIcon: { marginRight: 0 },
  input: { flex: 1, height: '100%', color: 'black', fontSize: 16, lineHeight: 19.2, letterSpacing: -0.8 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 11 },
  checkbox: { width: 24, height: 24, borderRadius: 5.3, borderWidth: 1, borderColor: '#155EEF', backgroundColor: '#FAFAFA' },
  termsText: { flex: 1, fontSize: 14, color: '#6C737F', lineHeight: 16.8, letterSpacing: -0.5 },
  link: { fontSize: 14, color: Colors.primary, fontWeight: '600', lineHeight: 16.8, letterSpacing: -0.5 },
  submitBtn: { marginVertical: 0 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  divider: { flex: 1, height: 1, backgroundColor: '#D2D6DB' },
  orText: { marginHorizontal: 16, color: '#9DA4AE', fontSize: 16, lineHeight: 16, letterSpacing: -0.2  },
  socialBtnGroup: { gap: 12 },
  footerLink: { marginTop: 24, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#6C737F', fontWeight: '400', lineHeight: 14, letterSpacing: -0.5 },
});