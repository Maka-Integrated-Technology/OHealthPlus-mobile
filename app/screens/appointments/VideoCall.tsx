import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useBooking } from "@/features/appointments/hooks/useAppointments";
import { getImageSource } from "@/features/appointments/utils/formatters";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function VideoCallScreen() {
  const router = useAppRouter();
  const insets = useSafeAreaInsets();
  const { appointmentId } = useLocalSearchParams<{
    appointmentId?: string;
  }>();

  const { data: booking, isLoading } = useBooking(appointmentId ?? "");

  const name = booking?.professional_name ?? "Doctor";
  const imageSource = booking
    ? getImageSource(booking.professional_image)
    : undefined;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(-2)
    .join("");

  const [showEndModal, setShowEndModal] = useState(false);
  const [isDoctorVisible, setIsDoctorVisible] = useState(true);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Video background - simulates call view.
          Actual video streaming is not implemented by the backend. */}
      <View style={styles.videoContainer}>
        {isDoctorVisible && imageSource ? (
          <Image
            source={imageSource}
            style={styles.mainVideo}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderVideo}>
            <Text weight="semibold" style={styles.placeholderText}>
              {initials}
            </Text>
          </View>
        )}

        {/* PiP - user's video (simulated) */}
        <View style={styles.pipContainer}>
          <View style={styles.pip}>
            <Text weight="semibold" style={styles.pipText}>
              You
            </Text>
          </View>
        </View>
      </View>

      {/* Top bar overlay */}
      <SafeAreaView style={styles.overlay} edges={["top"]}>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            {imageSource ? (
              <Image source={imageSource} style={styles.topBarAvatar} />
            ) : (
              <View style={styles.topBarAvatarFallback}>
                <Text weight="semibold" style={styles.topBarInitials}>
                  {initials}
                </Text>
              </View>
            )}
            <View>
              <Text weight="semibold" style={styles.topBarName}>
                {name}
              </Text>
              <Text weight="regular" style={styles.topBarSubtext}>
                Video consultation
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <Pressable style={styles.controlButton}>
              <Ionicons name="mic" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.controlButton}>
              <Ionicons name="videocam" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.controlButton}>
              <Ionicons name="volume-high" size={24} color="white" />
            </Pressable>
            <Pressable
              style={styles.endCallButton}
              onPress={() => setShowEndModal(true)}
            >
              <Ionicons name="call" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      {/* End call confirmation modal */}
      {showEndModal && (
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowEndModal(false)}
          />
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 24 }]}>
            <Text weight="semibold" style={styles.modalTitle}>
              End consultation?
            </Text>
            <Button
              type="destructive"
              onPress={() =>
                router.toConsultationCompleted({
                  doctorName: name,
                  appointmentId: booking?.id ?? appointmentId,
                })
              }
              style={styles.modalEndButton}
            >
              END CALL
            </Button>
            <Button
              type="secondary"
              onPress={() => setShowEndModal(false)}
              style={styles.modalContinueButton}
            >
              CONTINUE
            </Button>
          </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black300,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    flex: 1,
    position: "relative",
  },
  mainVideo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  placeholderVideo: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 64,
    color: Colors.primary,
  },
  pipContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
  },
  pip: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  pipText: {
    fontSize: 20,
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginHorizontal: 12,
    marginTop: 8,
    padding: 12,
    borderRadius: 16,
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topBarAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  topBarAvatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
  },
  topBarInitials: {
    fontSize: 14,
    color: "white",
  },
  topBarName: {
    fontSize: 16,
    lineHeight: 20,
    color: "white",
  },
  topBarSubtext: {
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255,255,255,0.8)",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  endCallButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.red500,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.black100,
    textAlign: "center",
    marginBottom: 8,
  },
  modalEndButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
  modalContinueButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
});
