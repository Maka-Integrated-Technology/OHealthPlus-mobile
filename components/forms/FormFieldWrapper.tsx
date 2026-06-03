import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { FormLabel } from "./FormLabel";

type FormFieldWrapperProps = {
  label?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  helperText?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function FormFieldWrapper({
  label,
  error,
  touched,
  required,
  helperText,
  children,
  style,
  labelStyle,
}: FormFieldWrapperProps) {
  const showError = !!touched && !!error;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <FormLabel required={required} style={labelStyle}>
          {label}
        </FormLabel>
      ) : null}

      {children}

      {showError ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  errorText: {
    fontSize: 12,
    color: Colors.red500,
    marginTop: 2,
  },
  helperText: {
    fontSize: 12,
    color: Colors.neutral400,
    marginTop: 2,
  },
});
