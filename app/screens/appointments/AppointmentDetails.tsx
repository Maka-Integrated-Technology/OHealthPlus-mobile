import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Mock data - replace with API fetch
const APPOINTMENTS: Record<
  string,
  {
    doctorName: string;
    specialization: string;
    image: { uri: string };
    dateTime: string;
    canJoin: boolean;
  }
> = {
  "1": {
    doctorName: "Dr. Aisha Bello",
    specialization: "General Doctor",
    image: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
    dateTime: "Wed 14 • 10:30 AM",
    canJoin: true,
  },
  "2": {
    doctorName: "Dr. Ayodeji Mayowa",
    specialization: "General Doctor",
    image: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
    dateTime: "Thu 15 • 2:00 PM",
    canJoin: false,
  },
};

export default function AppointmentDetailsScreen() {
  const router = useAppRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const appointment = id ? APPOINTMENTS[id] : APPOINTMENTS["1"];

  if (!appointment) {
    return null;
  }

  const { doctorName, specialization, image, dateTime, canJoin } = appointment;

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <BackButton />
        <Text weight="semibold" style={styles.headerTitle}>
          Appointment Details
        </Text>
        <Pressable style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.black100} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.doctorCard}>
          <Image source={image} style={styles.avatar} />
          <View style={styles.doctorInfo}>
            <Text weight="semibold" style={styles.doctorName}>
              {doctorName}
            </Text>
            <Text weight="regular" style={styles.specialization}>
              {specialization}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.detailRow}>
            <View style={styles.radioSelected} />
            <Text weight="regular" style={styles.detailLabel}>
              Video Consultation
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Image
              source={appointmentAssets.icons.calendarIcon}
              style={styles.detailIcon}
            />
            <Text weight="regular" style={styles.detailValue}>
              {dateTime}
            </Text>
          </View>
        </View>

        <View style={styles.advanceWindow}>
          <Text weight="regular" style={styles.advanceText}>
            Ensure you have a stable internet connection and are in a quiet place
            before joining the consultation.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            onPress={() => router.toVideoConsultationSetup({ appointmentId: id, doctorName })}
            disabled={!canJoin}
            style={styles.primaryButton}
          >
            Join consultation
          </Button>
          <Button type="secondary" onPress={() => {}} style={styles.secondaryButton}>
            Reschedule appointment
          </Button>
          <Button type="textDestructive" onPress={() => router.back()} style={styles.textButton}>
            Cancel appointment
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  detailLabel: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.black100,
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
  advanceWindow: {
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
  },
  advanceText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.2,
    color: Colors.neutral,
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
  textButton: {
    width: "100%",
    paddingVertical: 8,
  },
});
