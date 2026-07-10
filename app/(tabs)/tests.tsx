import notificationIcon from "@/assets/icons/notification.png";
import Avatar, { AvatarFallback } from "@/components/Avatar";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import AppointmentCard from "@/features/appointments/components/AppointmentCard";
import { useBookings } from "@/features/appointments/hooks/useAppointments";
import {
  formatBookingDateTime,
  isUpcomingBooking,
} from "@/features/appointments/utils/formatters";
import { useGetMe } from "@/features/auth/hooks/useAuth";
import { messagesAssets } from "@/features/messages/assets";
import { getInitials } from "@/utils/avatar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";

export default function Tests() {
  const router = useAppRouter();
  const { data: user } = useGetMe();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  const displayName = user ? `${user.first_name} ${user.last_name}` : "there";

  const upcomingBookings = (bookings ?? [])
    .filter(isUpcomingBooking)
    .sort(
      (a, b) =>
        new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime(),
    )
    .slice(0, 4);

  const QuickAction = [
    {
      icon: appointmentAssets.icons.bookappointment,
      onPress: () => {
        router.toBookAppointments();
      },
      description: `Book a \n consultation`,
    },
    {
      icon: appointmentAssets.icons.bookconsultation,
      onPress: () => {
        router.replace("/(tabs)/appointments" as any);
      },
      description: `View your \n appointments`,
    },
  ];

  return (
    <Screen>
      <View style={styles.homeHeader}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Pressable onPress={() => router.toProfile()}>
            <Avatar
              imageUrl={undefined}
              size="lg"
              rounded="full"
              accessibilityLabel={displayName}
            >
              <AvatarFallback size="lg" rounded="full">
                {getInitials(user?.first_name, user?.last_name)}
              </AvatarFallback>
            </Avatar>
          </Pressable>
          <View>
            <Text weight="bold">Hello, {displayName}</Text>
            <Text style={{ color: Colors.neutral }}>Welcome back</Text>
          </View>
        </View>

        <Pressable style={{ alignItems: "center" }}>
          <Image
            style={{ height: 24, resizeMode: "contain" }}
            source={notificationIcon}
          />
        </Pressable>
      </View>

      <View style={styles.homeCTA}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ height: 34, width: 34, resizeMode: "contain" }}
              source={messagesAssets.icons.splashIcon}
            />
          </View>
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={{ fontSize: 20 }} weight="bold">
              Ask Health Assistant
            </Text>
            <Text style={{ color: Colors.neutral, width: "100%" }}>
              {`Get guidance, understand symptoms, and \nfind the right care.`}
            </Text>
          </View>
        </View>

        <Button onPress={() => router.toAIHealthAssistant()}>
          Start Conversation →
        </Button>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickActionHeader}>Quick Actions</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {QuickAction.map((action, idx) => (
            <Pressable
              onPress={action.onPress}
              key={idx}
              style={{
                flex: 1,
                backgroundColor: Colors.lightBeige,
                borderColor: Colors.homeneutral,
                borderWidth: 2,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                borderRadius: 12,
              }}
            >
              <Image
                style={{ height: 48, width: 48, resizeMode: "cover" }}
                source={action.icon}
              />

              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {action.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.upcomingAppointmnts}>
        <View style={styles.upcomingAppointmntsHeader}>
          <Text style={styles.quickActionHeader}>Upcoming Appointments</Text>
          <Pressable
            onPress={() => router.replace("/(tabs)/appointments" as any)}
          >
            <Text
              weight="semibold"
              style={{ color: Colors.primary, fontSize: 18 }}
            >
              View All
            </Text>
          </Pressable>
        </View>

        {bookingsLoading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 8 }} />
        ) : upcomingBookings.length === 0 ? (
          <Text
            style={{
              color: Colors.neutral,
              textAlign: "center",
              paddingVertical: 16,
            }}
          >
            No upcoming appointments.
          </Text>
        ) : (
          <FlatList
            data={upcomingBookings}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <AppointmentCard
                imageUrl={item.professional_image}
                name={item.professional_name}
                type={item.consultation_type}
                time={formatBookingDateTime(
                  item.booking_date,
                  item.booking_time,
                )}
                onPress={() => router.toAppointmentDetails({ id: item.id })}
              />
            )}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderColor: Colors.homeneutral,
    borderBottomWidth: 1,
  },
  homeCTA: {
    backgroundColor: Colors.transparentPrimary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
  quickActions: {
    marginTop: 12,
    flexDirection: "column",
    gap: 12,
  },
  quickActionHeader: {
    fontSize: 18,
  },
  upcomingAppointmnts: {
    marginTop: 16,
    flex: 1,
  },
  upcomingAppointmntsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    // fontSize: 20
  },

  list: {
    marginTop: 8,
    gap: 12,
    paddingBottom: "30%",
  },
});
