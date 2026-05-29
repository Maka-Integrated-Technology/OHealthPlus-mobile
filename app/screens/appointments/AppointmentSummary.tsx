import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const MOCK_SUMMARY = {
  doctorName: "Dr. Chidi Okoro",
  specialization: "General Doctor",
  image: { uri: "https://randomuser.me/api/portraits/men/11.jpg" },
  dateTime: "Mon 10 • 9:00 AM",
  notes: "Follow up in 2 weeks. Ordinary procedure medication.",
};

export default function AppointmentSummaryScreen() {
  const router = useAppRouter();
  const summary = MOCK_SUMMARY;

  return (
    <Screen>
      <DetailHeader title="Appointment Summary" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.doctorCard}>
          <Image source={summary.image} style={styles.avatar} />
          <View style={styles.doctorInfo}>
            <Text weight="semibold" style={styles.doctorName}>
              {summary.doctorName}
            </Text>
            <Text weight="regular" style={styles.specialization}>
              {summary.specialization}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text weight="medium" style={styles.sectionLabel}>
            Video Consultation
          </Text>
          <View style={styles.detailRow}>
            <Image
              source={appointmentAssets.icons.calendarIcon}
              style={styles.detailIcon}
            />
            <Text weight="regular" style={styles.detailValue}>
              {summary.dateTime}
            </Text>
          </View>
        </View>

        <View style={styles.notesSection}>
          <Text weight="medium" style={styles.notesLabel}>
            Notes
          </Text>
          <Text weight="regular" style={styles.notesText}>
            {summary.notes}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button onPress={() => {}} style={styles.primaryButton}>
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
            onPress={() => {}}
            style={styles.secondaryButton}
          >
            Message provider
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
    gap: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: Colors.black100,
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
