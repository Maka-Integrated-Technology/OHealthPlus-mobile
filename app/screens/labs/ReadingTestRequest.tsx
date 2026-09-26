import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function ReadingTestRequest() {
  const router = useAppRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(ROUTES.EXTRACTED_TESTS);
    }, 1800);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Upload Test Request
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <View style={styles.iconCircle}>
            <Ionicons name="document-text" size={64} color={Colors.primary} />
          </View>
          <View style={styles.scanLine} />
        </View>
        <View style={styles.textWrap}>
          <Text weight="semibold" style={styles.title}>
            Reading Your Request
          </Text>
          <Text weight="regular" style={styles.description}>
            Our AI is identifying your requested laboratory tests.
          </Text>
        </View>
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
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 33,
    paddingHorizontal: 40,
  },
  iconWrap: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 24,
    backgroundColor: Colors.lightBlue,
    opacity: 0.82,
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  textWrap: {
    gap: 7,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 32,
    color: Colors.black100,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    textAlign: "center",
  },
});
