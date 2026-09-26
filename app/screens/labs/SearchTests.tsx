import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import SelectableTestRow from "@/features/labs/components/SelectableTestRow";
import { searchableTestsData } from "@/features/labs/constants/searchableTests";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

export default function SearchTests() {
  const router = useAppRouter();
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return searchableTestsData.filter((test) =>
      test.name.toLowerCase().includes(trimmed)
    );
  }, [query]);

  const toggleTest = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Search Tests
        </Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Search laboratory tests..."
          placeholderTextColor={Colors.neutral400}
          value={query}
          onChangeText={setQuery}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {results.map((test) => (
            <SelectableTestRow
              key={test.id}
              test={test}
              isSelected={selectedIds.includes(test.id)}
              onToggle={() => toggleTest(test.id)}
            />
          ))}
        </ScrollView>
      </View>

      {selectedIds.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text weight="medium" style={styles.selectedLabel}>
              Selected
            </Text>
            <Text weight="bold" style={styles.selectedCount}>
              {selectedIds.length} Test{selectedIds.length === 1 ? "" : "s"}
            </Text>
          </View>
          <Button onPress={() => router.toChooseLab()} style={styles.continueButton}>
            Continue
          </Button>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    paddingTop: 8,
    paddingBottom: 12,
    marginTop: 12,
    marginBottom: 16,
    marginHorizontal: 16,
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
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1.276,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: Colors.black100,
    marginBottom: 8,
  },
  list: {
    paddingTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderColor: Colors.homeneutral,
  },
  selectedLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral,
  },
  selectedCount: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.black100,
  },
  continueButton: {
    paddingHorizontal: 32,
  },
});
