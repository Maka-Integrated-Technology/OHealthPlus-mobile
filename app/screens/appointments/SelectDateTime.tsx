import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useProfessional } from "@/features/appointments/hooks/useAppointments";
import type { AvailabilitySlot } from "@/features/appointments/types";
import {
  formatAvailabilityDate,
  formatBookingTime,
  formatNaira,
} from "@/features/appointments/utils/formatters";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function SelectDateTime() {
  const router = useAppRouter();
  const { professionalId, consultationType } = useLocalSearchParams<{
    professionalId?: string;
    consultationType?: string;
  }>();

  const {
    data: professional,
    isLoading,
    isError,
    refetch,
  } = useProfessional(professionalId ?? "");

  // Availability groups filtered to only dates that have at least one
  // available slot (so the user can't select a fully-blocked date).
  const availableDates = useMemo(() => {
    if (!professional) return [];
    return professional.availabilities.filter((group) =>
      group.slots.some((s) => s.is_available)
    );
  }, [professional]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null
  );

  // Default to the first available date once data loads
  const activeDate =
    selectedDate ?? (availableDates[0]?.date ?? null);

  const slotsForDate =
    availableDates.find((g) => g.date === activeDate)?.slots ?? [];

  const handleBookNow = () => {
    if (!professional || !activeDate || !selectedSlot) return;

    // Use only the HH:MM portion of start_time in case PostgreSQL returns HH:MM:SS
    const bookingTime = selectedSlot.start_time.slice(0, 5);

    router.toConfirmAppointment({
      professionalId: professional.id,
      consultationType,
      bookingDate: activeDate,
      bookingTime,
      slotId: selectedSlot.id,
    });
  };

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.header}>
          <BackButton style={{ marginBottom: 0 }} />
          <Text weight="semibold" style={styles.headerTitle}>
            Select Date & Time
          </Text>
        </View>
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError || !professional) {
    return (
      <Screen>
        <View style={styles.header}>
          <BackButton style={{ marginBottom: 0 }} />
          <Text weight="semibold" style={styles.headerTitle}>
            Select Date & Time
          </Text>
        </View>
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load availability.
          </Text>
          <Text
            weight="medium"
            style={styles.retryText}
            onPress={() => refetch()}
          >
            Tap to retry
          </Text>
        </View>
      </Screen>
    );
  }

  if (availableDates.length === 0) {
    return (
      <Screen>
        <View style={styles.header}>
          <BackButton style={{ marginBottom: 0 }} />
          <Text weight="semibold" style={styles.headerTitle}>
            Select Date & Time
          </Text>
        </View>
        <View style={styles.noSlotsContainer}>
          <View style={styles.noSlotsIcon}>
            <Text style={styles.noSlotsIconText}>📅</Text>
          </View>
          <Text weight="semibold" style={styles.noSlotsTitle}>
            No available slots
          </Text>
          <Text weight="regular" style={styles.noSlotsText}>
            {professional.name} currently has no available appointment times.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="semibold" style={styles.headerTitle}>
          Select Date & Time
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Date selector */}
        <View style={styles.dateSelector}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScrollContent}
          >
            {availableDates.map((group) => {
              const isActive = group.date === activeDate;
              return (
                <Pressable
                  key={group.date}
                  onPress={() => {
                    setSelectedDate(group.date);
                    setSelectedSlot(null);
                  }}
                  style={[
                    styles.dateButton,
                    isActive && styles.dateButtonSelected,
                  ]}
                >
                  <Text
                    weight={isActive ? "semibold" : "regular"}
                    style={[
                      styles.dateButtonText,
                      isActive && styles.dateButtonTextSelected,
                    ]}
                  >
                    {formatAvailabilityDate(group.date)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Time slots */}
        {slotsForDate.length > 0 ? (
          <View style={styles.timesSection}>
            <Text weight="semibold" style={styles.sectionTitle}>
              Available Times
            </Text>
            <View style={styles.timesGrid}>
              {slotsForDate.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <View key={slot.id} style={styles.timeButtonWrapper}>
                    <Pressable
                      onPress={() =>
                        slot.is_available && setSelectedSlot(slot)
                      }
                      disabled={!slot.is_available}
                      style={[
                        styles.timeButton,
                        !slot.is_available && styles.timeButtonDisabled,
                        isSelected &&
                          slot.is_available &&
                          styles.timeButtonSelected,
                      ]}
                    >
                      <Text
                        weight={
                          isSelected && slot.is_available ? "medium" : "regular"
                        }
                        style={[
                          styles.timeButtonText,
                          !slot.is_available && styles.timeButtonTextDisabled,
                          isSelected &&
                            slot.is_available &&
                            styles.timeButtonTextSelected,
                        ]}
                      >
                        {formatBookingTime(slot.start_time)}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.noSlotsContainer}>
            <View style={styles.noSlotsIcon}>
              <Text style={styles.noSlotsIconText}>📅</Text>
            </View>
            <Text weight="semibold" style={styles.noSlotsTitle}>
              No available slots
            </Text>
            <Text weight="regular" style={styles.noSlotsText}>
              This professional is unavailable on the selected date. Choose
              another date.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom bar */}
      {slotsForDate.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.feeContainer}>
            <Text weight="regular" style={styles.feeLabel}>
              Consultation Fee
            </Text>
            <Text weight="semibold" style={styles.feeAmount}>
              {formatNaira(professional.consultation_fee)}
            </Text>
          </View>
          <Button
            onPress={handleBookNow}
            style={[
              styles.bookButton,
              !selectedSlot && styles.bookButtonDisabled,
            ]}
          >
            Book Now
          </Button>
        </View>
      )}
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
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: Colors.neutral,
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 110,
  },
  dateSelector: {
    marginBottom: 28,
  },
  dateScrollContent: {
    gap: 8,
    paddingHorizontal: 2,
  },
  dateButton: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.beige,
  },
  dateButtonSelected: {
    backgroundColor: Colors.blue600,
  },
  dateButtonText: {
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: -0.5,
    color: Colors.black200,
  },
  dateButtonTextSelected: {
    color: "white",
  },
  timesSection: {
    gap: 14,
    marginBottom: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 17.6,
    color: Colors.black100,
  },
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timeButtonWrapper: {
    width: "48%",
  },
  timeButton: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    alignItems: "center",
    width: "100%",
  },
  timeButtonDisabled: {
    borderColor: "transparent",
    backgroundColor: Colors.lightBeige,
    opacity: 0.4,
  },
  timeButtonSelected: {
    backgroundColor: Colors.blue600,
    borderColor: Colors.blue600,
  },
  timeButtonText: {
    fontSize: 14,
    lineHeight: 14 * 1.2,
    color: Colors.black200,
    textAlign: "center",
  },
  timeButtonTextDisabled: {
    color: Colors.neutral300,
  },
  timeButtonTextSelected: {
    color: "white",
  },
  noSlotsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    flex: 1,
  },
  noSlotsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.homeneutral,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  noSlotsIconText: {
    fontSize: 36,
  },
  noSlotsTitle: {
    fontSize: 16,
    lineHeight: 16 * 1.1,
    color: Colors.neutral,
    marginBottom: 8,
  },
  noSlotsText: {
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: -0.5,
    color: Colors.neutral,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  feeContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  feeLabel: {
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: -0.2,
    color: Colors.neutral600,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: Colors.homeneutral,
    gap: 12,
  },
  feeAmount: {
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.background,
    fontWeight: "600",
  },
  bookButton: {
    flex: 1,
    maxWidth: 200,
  },
  bookButtonDisabled: {
    opacity: 0.4,
  },
});
