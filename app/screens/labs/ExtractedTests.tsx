import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import ExtractedTestItem from "@/features/labs/components/ExtractedTestItem";
import {
  extractedTestsData,
  suggestedAdditionalTests,
} from "@/features/labs/constants/extractedTests";
import type { ExtractedTest } from "@/features/labs/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ExtractedTests() {
  const router = useAppRouter();
  const [tests, setTests] = useState<ExtractedTest[]>(extractedTestsData);
  const [nextSuggestionIndex, setNextSuggestionIndex] = useState(0);

  const handleRemove = (id: string) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddAnotherTest = () => {
    const suggestion = suggestedAdditionalTests[nextSuggestionIndex];
    if (!suggestion) return;
    setTests((prev) => [...prev, suggestion]);
    setNextSuggestionIndex((i) => i + 1);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Extracted Tests
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.banner}>
          <Ionicons name="checkmark-circle" size={24} color="#039855" />
          <Text weight="medium" style={styles.bannerText}>
            We successfully read your document and found these tests.
          </Text>
        </View>

        <View style={styles.section}>
          <Text weight="semibold" style={styles.sectionTitle}>
            Found Tests
          </Text>
          <View style={styles.list}>
            {tests.map((test) => (
              <ExtractedTestItem
                key={test.id}
                test={test}
                onRemove={() => handleRemove(test.id)}
              />
            ))}
          </View>
        </View>

        <Pressable
          onPress={handleAddAnotherTest}
          disabled={nextSuggestionIndex >= suggestedAdditionalTests.length}
          style={[
            styles.addButton,
            nextSuggestionIndex >= suggestedAdditionalTests.length && {
              opacity: 0.4,
            },
          ]}
        >
          <Ionicons name="add" size={20} color={Colors.black100} />
          <Text weight="medium" style={styles.addButtonText}>
            Add Another Test
          </Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={() => router.toLabEnableLocation()}
          disabled={tests.length === 0}
        >
          {`Proceed with ${tests.length} test${tests.length === 1 ? "" : "s"}`}
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
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  content: {
    gap: 40,
    paddingBottom: 24,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(209,250,223,0.4)",
    borderWidth: 1,
    borderColor: "rgba(3,152,85,0.5)",
    borderRadius: 12,
    padding: 16,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(3,152,85,0.9)",
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  list: {
    gap: 15,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.276,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 15,
  },
  addButtonText: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black100,
  },
  footer: {
    paddingVertical: 16,
  },
});
