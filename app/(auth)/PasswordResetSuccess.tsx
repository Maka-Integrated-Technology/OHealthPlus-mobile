import Button from '@/components/Button';
import { Text } from '@/components/Text';
import Colors from '@/constants/Colors';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function PasswordResetSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("@/assets/icons/Illustration.svg")}
            style={{ width: 150, height: 150, objectFit: 'contain' }}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text weight="bold" style={styles.title}>Password Reset</Text>
          <Text style={styles.subtitle}>
            You can now go ahead and sign in to your HealthBridge account.
          </Text>
        </View>
      </View>

      <Button onPress={() => router.replace(ROUTES.SIGN_IN)} style={styles.button}>
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  iconWrapper: {},
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBlock: 12,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 26,
    fontWeight: '600',
    color: Colors.black100,
    textAlign: 'center',
    lineHeight: 28.6,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black80,
    lineHeight: 19.2,
    textAlign: 'center',
    letterSpacing: -0.8,
    maxWidth: 280,
  },
  button: {},
});