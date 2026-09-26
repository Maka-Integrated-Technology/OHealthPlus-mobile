import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import type { ExtractedTest } from "../types";

interface BookingSummaryCardProps {
  tests: ExtractedTest[];
  serviceFee: number;
}

export default function BookingSummaryCard({
  tests,
  serviceFee,
}: BookingSummaryCardProps) {
  const total = tests.reduce((sum, test) => sum + test.price, 0) + serviceFee;

  return (
    <View style={styles.container}>
      <View style={styles.rows}>
        {tests.map((test) => (
          <View key={test.id} style={styles.row}>
            <Text weight="medium" style={styles.label}>
              {test.name}
            </Text>
            <Text weight="bold" style={styles.value}>
              ₦{test.price.toLocaleString()}
            </Text>
          </View>
        ))}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Service Fee
          </Text>
          <Text weight="bold" style={styles.value}>
            ₦{serviceFee.toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.totalRow}>
        <Text weight="bold" style={styles.totalLabel}>
          Total
        </Text>
        <Text weight="bold" style={styles.totalValue}>
          ₦{total.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 15,
    width: "100%",
  },
  rows: {
    gap: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.neutral600,
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black100,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Colors.neutral200,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  totalValue: {
    fontSize: 17,
    lineHeight: 20,
    color: Colors.black100,
  },
});
