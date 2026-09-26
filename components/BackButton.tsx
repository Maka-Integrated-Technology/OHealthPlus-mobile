import { useAppRouter } from "@/config/route";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacityProps } from "react-native";

interface BackButtonProps extends TouchableOpacityProps {}

export function BackButton({ style, onPress, ...props }: BackButtonProps) {
  const router = useAppRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.toSignIn();
    }
  };

  return (
    <Pressable
      {...props}
      style={[styles.backButton, style]}
      onPress={onPress ?? handleBack}
    >
      <Ionicons name="chevron-back" size={20} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#155EEF",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 8,
    backgroundColor: "#FAFAFA",
  },
});
