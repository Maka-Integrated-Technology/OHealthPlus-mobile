import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import AppointmentListCard from "@/features/appointments/components/AppointmentListCard";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

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

export default function AppointmentsScreen() {
  const router = useAppRouter();
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  const data = activeTab === "upcoming" ? UPCOMING_APPOINTMENTS : PAST_APPOINTMENTS;

  const handleAppointmentPress = (id: string) => {
    router.toAppointmentDetails({ id });
  };

  const handleJoinPress = (id: string) => {
    router.toAppointmentDetails({ id });
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text weight="bold" style={styles.title}>
          Appointments
        </Text>

        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === "upcoming" && styles.tabActive]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              weight="medium"
              style={[styles.tabText, activeTab === "upcoming" && styles.tabTextActive]}
            >
              Upcoming
            </Text>
            {activeTab === "upcoming" && <View style={styles.tabIndicator} />}
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "past" && styles.tabActive]}
            onPress={() => setActiveTab("past")}
          >
            <Text
              weight="medium"
              style={[styles.tabText, activeTab === "past" && styles.tabTextActive]}
            >
              Past
            </Text>
            {activeTab === "past" && <View style={styles.tabIndicator} />}
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
            canJoin={item.canJoin}
            onPress={() => handleAppointmentPress(item.id)}
            onJoinPress={
              item.canJoin ? () => handleJoinPress(item.id) : undefined
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
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.homeneutral,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.8,
    color: Colors.black100,
    marginBottom: 16,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  tab: {
    paddingBottom: 12,
    position: "relative",
  },
  tabActive: {},
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.neutral,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 120,
    gap: 12,
  },
});
