import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { labsData } from "@/features/labs/constants/labs";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function BookingConfirmed() {
  const router = useAppRouter();
  const { labId, bookingId } = useLocalSearchParams<{
    labId?: string;
    bookingId?: string;
  }>();
  const lab = labsData.find((l) => l.id === labId) ?? labsData[0];

  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.introGroup}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={48} color={Colors.primary} />
          </View>
          <Text weight="bold" style={styles.title}>
            Booking Confirmed!
          </Text>
          <Text weight="regular" style={styles.description}>
            Your appointment at {lab.name} has been successfully booked.
          </Text>
        </View>

        <View style={styles.idCard}>
          <Text weight="regular" style={styles.idLabel}>
            Booking ID
          </Text>
          <Text weight="bold" style={styles.idValue}>
            #{bookingId ?? "LAB-9482-XY"}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button onPress={() => router.toHome()}>Back to Home</Button>
          <Button type="clear" onPress={() => router.back()} style={styles.viewBookingButton}>
            View Booking
          </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  introGroup: {
    alignItems: "center",
    gap: 18,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.lightGray2,
    textAlign: "center",
  },
  idCard: {
    backgroundColor: "#FCFCFD",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingVertical: 11,
    paddingHorizontal: 17,
    width: "100%",
  },
  idLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },
  idValue: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.9,
    color: "#0F172A",
    marginTop: 4,
  },
  actions: {
    width: "100%",
    gap: 12,
  },
  viewBookingButton: {
    borderColor: Colors.neutral200,
    borderRadius: 12,
  },
});
