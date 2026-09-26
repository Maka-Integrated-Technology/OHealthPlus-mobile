import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import type { HealthCondition } from "../types";
import { formatAddedOn } from "../utils/formatters";

interface ConditionCardProps {
  condition: HealthCondition;
  onDelete?: () => void;
  deleting?: boolean;
}

export function ConditionCard({
  condition,
  onDelete,
  deleting,
}: ConditionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text weight="semibold" style={styles.name}>
          {condition.name}
        </Text>
        <Text weight="regular" style={styles.date}>
          {formatAddedOn(condition.created_at)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onDelete}
        disabled={deleting || !onDelete}
        hitSlop={8}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={20} color={Colors.red500} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  date: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.neutral,
  },
  deleteButton: {
    padding: 4,
  },
});
