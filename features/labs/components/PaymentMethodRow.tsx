import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import type { PaymentMethodOption } from "../types";

interface PaymentMethodRowProps {
  method: PaymentMethodOption;
  isSelected: boolean;
  onPress: () => void;
}

export default function PaymentMethodRow({
  method,
  isSelected,
  onPress,
}: PaymentMethodRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected && styles.containerSelected]}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={method.icon} size={20} color={Colors.black100} />
      </View>
      <Text weight="medium" style={styles.label}>
        {method.label}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={17}
        color={isSelected ? Colors.primary : Colors.neutral400}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "100%",
  },
  containerSelected: {
    borderColor: Colors.primary,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: Colors.homeneutral,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black100,
  },
});
