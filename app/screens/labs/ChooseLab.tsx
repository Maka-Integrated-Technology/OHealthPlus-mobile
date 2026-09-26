import { BackButton } from "@/components/BackButton";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import LabCard from "@/features/labs/components/LabCard";
import { labsData } from "@/features/labs/constants/labs";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const FILTERS = ["Near me", "Home Collection", "Top Rated", "Lowest Price"] as const;

export default function ChooseLab() {
  const router = useAppRouter();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>(
    "Near me"
  );

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Choose Laboratory
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        style={styles.filtersScroll}
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <Text
                weight={isActive ? "semibold" : "medium"}
                style={[
                  styles.filterChipText,
                  isActive && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {labsData.map((lab) => (
          <LabCard
            key={lab.id}
            lab={lab}
            onPress={() => router.toLabOverview({ labId: lab.id })}
          />
        ))}
      </ScrollView>
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
  filtersScroll: {
    flexGrow: 0,
    marginBottom: 20,
  },
  filters: {
    gap: 8,
  },
  filterChip: {
    backgroundColor: Colors.homeneutral,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 17,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black300,
  },
  filterChipTextActive: {
    color: "white",
  },
  list: {
    gap: 29,
    paddingBottom: 24,
  },
});
