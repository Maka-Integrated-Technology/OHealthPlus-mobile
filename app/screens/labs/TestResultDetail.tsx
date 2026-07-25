import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { completedLabTestsData } from "@/features/labs/constants/myTests";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function TestResultDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const test =
    completedLabTestsData.find((t) => t.id === id) ?? completedLabTestsData[0];

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          My Tests
        </Text>
        <Pressable
          onPress={() =>
            Alert.alert("Coming soon", "Sharing test results is coming soon.")
          }
          style={styles.shareButton}
        >
          <Ionicons name="share-social-outline" size={20} color={Colors.black100} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.titleCard}>
          <Text weight="bold" style={styles.title}>
            {test.testName}
          </Text>
          <Text weight="regular" style={styles.subtitle}>
            {test.labName} • {test.completedDateLabel.replace("Completed on ", "")}
          </Text>
        </View>

        {test.results.map((result) => (
          <View key={result.label} style={styles.resultRow}>
            <View>
              <Text weight="semibold" style={styles.resultLabel}>
                {result.label}
              </Text>
              <Text weight="regular" style={styles.resultRange}>
                {result.normalRangeLabel}
              </Text>
            </View>
            <Text weight="bold" style={styles.resultValue}>
              {result.value}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() =>
            Alert.alert("Coming soon", "Downloading a PDF is coming soon.")
          }
          style={styles.downloadButton}
        >
          <Ionicons name="download-outline" size={18} color={Colors.black100} />
          <Text weight="semibold" style={styles.downloadText}>
            Download PDF
          </Text>
        </Pressable>
        <Button
          onPress={() =>
            Alert.alert("Coming soon", "Booking a consultation is coming soon.")
          }
        >
          Book Consultation
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
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
    textAlign: "center",
  },
  shareButton: {
    width: 40,
    alignItems: "flex-end",
  },
  content: {
    gap: 16,
    paddingBottom: 24,
  },
  titleCard: {
    backgroundColor: Colors.lightBlue2,
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.black100,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightGray2,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 12,
    padding: 16,
  },
  resultLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black100,
  },
  resultRange: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.lightGray2,
    marginTop: 2,
  },
  resultValue: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  footer: {
    gap: 10,
    paddingVertical: 16,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 999,
    paddingVertical: 14,
  },
  downloadText: {
    fontSize: 16,
    color: Colors.black100,
  },
});
