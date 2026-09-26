import Avatar, { AvatarFallback } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import apple_icon from "@/features/appointments/assets/icons/apple.png";
import google_icon from "@/features/appointments/assets/icons/google.png";
import message_icon from "@/features/appointments/assets/icons/message_icon.png";
import verification_icon from "@/features/appointments/assets/icons/verification_icon.png";
import video_icon from "@/features/appointments/assets/icons/video_icon_2.png";
import {
  useCreateBooking,
  useProfessional,
} from "@/features/appointments/hooks/useAppointments";
import type { BookingConsultationType } from "@/features/appointments/types";
import {
  formatBookingDate,
  formatBookingTime,
  formatNaira,
} from "@/features/appointments/utils/formatters";
import { getApiErrorMessage } from "@/utils/apiError";
import { getNameInitials } from "@/utils/avatar";
import { useLocalSearchParams } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";

export default function ConfirmAppointment() {
  const router = useAppRouter();
  const { professionalId, consultationType, bookingDate, bookingTime } =
    useLocalSearchParams<{
      professionalId?: string;
      consultationType?: string;
      bookingDate?: string;
      bookingTime?: string;
    }>();

  const { data: professional } = useProfessional(professionalId ?? "");
  const { mutate: createBooking, isPending, error } = useCreateBooking();

  const consultationFee = professional?.consultation_fee ?? 0;
  const discount = 0;
  const total = consultationFee - discount;

  const errorMessage = error ? getApiErrorMessage(error) : null;

  const handleConfirm = () => {
    if (!professionalId || !bookingDate || !bookingTime || !consultationType)
      return;

    createBooking(
      {
        professional_id: professionalId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        consultation_type: consultationType as BookingConsultationType,
      },
      {
        onSuccess: (booking) => {
          router.toAppointmentConfirmed({ bookingId: booking.id });
        },
      }
    );
  };

  const displayDate = bookingDate ? formatBookingDate(bookingDate) : "—";
  const displayTime = bookingTime ? formatBookingTime(bookingTime) : "—";

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="semibold" style={styles.headerTitle}>
          Confirm Appointment
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.detailsContainer}>
          {/* Doctor details */}
          <View style={styles.doctorDetailsContainer}>
            <View style={styles.professionalImageContainer}>
              <Avatar
                imageUrl={professional?.image}
                size="xl"
                rounded="md"
                accessibilityLabel={professional?.name ?? "Professional"}
              >
                <AvatarFallback size="xl" rounded="md">
                  {getNameInitials(professional?.name)}
                </AvatarFallback>
              </Avatar>
              <View style={styles.verificationBadge}>
                <Image
                  source={verification_icon}
                  style={styles.verificationIcon}
                />
              </View>
            </View>
            <View style={{ gap: 6 }}>
              <Text weight="semibold" style={styles.name}>
                {professional?.name ?? "—"}
              </Text>
              <Text weight="regular" style={styles.role}>
                {professional?.speciality ?? "—"}
              </Text>
            </View>
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

        {/* Payment summary */}
        <View style={styles.paymentSummarySection}>
          <Text weight="semibold" style={styles.sectionTitle}>
            Payment Summary
          </Text>
          <View style={styles.paymentSummaryContent}>
            <View style={styles.paymentRow}>
              <Text weight="regular" style={styles.paymentLabel}>
                Consultation fee
              </Text>
              <Text weight="semibold" style={styles.paymentValue}>
                {formatNaira(consultationFee)}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text weight="regular" style={styles.paymentLabel}>
                Discount
              </Text>
              <Text weight="semibold" style={styles.paymentValue}>
                {formatNaira(discount)}
              </Text>
            </View>
            <View style={[styles.paymentRow, styles.totalRow]}>
              <Text weight="medium" style={styles.totalLabel}>
                Total
              </Text>
              <Text weight="semibold" style={styles.totalValue}>
                {formatNaira(total)}
              </Text>
            </View>
          </View>
        </View>

        {errorMessage && (
          <Text weight="regular" style={styles.errorText}>
            {errorMessage}
          </Text>
        )}

        <Text weight="regular" style={styles.noteText}>
          You'll receive a reminder before your appointment. You can cancel or
          reschedule if needed.
        </Text>
      </ScrollView>

      {/* Create booking — payment SDK not integrated yet */}
      <View style={styles.paymentSection}>
        {Platform.OS === "ios" && (
          <Button
            type="applePay"
            onPress={handleConfirm}
            icon={apple_icon}
            style={styles.paymentButton}
            disabled={isPending}
          >
            {isPending ? "Creating booking…" : "Pay with Apple Pay"}
          </Button>
        )}
        {(Platform.OS === "android" || Platform.OS === "web") && (
          <Button
            type="googlePay"
            onPress={handleConfirm}
            icon={google_icon}
            style={styles.paymentButton}
            disabled={isPending}
          >
            {isPending ? "Creating booking…" : "Pay with Google Pay"}
          </Button>
        )}
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
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
  content: { flex: 1 },
  contentContainer: { paddingBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 17.6,
    letterSpacing: -0.8,
    color: Colors.black300,
  },
  detailsContainer: { gap: 8 },
  doctorDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.lightBeige,
    padding: 14,
    borderRadius: 8,
  },
  professionalImageContainer: {
    height: 56,
    aspectRatio: 1,
    position: "relative",
  },
  professionalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  professionalImageStyle: { width: "100%", height: "100%" },
  verificationBadge: {
    position: "absolute",
    top: -4,
    right: -3,
    padding: 2,
    backgroundColor: Colors.lightBeige,
    borderRadius: 999,
    zIndex: 10,
  },
  verificationIcon: { height: 14, width: 14 },
  name: {
    fontSize: 16,
    lineHeight: 17.6,
    letterSpacing: -0.8,
    color: Colors.black200,
  },
  role: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.neutral,
  },
  appointmentDetailsSection: {
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 8,
    gap: 16,
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
  paymentSummarySection: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 8,
    gap: 8,
    padding: 14,
    marginTop: 16,
  },
  paymentSummaryContent: { gap: 12 },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.neutral,
  },
  paymentValue: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.8,
    color: Colors.primary,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.homeneutral,
  },
  totalLabel: {
    fontSize: 16,
    letterSpacing: -0.5,
    color: Colors.black200,
  },
  totalValue: {
    fontSize: 18,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.primary,
  },
  errorText: {
    fontSize: 14,
    lineHeight: 16.8,
    color: "#DC2626",
    marginTop: 12,
    textAlign: "center",
  },
  noteText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.neutral500,
    marginTop: 16,
  },
  paymentSection: {
    marginTop: "auto",
    paddingVertical: 16,
    gap: 12,
  },
  paymentButton: { width: "100%" },
});
