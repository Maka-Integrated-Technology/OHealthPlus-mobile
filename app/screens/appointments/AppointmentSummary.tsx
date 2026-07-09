import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import ReviewModal from "@/features/appointments/components/ReviewModal";
import {
  useBooking,
  useCreateProfessionalReview,
} from "@/features/appointments/hooks/useAppointments";
import {
  formatBookingDateTime,
  getImageSource,
} from "@/features/appointments/utils/formatters";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";

export default function AppointmentSummaryScreen() {
  const router = useAppRouter();
  const { appointmentId } = useLocalSearchParams<{ appointmentId?: string }>();

  const {
    data: booking,
    isLoading,
    isError,
    refetch,
  } = useBooking(appointmentId ?? "");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const { mutateAsync: createReview, isPending: isReviewing } =
    useCreateProfessionalReview(booking?.professional_id ?? "");

  const handleReview = async (data: { rating: number; comment?: string }) => {
    await createReview({
      rating: data.rating,
      comment: data.comment,
      booking_id: appointmentId,
    });
    Alert.alert("Thank you!", "Your review has been submitted.");
  };

  if (isLoading) {
    return (
      <Screen>
        <DetailHeader title="Appointment Summary" />
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError || !booking) {
    return (
      <Screen>
        <DetailHeader title="Appointment Summary" />
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load appointment summary.
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

  const displayDateTime = formatBookingDateTime(
    booking.booking_date,
    booking.booking_time,
  );
  const notes = booking.notes?.trim()
    ? booking.notes
    : "No notes available.";

  return (
    <Screen>
      <DetailHeader title="Appointment Summary" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.doctorCard}>
          <Image
            source={getImageSource(booking.professional_image)}
            style={styles.avatar}
          />
          <View style={styles.doctorInfo}>
            <Text weight="semibold" style={styles.doctorName}>
              {booking.professional_name}
            </Text>
            <Text weight="regular" style={styles.specialization}>
              {booking.speciality_name}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text weight="medium" style={styles.sectionLabel}>
            {booking.consultation_type === "video"
              ? "Video Consultation"
              : "Chat Consultation"}
          </Text>
          <View style={styles.detailRow}>
            <Image
              source={appointmentAssets.icons.calendarIcon}
              style={styles.detailIcon}
            />
            <Text weight="regular" style={styles.detailValue}>
              {displayDateTime}
            </Text>
          </View>
        </View>

        <View style={styles.notesSection}>
          <Text weight="medium" style={styles.notesLabel}>
            Notes
          </Text>
          <Text weight="regular" style={styles.notesText}>
            {notes}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            onPress={() => setShowReviewModal(true)}
            style={styles.primaryButton}
          >
            Leave a review
          </Button>
          <Button
            type="secondary"
            onPress={() => {}}
            style={styles.secondaryButton}
          >
            Send follow-up
          </Button>
          <Button
            type="secondary"
            onPress={() => router.toAIHealthAssistant()}
            style={styles.secondaryButton}
          >
            Message assistant
          </Button>
        </View>
      </ScrollView>

      <ReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReview}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 999,
    resizeMode: "cover",
  },
  doctorInfo: {
    flex: 1,
    gap: 4,
  },
  doctorName: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  specialization: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.neutral,
  },
  section: {
    marginBottom: 20,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  detailValue: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  notesSection: {
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
  },
  notesLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: Colors.neutral,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  actions: {
    gap: 12,
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
