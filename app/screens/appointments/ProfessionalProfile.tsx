import Avatar, { AvatarFallback } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import clock_icon from "@/features/appointments/assets/icons/clock.png";
import message_icon from "@/features/appointments/assets/icons/message_icon.png";
import rating_icon from "@/features/appointments/assets/icons/rating_icon.png";
import verification_icon from "@/features/appointments/assets/icons/verification_icon.png";
import video_icon from "@/features/appointments/assets/icons/video_icon.png";
import {
  useProfessional,
  useProfessionalReviews,
} from "@/features/appointments/hooks/useAppointments";
import {
  formatNaira,
  getSupportedConsultationTypes,
} from "@/features/appointments/utils/formatters";
import { useLocalSearchParams } from "expo-router";
import { getNameInitials } from "@/utils/avatar";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from "react-native";

type BookingConsultationType = "chat" | "video";

export default function ProfessionalProfile() {
  const router = useAppRouter();
  const { professionalId } = useLocalSearchParams<{
    professionalId?: string;
  }>();

  const {
    data: professional,
    isLoading,
    isError,
    refetch,
  } = useProfessional(professionalId ?? "");

  const { data: reviews, isLoading: reviewsLoading } = useProfessionalReviews(
    professionalId ?? "",
  );

  const supportedTypes = professional
    ? getSupportedConsultationTypes(professional.consultation_type)
    : ["chat" as const];

  const [consultationType, setConsultationType] =
    useState<BookingConsultationType | null>(null);

  // Resolve selected type (defaulting to first supported type)
  const activeType: BookingConsultationType =
    consultationType ?? supportedTypes[0];

  const handleBookNow = () => {
    if (!professional) return;
    router.toSelectDateTime({
      professionalId: professional.id,
      consultationType: activeType,
    });
  };

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.header}>
          <BackButton style={{ marginBottom: 0 }} />
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
        </View>
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load professional profile.
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

  // Determine whether any future available slot exists
  const hasAvailability = professional.availabilities?.some((g) =>
    g.slots.some((s) => s.is_available)
  );

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Doctor details */}
        <View style={styles.doctorDetailsContainer}>
          <View style={styles.professionalImageContainer}>
              <Avatar
                imageUrl={professional.image}
                size="xl"
                rounded="md"
                accessibilityLabel={professional.name}
              >
                <AvatarFallback size="xl" rounded="md">
                  {getNameInitials(professional.name)}
                </AvatarFallback>
              </Avatar>
            <View style={styles.verificationBadge}>
              <Image
                source={verification_icon}
                style={{ height: 20, width: 20 }}
              />
            </View>
          </View>

          <View style={{ flex: 1, gap: 12 }}>
            <View style={styles.availabilityBadge}>
              <Image source={clock_icon} style={{ width: 16, height: 16 }} />
              <Text weight="medium" style={styles.availabilityText}>
                {hasAvailability ? "Available" : "Not available"}
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ gap: 6 }}>
                <Text weight="semibold" style={styles.name}>
                  {professional.name}
                </Text>
                <Text weight="regular" style={styles.role}>
                  {professional.speciality}
                </Text>
                <Text weight="regular" style={styles.role}>
                  {professional.years_of_experience} yrs experience
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingBox}>
                  <Image
                    source={rating_icon}
                    style={{ width: 14, height: 14 }}
                  />
                  <Text weight="medium" style={styles.rating}>
                    {Number(professional.rating).toFixed(1)}
                  </Text>
                </View>
                <Text weight="regular" style={styles.reviews}>
                  ({professional.total_reviews} reviews)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* About */}
        {professional.about ? (
          <View style={styles.aboutSection}>
            <Text weight="semibold" style={styles.name}>
              About
            </Text>
            <Text weight="regular" style={styles.aboutText}>
              {professional.about}
            </Text>
          </View>
        ) : null}

        {/* Reviews */}
        <View style={styles.reviewsSection}>
          <Text weight="semibold" style={styles.name}>
            Reviews
          </Text>
          {reviewsLoading ? (
            <ActivityIndicator
              color={Colors.primary}
              style={styles.reviewsLoader}
            />
          ) : reviews && reviews.length > 0 ? (
            <View style={styles.reviewsList}>
              {reviews.slice(0, 5).map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewStarsRow}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < review.rating ? "star" : "star-outline"}
                          size={14}
                          color={i < review.rating ? "#FACC15" : Colors.neutral300}
                        />
                      ))}
                    </View>
                  </View>
                  {review.comment ? (
                    <Text weight="regular" style={styles.reviewComment}>
                      {review.comment}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : (
            <Text weight="regular" style={styles.noReviewsText}>
              No reviews yet.
            </Text>
          )}
        </View>

        {/* Consultation type selection */}
        <View style={styles.consultationTypeSection}>
          <Text weight="semibold" style={styles.name}>
            Choose Consultation Type
          </Text>
          <View style={styles.consultationOptions}>
            {supportedTypes.includes("chat") && (
              <Pressable
                onPress={() => setConsultationType("chat")}
                style={[
                  styles.consultationOption,
                  activeType === "chat" && styles.consultationOptionSelected,
                ]}
              >
                <Image
                  source={message_icon}
                  style={{ width: 32, height: 32 }}
                />
                <Text
                  weight="regular"
                  style={styles.consultationOptionText}
                >
                  Chat Consultation
                </Text>
              </Pressable>
            )}
            {supportedTypes.includes("video") && (
              <Pressable
                onPress={() => setConsultationType("video")}
                style={[
                  styles.consultationOption,
                  activeType === "video" && styles.consultationOptionSelected,
                ]}
              >
                <Image
                  source={video_icon}
                  style={{ width: 32, height: 32 }}
                />
                <Text
                  weight="regular"
                  style={styles.consultationOptionText}
                >
                  Video Consultation
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View style={styles.feeContainer}>
          <Text weight="regular" style={styles.feeLabel}>
            Consultation Fee
          </Text>
          <Text weight="semibold" style={styles.feeAmount}>
            {formatNaira(professional.consultation_fee)}
          </Text>
        </View>
        <Button onPress={handleBookNow} style={styles.bookButton}>
          Book Now
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
    marginBottom: 4,
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
    gap: 12,
    paddingBottom: 100,
  },
  doctorDetailsContainer: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.lightBeige,
    padding: 14,
    borderRadius: 16,
  },
  professionalImageContainer: {
    height: 135,
    aspectRatio: 1,
    position: "relative",
  },
  professionalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  professionalImageStyle: {
    width: "100%",
    height: "100%",
  },
  verificationBadge: {
    position: "absolute",
    top: -10,
    right: -4,
    padding: 4,
    backgroundColor: Colors.lightBeige,
    borderRadius: 999,
    zIndex: 10,
  },
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
  rating: {
    fontSize: 12,
    lineHeight: 14.4,
    color: Colors.black200,
  },
  reviews: {
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: -0.2,
    color: Colors.neutral,
  },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  availabilityText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.blue400,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.lightYellow,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  aboutSection: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: Colors.lightBeige,
    padding: 14,
    borderRadius: 16,
  },
  consultationTypeSection: {
    flexDirection: "column",
    gap: 14,
    paddingTop: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.neutral,
  },
  reviewsSection: {
    flexDirection: "column",
    gap: 12,
    backgroundColor: Colors.lightBeige,
    padding: 14,
    borderRadius: 16,
  },
  reviewsLoader: {
    marginTop: 8,
  },
  reviewsList: {
    gap: 12,
  },
  reviewItem: {
    gap: 6,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.homeneutral,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewStarsRow: {
    flexDirection: "row",
    gap: 2,
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral,
  },
  noReviewsText: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral400,
  },
  consultationOptions: {
    gap: 12,
  },
  consultationOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    backgroundColor: Colors.lightBeige,
  },
  consultationOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.transparentPrimary,
  },
  consultationOptionText: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.black200,
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
    lineHeight: 18 * 1.1,
    letterSpacing: -0.8,
    color: Colors.background,
    fontWeight: "600",
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
  bookButton: {
    flex: 1,
    maxWidth: 200,
  },
});
