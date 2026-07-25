import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import type { UpcomingLabTest } from "../types";

interface UpcomingTestCardProps {
  test: UpcomingLabTest;
}

export default function UpcomingTestCard({ test }: UpcomingTestCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text weight="bold" style={styles.title}>
          {test.testName}
        </Text>
        <View style={styles.badge}>
          <Text weight="semibold" style={styles.badgeText}>
            {test.daysAwayLabel}
          </Text>
        </View>
      </View>
      <Text weight="regular" style={styles.labName}>
        {test.labName}
      </Text>

      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeItem}>
          <Ionicons name="calendar-outline" size={16} color={Colors.black300} />
          <Text weight="medium" style={styles.dateTimeText}>
            {test.date}
          </Text>
        </View>
        <View style={styles.dateTimeItem}>
          <Ionicons name="time-outline" size={16} color={Colors.black300} />
          <Text weight="medium" style={styles.dateTimeText}>
            {test.time}
          </Text>
        </View>
      </View>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  badge: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary,
  },
  labName: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightGray2,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: Colors.homeneutral,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  dateTimeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateTimeText: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.black300,
  },
});
