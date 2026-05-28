import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import AppointmentListCard from "@/features/appointments/components/AppointmentListCard";
import { useEffect, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type TabType = "upcoming" | "past";

type AppointmentItem = {
  id: string;
  image: { uri: string };
  doctorName: string;
  specialization: string;
  consultationType: "video";
  dateTime: string;
  status: "upcoming" | "completed";
  canJoin?: boolean;
};

const UPCOMING_APPOINTMENTS: AppointmentItem[] = [
  {
    id: "1",
    image: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
    doctorName: "Dr. Aisha Bello",
    specialization: "General Doctor",
    consultationType: "video" as const,
    dateTime: "Wed 14 • 10:30 AM",
    status: "upcoming" as const,
    canJoin: true,
  },
  {
    id: "2",
    image: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
    doctorName: "Dr. Felix Adeyemi",
    specialization: "General Doctor",
    consultationType: "video" as const,
    dateTime: "Thu 15 • 7:00 PM",
    status: "upcoming" as const,
    canJoin: false,
  },
];

const PAST_APPOINTMENTS: AppointmentItem[] = [
  {
    id: "3",
    image: { uri: "https://randomuser.me/api/portraits/women/68.jpg" },
    doctorName: "Dr. Ngozi Adeyemi",
    specialization: "General Doctor",
    consultationType: "video" as const,
    dateTime: "Mon 10 • 9:00 AM",
    status: "completed" as const,
  },
  {
    id: "4",
    image: { uri: "https://randomuser.me/api/portraits/men/11.jpg" },
    doctorName: "Dr. Chidi Okoro",
    specialization: "General Doctor",
    consultationType: "video" as const,
    dateTime: "Fri 7 • 2:00 PM",
    status: "completed" as const,
  },
  {
    id: "5",
    image: { uri: "https://randomuser.me/api/portraits/women/33.jpg" },
    doctorName: "Dr. Tabitha Baker",
    specialization: "General Doctor",
    consultationType: "video" as const,
    dateTime: "Wed 5 • 11:00 AM",
    status: "completed" as const,
  },
];

const SPRING_CONFIG = { damping: 28, stiffness: 300, overshootClamping: true };

export default function AppointmentsScreen() {
  const router = useAppRouter();
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [expandedCardId, setExpandedCardId] = useState<string | undefined>();

  useEffect(() => {
    setExpandedCardId(undefined);
  }, [activeTab]);

  const pillOffset = useSharedValue(0);
  const tabWidth = useSharedValue(0);

  const data =
    activeTab === "upcoming" ? UPCOMING_APPOINTMENTS : PAST_APPOINTMENTS;

  useEffect(() => {
    pillOffset.value = withSpring(
      activeTab === "upcoming" ? 0 : tabWidth.value + 4,
      SPRING_CONFIG,
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

  const handleAppointmentPress = (id: string) => {
    router.toAppointmentDetails({ id });
  };

  const handleJoinPress = (id: string) => {
    router.toAppointmentDetails({ id });
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text weight="semibold" style={styles.title}>
          Appointments
        </Text>

        <View style={styles.tabs} onLayout={handleTabsLayout}>
          <Animated.View style={[styles.tabPill, pillAnimatedStyle]} />
          <Pressable
            style={styles.tab}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              weight="regular"
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.tabTextActive,
              ]}
            >
              Upcoming
            </Text>
          </Pressable>
          <Pressable style={styles.tab} onPress={() => setActiveTab("past")}>
            <Text
              weight="regular"
              style={[
                styles.tabText,
                activeTab === "past" && styles.tabTextActive,
              ]}
            >
              Past
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AppointmentListCard
            image={item.image}
            doctorName={item.doctorName}
            specialization={item.specialization}
            consultationType={item.consultationType}
            dateTime={item.dateTime}
            status={item.status}
            canJoin={item.status === "upcoming"}
            isExpanded={expandedCardId === item.id}
            onPress={() =>
              setExpandedCardId((prev) =>
                prev === item.id ? undefined : item.id,
              )
            }
            onJoinPress={
              item.status === "upcoming"
                ? () => handleJoinPress(item.id)
                : undefined
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  header: {
    // paddingTop: 16,
    // paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.homeneutral,
  },
  title: {
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
    paddingVertical: 10,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: Colors.beige,
    borderRadius: 999,
    marginVertical: 12,
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
  list: {
    paddingTop: 16,
    paddingBottom: 120,
    gap: 12,
  },
});
