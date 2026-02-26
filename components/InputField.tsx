import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

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
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputError,
        containerStyle,
      ]}
    >
      {icon && (
        <Ionicons name={icon} size={24} color="#4D5761" style={styles.inputIcon} />
      )}
      <TextInput
        // style={[styles.input, style]}
        style={[
          styles.input,
          style,
          Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)
        ]}
        placeholderTextColor={placeholderTextColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
    backgroundColor: Colors.neutral50,
    borderRadius: 16,
    padding: 16,
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
    height: '100%',
    color: 'black',
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
  },
});
