import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import CompletedTestCard from "@/features/labs/components/CompletedTestCard";
import UpcomingTestCard from "@/features/labs/components/UpcomingTestCard";
import {
  completedLabTestsData,
  upcomingLabTestsData,
} from "@/features/labs/constants/myTests";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type TabType = "upcoming" | "completed";

const SPRING_CONFIG = { damping: 28, stiffness: 300, overshootClamping: true };

export default function MyTests() {
  const router = useAppRouter();
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  const pillOffset = useSharedValue(0);
  const tabWidth = useSharedValue(0);

  useEffect(() => {
    pillOffset.value = withSpring(
      activeTab === "upcoming" ? 0 : tabWidth.value + 4,
      SPRING_CONFIG
    );
  }, [activeTab, tabWidth]);

  const handleTabsLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    tabWidth.value = (width - 4 - 8) / 2;
  };

  const pillAnimatedStyle = useAnimatedStyle(() => ({
    width: tabWidth.value,
    transform: [{ translateX: pillOffset.value }],
  }));

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          My Tests
        </Text>
      </View>

      <View style={styles.tabs} onLayout={handleTabsLayout}>
        <Animated.View style={[styles.tabPill, pillAnimatedStyle]} />
        <Pressable style={styles.tab} onPress={() => setActiveTab("upcoming")}>
          <Text
            weight="semibold"
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.tabTextActive,
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => setActiveTab("completed")}>
          <Text
            weight="semibold"
            style={[
              styles.tabText,
              activeTab === "completed" && styles.tabTextActive,
            ]}
          >
            Completed
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {activeTab === "upcoming" ? (
          upcomingLabTestsData.length === 0 ? (
            <Text weight="regular" style={styles.emptyText}>
              No upcoming tests.
            </Text>
          ) : (
            upcomingLabTestsData.map((test) => (
              <UpcomingTestCard key={test.id} test={test} />
            ))
          )
        ) : (
          <>
            {completedLabTestsData.length === 0 ? (
              <Text weight="regular" style={styles.emptyText}>
                No completed tests.
              </Text>
            ) : (
              completedLabTestsData.map((test) => (
                <CompletedTestCard
                  key={test.id}
                  test={test}
                  onViewResults={() =>
                    router.toLabTestResultDetail({ id: test.id })
                  }
                />
              ))
            )}

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Coming soon",
                  "Uploading external results is coming soon."
                )
              }
              style={styles.uploadCard}
            >
              <View style={styles.uploadIcon}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={22}
                  color="#039855"
                />
              </View>
              <Text weight="semibold" style={styles.uploadTitle}>
                Upload External Results
              </Text>
              <Text weight="regular" style={styles.uploadDescription}>
                Have test results from another lab? Store them here.
              </Text>
            </Pressable>
          </>
        )}
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
  tabs: {
    flexDirection: "row",
    backgroundColor: Colors.beige,
    borderRadius: 999,
    marginBottom: 20,
    padding: 4,
    gap: 8,
  },
  tabPill: {
    position: "absolute",
    left: 4,
    top: 4,
    bottom: 4,
    backgroundColor: Colors.white,
    borderRadius: 999,
  },
  tab: {
    flex: 1,
    paddingVertical: 10.5,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.black400,
    textAlign: "center",
  },
  tabTextActive: {
    color: Colors.black200,
  },
  content: {
    gap: 16,
    paddingBottom: 24,
  },
  emptyText: {
    color: Colors.neutral,
    textAlign: "center",
    paddingVertical: 24,
  },
  uploadCard: {
    borderWidth: 1.276,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "rgba(3,152,85,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  uploadDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightGray2,
    textAlign: "center",
  },
});
