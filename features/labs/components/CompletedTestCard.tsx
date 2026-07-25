import Button from "@/components/Button";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import type { CompletedLabTest } from "../types";

interface CompletedTestCardProps {
  test: CompletedLabTest;
  onViewResults: () => void;
}

export default function CompletedTestCard({
  test,
  onViewResults,
}: CompletedTestCardProps) {
  return (
    <View style={styles.card}>
      <Text weight="bold" style={styles.title}>
        {test.testName}
      </Text>
      <Text weight="regular" style={styles.labName}>
        {test.labName}
      </Text>
      <Text weight="regular" style={styles.completedLabel}>
        {test.completedDateLabel}
      </Text>

      <Button type="clear" onPress={onViewResults} style={styles.viewButton}>
        View Results
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  labName: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightGray2,
  },
  completedLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightGray2,
    marginBottom: 8,
  },
  viewButton: {
    borderColor: Colors.neutral200,
    borderRadius: 999,
  },
});
