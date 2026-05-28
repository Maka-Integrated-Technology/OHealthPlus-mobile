import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

type FormLabelProps = {
  children: React.ReactNode;
  required?: boolean;
  style?: StyleProp<TextStyle>;
};

export function FormLabel({ children, required, style }: FormLabelProps) {
  return (
    <Text weight="medium" style={[styles.label, style]}>
      {children}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    lineHeight: 15.6,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  required: {
    color: Colors.red500,
  },
});
