import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

const CHECKS = [
  { label: "System check", status: "All checks", icon: "checkmark-circle" as const },
  { label: "Speaker", status: "Last tested", icon: "volume-high" as const },
  { label: "Camera", status: "Ready", icon: "videocam" as const },
  { label: "Microphone", status: "Ready", icon: "mic" as const },
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
        <View style={styles.checksList}>
          {CHECKS.map((check) => (
            <View key={check.label} style={styles.checkRow}>
              <View style={styles.checkLeft}>
                <Ionicons
                  name={check.icon}
                  size={22}
                  color={Colors.primary}
                  style={styles.checkIcon}
                />
                <Text weight="medium" style={styles.checkLabel}>
                  {check.label}
                </Text>
              </View>
              <Text weight="regular" style={styles.checkStatus}>
                {check.status}
              </Text>
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
    justifyContent: "space-between",
  },
  checksList: {
    gap: 16,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral200,
  },
  checkLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  checkLabel: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  checkStatus: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: Colors.neutral,
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
