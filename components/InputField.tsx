import Colors from "@/constants/Colors";
import { authAssets } from "@/features/auth/assets";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  icon?: "email" | "password" | "name";
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  error?: boolean;
  containerStyle?: ViewStyle;
}

const authIcons = {
  email: authAssets.icons.emailIcon,
  password: authAssets.icons.passwordIdon,
  name: authAssets.icons.nameIcon,
};

export function InputField({
  icon,
  rightIcon,
  onRightIconPress,
  error,
  containerStyle,
  style,
  placeholderTextColor = "#9CA3AF",
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        error && styles.inputError,
        containerStyle,
        isFocused && styles.inputFocused,
      ]}
    >
      {icon && (
        <Image
          source={authIcons[icon]}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      )}
      <TextInput
        onFocus={() => setIsFocused(true)}
        style={[
          styles.input,
          style, // applies when focused
        ]}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
        >
          <Ionicons name={rightIcon} size={24} color="#4D5761" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral50,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
    borderWidth: 0.5,
    borderColor: Colors.neutral200,
  },
  inputContainerFocused: {
    borderColor: Colors.primary, // or your primary color
    borderWidth: 1,
  },
  inputError: {
    borderColor: Colors.red500,
  },
  inputIcon: {
    marginRight: 0,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "black",
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    fontFamily: "Inter-Regular",
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});
