import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { labAvailabilitySlots } from "@/features/labs/constants/availability";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const selectedDateLabel = "17th August, 2026";

export default function SelectDateTime() {
  const router = useAppRouter();
  const { labId } = useLocalSearchParams<{ labId?: string }>();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>("2");

  const selectedSlot = labAvailabilitySlots.find((s) => s.id === selectedSlotId);

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Select Date and Time
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.dateRow}>
          <Text weight="medium" style={styles.dateText}>
            {selectedDateLabel}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={Colors.black100} />
        </View>

        <View style={styles.timesSection}>
          <Text weight="semibold" style={styles.sectionTitle}>
            Available times
          </Text>
          <View style={styles.timesGrid}>
            {labAvailabilitySlots.map((slot) => {
              const isSelected = slot.id === selectedSlotId;
              return (
                <Pressable
                  key={slot.id}
                  disabled={!slot.isAvailable}
                  onPress={() => setSelectedSlotId(slot.id)}
                  style={[
                    styles.timeButton,
                    !slot.isAvailable && styles.timeButtonDisabled,
                    isSelected && styles.timeButtonSelected,
                  ]}
                >
                  <Text
                    weight="regular"
                    style={[
                      styles.timeButtonText,
                      !slot.isAvailable && styles.timeButtonTextDisabled,
                      isSelected && styles.timeButtonTextSelected,
                    ]}
                  >
                    {slot.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          disabled={!selectedSlot}
          onPress={() =>
            router.toReviewLabBooking({
              labId: labId ?? "1",
              date: selectedDateLabel,
              time: selectedSlot?.label,
            })
          }
        >
          Proceed
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    paddingTop: 8,
    paddingBottom: 12,
    marginTop: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  content: {
    gap: 24,
    paddingBottom: 24,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
  dateText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  timesSection: {
    gap: 14,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timeButton: {
    width: "47%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#FCFCFC",
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    alignItems: "center",
  },
  timeButtonDisabled: {
    backgroundColor: Colors.homeneutral,
    borderColor: Colors.homeneutral,
  },
  timeButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeButtonText: {
    fontSize: 14,
    letterSpacing: -0.5,
    color: "#1A1A1A",
  },
  timeButtonTextDisabled: {
    color: Colors.neutral300,
  },
  timeButtonTextSelected: {
    color: "white",
  },
  footer: {
    paddingVertical: 16,
  },
});
