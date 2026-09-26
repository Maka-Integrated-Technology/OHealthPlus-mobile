import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useBooking } from "@/features/appointments/hooks/useAppointments";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ConsultationCompletedScreen() {
  const router = useAppRouter();
  const { appointmentId } = useLocalSearchParams<{
    appointmentId?: string;
  }>();

  const { data: booking, isLoading } = useBooking(appointmentId ?? "");
  const name = booking?.professional_name ?? "your doctor";

  if (isLoading) {
    return (
      <Screen style={styles.screen}>
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.checkCircle}>
            <Ionicons
              name="checkmark"
              size={48}
              color="white"
            />
          </View>
        </View>

        <Text weight="bold" style={styles.title}>
          Consultation completed
        </Text>
        <Text weight="regular" style={styles.subtitle}>
          Your consultation with {name} has ended.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          onPress={() =>
            router.toAppointmentSummary({
              appointmentId: booking?.id ?? appointmentId,
            })
          }
          style={styles.primaryButton}
        >
          View summary
        </Button>
        <Button
          type="secondary"
          onPress={() => router.toHome()}
          style={styles.secondaryButton}
        >
          Back to appointments
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  iconContainer: {
    marginBottom: 8,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.8,
    color: Colors.black100,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.3,
    color: Colors.neutral,
    textAlign: "center",
  },
  actions: {
    gap: 12,
    paddingBottom: 40,
  },
  primaryButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
  secondaryButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
});
