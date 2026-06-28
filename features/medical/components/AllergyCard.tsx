import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import type { Allergy } from "../types";
import { ALLERGY_SEVERITY_LABELS, formatAddedOn } from "../utils/formatters";

interface AllergyCardProps {
  allergy: Allergy;
  onDelete?: () => void;
  deleting?: boolean;
}

export function AllergyCard({ allergy, onDelete, deleting }: AllergyCardProps) {
  const isSevere = allergy.severity === "life_threatening";

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text weight="semibold" style={styles.name}>
          {allergy.name}
        </Text>
        <Text weight="regular" style={styles.date}>
          {formatAddedOn(allergy.created_at)}
        </Text>
        <Text
          weight="medium"
          style={[styles.severity, isSevere ? styles.severe : styles.mild]}
        >
          {ALLERGY_SEVERITY_LABELS[allergy.severity]}
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
    alignItems: "flex-start",
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
  severity: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  severe: {
    color: Colors.red500,
  },
  mild: {
    color: "#D97706",
  },
  deleteButton: {
    padding: 4,
  },
});
