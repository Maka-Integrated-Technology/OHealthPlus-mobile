import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import success_icon from "@/features/appointments/assets/icons/Illustration.png";
import message_icon from "@/features/appointments/assets/icons/message_icon.png";
import video_icon from "@/features/appointments/assets/icons/video_icon_2.png";
import { useBooking } from "@/features/appointments/hooks/useAppointments";
import {
  formatBookingDate,
  formatBookingTime,
} from "@/features/appointments/utils/formatters";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function AppointmentConfirmed() {
  const router = useAppRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId?: string }>();

  const { data: booking, isLoading } = useBooking(bookingId ?? "");

  const displayDate = booking ? formatBookingDate(booking.booking_date) : "—";
  const displayTime = booking ? formatBookingTime(booking.booking_time) : "—";
  const consultationType = booking?.consultation_type ?? "chat";
  const professionalName = booking?.professional_name ?? "your doctor";

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Success icon */}
          <View style={styles.iconContainer}>
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} />
            ) : (
              <Image
                source={success_icon}
                style={{ width: 100, height: 100, objectFit: "contain" }}
              />
            )}
          </View>

          {/* Confirmation message */}
          <View style={styles.textContainer}>
            <Text weight="semibold" style={styles.title}>
              Appointment Confirmed
            </Text>
            <Text weight="regular" style={styles.subtitle}>
              Your consultation with {professionalName} is scheduled.
            </Text>
          </View>

          {/* Appointment details */}
          <View style={styles.appointmentDetailsSection}>
            <View style={styles.consultationTypeDetailRow}>
              <Text weight="regular" style={styles.detailLabel}>
                Consultation type
              </Text>
              <View style={styles.detailValueRow}>
                <Image
                  source={
                    consultationType === "video" ? video_icon : message_icon
                  }
                  style={styles.detailIcon}
                />
                <Text weight="regular" style={styles.detailValue}>
                  {consultationType === "video" ? "Video" : "Chat"} Consultation
                </Text>
              </View>
            </View>
            <View style={styles.dateTimeDetailRow}>
              <View style={styles.detailRow}>
                <Text weight="regular" style={styles.detailLabel}>
                  Date
                </Text>
                <View style={styles.detailValueRow}>
                  <Image
                    source={appointmentAssets.icons.calendarIcon}
                    style={styles.detailIcon}
                  />
                  <Text weight="medium" style={styles.detailValue}>
                    {displayDate}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text weight="regular" style={styles.detailLabel}>
                  Time
                </Text>
                <View style={styles.detailValueRow}>
                  <Image
                    source={appointmentAssets.icons.calendarIcon}
                    style={styles.detailIcon}
                  />
                  <Text weight="medium" style={styles.detailValue}>
                    {displayTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              bookingId
                ? router.toAppointmentDetails({ id: bookingId })
                : router.toHome()
            }
            style={styles.primaryButton}
          >
            View Appointment
          </Button>
          <Button
            onPress={() => router.toHome()}
            type="secondary"
            style={styles.secondaryButton}
          >
            Back to Dashboard
          </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    lineHeight: 28.6,
    letterSpacing: -0.8,
    color: Colors.black100,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.3,
    color: Colors.neutral,
    textAlign: "center",
  },
  appointmentDetailsSection: {
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 8,
    gap: 16,
    alignSelf: "stretch",
  },
  consultationTypeDetailRow: { flexDirection: "column", gap: 12 },
  dateTimeDetailRow: { flexDirection: "row", gap: 12 },
  detailRow: { gap: 12, flex: 1 },
  detailLabel: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.neutral,
  },
  detailValue: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.black200,
  },
  detailValueRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  detailIcon: { width: 20, height: 20 },
  buttonContainer: {
    marginTop: "auto",
    width: "100%",
    gap: 12,
  },
  primaryButton: { width: "100%" },
  secondaryButton: { width: "100%" },
});
