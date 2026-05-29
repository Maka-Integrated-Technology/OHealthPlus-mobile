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
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data - replace with API fetch
const APPOINTMENTS: Record<
  string,
  {
    doctorName: string;
    specialization: string;
    image: { uri: string };
    dateTime: string;
    date: string;
    time: string;
    canJoin: boolean;
    consultationType: "video" | "chat";
  }
> = {
  "1": {
    doctorName: "Dr. Aisha Bello",
    specialization: "General Doctor",
    image: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
    dateTime: "Wed 14 • 10:30 AM",
    date: "Wed, 14",
    time: "10:30 AM",
    canJoin: true,
    consultationType: "video",
  },
  "2": {
    doctorName: "Dr. Ayodeji Mayowa",
    specialization: "General Doctor",
    image: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
    dateTime: "Thu 15 • 2:00 PM",
    date: "Thu, 15",
    time: "2:00 PM",
    canJoin: false,
    consultationType: "video",
  },
};

export default function AppointmentDetailsScreen() {
  const router = useAppRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const appointment = id ? APPOINTMENTS[id] : APPOINTMENTS["1"];

  if (!appointment) {
    return null;
  }

  const {
    doctorName,
    specialization,
    image,
    dateTime,
    date,
    time,
    canJoin,
    consultationType,
  } = appointment;

  const professional = {
    name: doctorName,
    role: specialization,
    image,
  };

  const consultationFee = 5000;
  const discount = 0;
  const total = consultationFee - discount;

  const formatNaira = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

  return (
    <Screen>
      <DetailHeader title="Appointment Details" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.detailsContainer}>
          {/* Doctor Details */}
          <View style={styles.doctorDetailsContainer}>
            <View style={styles.ProfessionalImageContainer}>
              <View style={styles.ProfessionalImage}>
                <Image
                  source={professional.image}
                  style={styles.professionalImageStyle}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.verificationBadge}>
                <Image
                  source={verification_icon}
                  style={styles.verificationIcon}
                />
              </View>
            </View>
            <View style={{ gap: 6 }}>
              <Text weight="semibold" style={styles.name}>
                {professional.name}
              </Text>
              <Text weight="regular" style={styles.role}>
                {professional.role}
              </Text>
            </View>
          </View>
          {/* Appointment Details */}
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
                    {date || "Wed, 14"}
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
                    {time || "10:30 AM"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Image
            source={appointmentAssets.icons.infoIcon}
            style={styles.infoIcon}
          />
          <Text weight="regular" style={styles.noteText}>
            Starts in 25 hours
          </Text>
        </View>

        <Text weight="regular" style={styles.noteText}>
          Ensure you have a stable internet connection. Find a quiet place
          before your consultation.
        </Text>
      </ScrollView>

      <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          onPress={() => router.toVideoConsultationSetup({ doctorName })}
          disabled={!canJoin}
          style={styles.primaryButton}
        >
          Join consultation
        </Button>
        <Button
          type="secondary"
          onPress={() => {}}
          style={styles.secondaryButton}
        >
          Reschedule appointment
        </Button>
        <Button
          type="textDestructive"
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          Cancel appointment
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // screen: {
  //   paddingHorizontal: 20,
  // },
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
  radioSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
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
  textButton: {
    width: "100%",
    paddingVertical: 8,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    paddingTop: 8,
    paddingBottom: 12,
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
  content: {
    flex: 1,
  },
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
  detailsContainer: {
    gap: 8,
  },
  doctorDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.lightBeige,
    padding: 14,
    borderRadius: 8,
  },
  ProfessionalImageContainer: {
    height: 56,
    aspectRatio: 1 / 1,
    position: "relative",
  },
  ProfessionalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  professionalImageStyle: {
    width: "100%",
    height: "100%",
  },
  verificationBadge: {
    position: "absolute",
    top: -4,
    right: -3,
    padding: 2,
    backgroundColor: Colors.lightBeige,
    borderRadius: 999,
    zIndex: 10,
  },
  verificationIcon: {
    height: 14,
    width: 14,
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
  appointmentDetailsSection: {
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  consultationTypeDetailRow: {
    flexDirection: "column",
    gap: 12,
  },
  dateTimeDetailRow: {
    flexDirection: "row",
    gap: 12,
  },
  detailRow: {
    gap: 12,
    flex: 1,
  },
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
  detailValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailIcon: {
    width: 20,
    height: 20,
  },
  paymentSummarySection: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 8,
    gap: 8,
    padding: 14,
    marginTop: 16,
  },
  paymentSummaryContent: {
    gap: 12,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 12,
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
    // lineHeight: 16 * 1.1,
    letterSpacing: -0.5,
    color: Colors.black200,
  },
  totalValue: {
    fontSize: 18,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.primary,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.neutral500,
  },
  paymentSection: {
    marginTop: "auto",
    paddingVertical: 16,
    gap: 12,
  },
  paymentButton: {
    width: "100%",
  },
  noteContainer: {
    backgroundColor: Colors.lightBlue2,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoIcon: {
    width: 20,
    height: 20,
  },
});
