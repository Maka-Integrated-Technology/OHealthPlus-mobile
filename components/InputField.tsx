import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

interface InputFieldProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  error?: boolean;
  containerStyle?: ViewStyle;
}

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
  return (
    <View style={[styles.inputContainer, error && styles.inputError, containerStyle]}>
      {icon && (
        <Ionicons name={icon} size={24} color="#4D5761" style={styles.inputIcon} />
      )}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
          <Ionicons name={rightIcon} size={24} color="#4D5761" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: 0,
  },
  input: {
    flex: 1,
    height: '100%',
    color: 'black',
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
  },
});
