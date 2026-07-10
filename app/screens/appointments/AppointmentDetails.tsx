import Avatar, { AvatarFallback } from "@/components/Avatar";
import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import message_icon from "@/features/appointments/assets/icons/message_icon.png";
import verification_icon from "@/features/appointments/assets/icons/verification_icon.png";
import video_icon from "@/features/appointments/assets/icons/video_icon_2.png";
import {
  useBooking,
  useCancelBooking,
} from "@/features/appointments/hooks/useAppointments";
import {
  formatBookingDate,
  formatBookingTime,
  formatNaira,
  isUpcomingBooking,
} from "@/features/appointments/utils/formatters";
import { getApiErrorMessage } from "@/utils/apiError";
import { getNameInitials } from "@/utils/avatar";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppointmentDetailsScreen() {
  const router = useAppRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const {
    data: booking,
    isLoading,
    isError,
    refetch,
  } = useBooking(id ?? "");

  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();

  if (isLoading) {
    return (
      <Screen>
        <DetailHeader title="Appointment Details" />
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError || !booking) {
    return (
      <Screen>
        <DetailHeader title="Appointment Details" />
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load appointment.
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

  const canJoin =
    isUpcomingBooking(booking) &&
    booking.status !== "cancelled" &&
    booking.consultation_type === "video";
  const canCancel =
    booking.status === "pending" || booking.status === "confirmed";

  const displayDate = formatBookingDate(booking.booking_date);
  const displayTime = formatBookingTime(booking.booking_time);

  const handleJoin = () => {
    router.toVideoConsultationSetup({
      appointmentId: booking.id,
      doctorName: booking.professional_name,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "Keep appointment", style: "cancel" },
        {
          text: "Cancel appointment",
          style: "destructive",
          onPress: () => {
            cancelBooking(booking.id, {
              onSuccess: () => router.back(),
              onError: (err) =>
                Alert.alert("Error", getApiErrorMessage(err)),
            });
          },
        },
      ]
    );
  };

  return (
    <Screen>
      <DetailHeader title="Appointment Details" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.detailsContainer}>
          {/* Doctor details */}
          <View style={styles.doctorDetailsContainer}>
            <View style={styles.professionalImageContainer}>
              <Avatar
                imageUrl={booking.professional_image}
                size="xl"
                rounded="md"
                accessibilityLabel={booking.professional_name}
              >
                <AvatarFallback size="xl" rounded="md">
                  {getNameInitials(booking.professional_name)}
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
                {booking.professional_name}
              </Text>
              <Text weight="regular" style={styles.role}>
                {booking.speciality_name}
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
                    booking.consultation_type === "video"
                      ? video_icon
                      : message_icon
                  }
                  style={styles.detailIcon}
                />
                <Text weight="regular" style={styles.detailValue}>
                  {booking.consultation_type === "video" ? "Video" : "Chat"}{" "}
                  Consultation
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
                {formatNaira(booking.amount)}
              </Text>
            </View>
            <View style={[styles.paymentRow, styles.totalRow]}>
              <Text weight="medium" style={styles.totalLabel}>
                Total
              </Text>
              <Text weight="semibold" style={styles.totalValue}>
                {formatNaira(booking.amount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Image
            source={appointmentAssets.icons.infoIcon}
            style={styles.infoIcon}
          />
          <Text weight="regular" style={styles.noteText}>
            Status: {booking.status} · Payment: {booking.payment_status}
          </Text>
        </View>

        <Text weight="regular" style={styles.noteText}>
          Ensure you have a stable internet connection. Find a quiet place
          before your consultation.
        </Text>

        {booking.consultation_type === "chat" && (
          <Text weight="regular" style={styles.noteText}>
            Chat consultations are not available yet. Only video consultations
            can be joined from the app.
          </Text>
        )}
      </ScrollView>

      <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          onPress={handleJoin}
          disabled={!canJoin}
          style={styles.primaryButton}
        >
          Join consultation
        </Button>
        {canCancel && (
          <Button
            type="textDestructive"
            onPress={handleCancel}
            style={styles.cancelButton}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling…" : "Cancel appointment"}
          </Button>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  content: { flex: 1 },
  contentContainer: {
    gap: 16,
    padding: 24,
  },
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
  noteContainer: {
    backgroundColor: Colors.lightBlue2,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoIcon: { width: 20, height: 20 },
  noteText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.neutral500,
    flex: 1,
  },
  actions: {
    gap: 12,
    paddingTop: 16,
    paddingHorizontal: 0,
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
  cancelButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: Colors.red500,
  },
});
