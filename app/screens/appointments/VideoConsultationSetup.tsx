import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

const CHECKS = [
  {
    label: "Internet",
    status: "Stable",
    icon: "cellular" as const,
    statusColor: "#22C55E",
  },
  {
    label: "Camera",
    status: "Ready",
    icon: "videocam" as const,
    statusColor: "#F97316",
  },
  {
    label: "Microphone",
    status: "Ready",
    icon: "mic" as const,
    statusColor: Colors.primary,
  },
];

export default function VideoConsultationSetupScreen() {
  const router = useAppRouter();
  const { doctorName } = useLocalSearchParams<{ doctorName?: string }>();

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <BackButton />
        <Text weight="semibold" style={styles.headerTitle}>
          Video consultation
        </Text>
      </View>

      <View style={styles.content}>
        <Text weight="semibold" style={styles.sectionTitle}>
          System check
        </Text>
        <View style={styles.checksList}>
          {CHECKS.map((check) => (
            <View key={check.label} style={styles.checkRow}>
              <Text weight="medium" style={styles.checkLabel}>
                {check.label}
              </Text>
              <View style={styles.checkRight}>
                <Ionicons
                  name={check.icon}
                  size={20}
                  color={check.statusColor}
                  style={styles.checkIcon}
                />
                <Text
                  weight="regular"
                  style={[styles.checkStatus, { color: check.statusColor }]}
                >
                  {check.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            onPress={() =>
              router.toVideoCall({
                doctorName: doctorName || "Dr. Tabitha Baker",
              })
            }
            style={styles.joinButton}
          >
            Join call
          </Button>
          <Text weight="regular" style={styles.disclaimer}>
            Your healthcare professional will join shortly.
          </Text>
        </View>
      </View>
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
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  content: {
    flex: 1,
    gap: 16,
    // justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: Colors.black100,
    marginBottom: 16,
  },
  checksList: {
    gap: 12,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.lightBeige,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
  },
  checkLabel: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  checkRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  checkStatus: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  actions: {
    paddingBottom: 40,
    gap: 16,
  },
  joinButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: Colors.neutral,
    textAlign: "center",
  },
});
