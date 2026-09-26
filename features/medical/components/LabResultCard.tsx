import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import type { LabResultSummary } from "../types";
import { formatLongDate } from "../utils/formatters";

interface LabResultCardProps {
  result: LabResultSummary;
  onDownload?: () => void;
}

export function LabResultCard({ result, onDownload }: LabResultCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
      </View>
      <View style={styles.info}>
        <Text weight="semibold" style={styles.name}>
          {result.name}
        </Text>
        <Text weight="regular" style={styles.meta}>
          {formatLongDate(result.result_date)}
        </Text>
        <Text weight="regular" style={styles.meta}>
          {result.lab_name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onDownload}
        disabled={!onDownload}
        hitSlop={8}
        style={styles.downloadButton}
      >
        <Ionicons name="download-outline" size={20} color={Colors.neutral} />
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
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue2,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  meta: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.neutral,
  },
  downloadButton: {
    padding: 4,
  },
});
