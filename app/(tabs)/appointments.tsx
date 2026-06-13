import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useBookings } from "@/features/appointments/hooks/useAppointments";
import type { AppointmentStatus } from "@/features/appointments/components/AppointmentListCard";
import AppointmentListCard from "@/features/appointments/components/AppointmentListCard";
import {
  formatBookingDateTime,
  getImageSource,
  isUpcomingBooking,
} from "@/features/appointments/utils/formatters";
import type { ApiBooking, BookingConsultationType } from "@/features/appointments/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

const SPRING_CONFIG = { damping: 28, stiffness: 300, overshootClamping: true };

function bookingToListStatus(booking: ApiBooking): AppointmentStatus {
  if (isUpcomingBooking(booking)) return "upcoming";
  if (booking.status === "cancelled") return "cancelled";
  return "completed";
}

export default function AppointmentsScreen() {
  const router = useAppRouter();
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [expandedCardId, setExpandedCardId] = useState<string | undefined>();

  const { data: bookings, isLoading, isError, refetch } = useBookings();

  useEffect(() => {
    setExpandedCardId(undefined);
  }, [activeTab]);

  const pillOffset = useSharedValue(0);
  const tabWidth = useSharedValue(0);

  const allBookings = bookings ?? [];
  const upcomingBookings = allBookings
    .filter(isUpcomingBooking)
    .sort(
      (a, b) =>
        new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime()
    );
  const pastBookings = allBookings
    .filter((b) => !isUpcomingBooking(b))
    .sort(
      (a, b) =>
        new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
    );

  const data = activeTab === "upcoming" ? upcomingBookings : pastBookings;

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

  const handleAppointmentPress = (id: string) => {
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

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load appointments.
          </Text>
          <Text weight="medium" style={styles.retryText} onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      ) : data.length === 0 ? (
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            {activeTab === "upcoming"
              ? "No upcoming appointments."
              : "No past appointments."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const status = bookingToListStatus(item);
            const canJoin = isUpcomingBooking(item);
            return (
              <AppointmentListCard
                image={getImageSource(item.professional_image)}
                doctorName={item.professional_name}
                specialization={item.speciality_name}
                consultationType={
                  item.consultation_type as BookingConsultationType
                }
                dateTime={formatBookingDateTime(
                  item.booking_date,
                  item.booking_time
                )}
                status={status}
                canJoin={canJoin}
                isExpanded={expandedCardId === item.id}
                onPress={() =>
                  setExpandedCardId((prev) =>
                    prev === item.id ? undefined : item.id
                  )
                }
                onJoinPress={
                  canJoin ? () => handleAppointmentPress(item.id) : undefined
                }
              />
            );
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  header: {
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: Colors.neutral,
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: Colors.primary,
  },
});
