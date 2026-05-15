import AIHealthAssistantIcon from "@/assets/icons/AI-Health-Assistant.png";
import notificationIcon from "@/assets/icons/notification.png";
import avatar from "@/assets/images/avatar.png";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "@/features/appointments/assets";
import AppointmentCard from "@/features/appointments/components/AppointmentCard";
import PremiumUpgradeModal from "@/features/premium/components/PremiumUpgradeModal";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';


export default function TabOneScreen() {
  const router = useAppRouter();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // TODO: Replace with actual API call to check premium status
  const hasPremium = false;

  useEffect(() => {
    // Show modal when user enters home page and doesn't have premium
    if (!hasPremium) {
      setShowPremiumModal(true);
    }
  }, [hasPremium]);

  const handleViewPlans = () => {
    // TODO: Navigate to plans page when implemented
    console.log("Navigate to plans page");
    setShowPremiumModal(false);
  };

  const handleCloseModal = () => {
    setShowPremiumModal(false);
  };

  const QuickAction = [
    { icon: appointmentAssets.icons.bookconsultation, onPress: () => { router.toBookAppointments() }, description: `Book a\nconsultation` },
    { icon: appointmentAssets.icons.bookappointment, onPress: () => { }, description: `Book a\nlab-test` },
  ];

  const appointments = [
    {
      id: "1",
      image: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
      name: "Dr. Aisha Bello",
      type: "video" as const,
      time: "Wed, 14 • 10:30 AM",
    },
    {
      id: "2",
      image: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
      name: "Dr. Emeka Okafor",
      type: "chat" as const,
      time: "Thu, 15 • 2:00 PM",
    },
    {
      id: "3",
      image: { uri: "https://randomuser.me/api/portraits/women/68.jpg" },
      name: "Dr. Ngozi Adeyemi",
      type: "video" as const,
      time: "Fri, 16 • 9:00 AM",
    },
  ];


  return (
    <Screen>
      <View style={styles.homeHeader}>
        <Pressable onPress={() => router.toProfile()} >
          <Image source={avatar} style={{ height: 48, width: 48, resizeMode: 'contain' }} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text weight="semibold" style={styles.greetingText}>
            Hello, Olivia Jane
          </Text>
          <Text weight="regular" style={styles.welcomeText}>Welcome back</Text>
        </View>
        <Pressable style={styles.notificationButton}>
          <Image style={{ height: 24, resizeMode: 'contain' }} source={notificationIcon} />
        </Pressable>
      </View>

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentContainer}>
        <View style={styles.homeCTA}>
          <View style={styles.homeCTAContent}>
            <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={AIHealthAssistantIcon} />
            <View style={{ justifyContent: 'flex-start' }}>
              <Text weight="semibold" style={styles.healthAssistantTitle}>
                Ask Health Assistant
              </Text>
              <Text weight="regular" style={styles.healthAssistantDescription}>
                {`Get guidance, understand symptoms, and \nfind the right care.`}
              </Text>
            </View>
          </View>
          <Button onPress={() => router.toHome()} >Start Conversation →</Button>
        </View>

        <View style={styles.quickActions}>
          <Text weight="regular" style={styles.quickActionHeader}>Quick Actions</Text>
          <View style={styles.quickActionButtons}>
            {
              QuickAction.map((action, idx) => (
                <View key={idx} style={{ flex: 1 }}>
                  <Pressable onPress={action.onPress} style={styles.quickActionButton}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'cover', }} source={action.icon} />
                    <View style={styles.quickActionButtonDescription}>
                      <Text weight="regular" style={styles.quickActionDescription}>{action.description}</Text>
                    </View>
                  </Pressable>
                </View>
              ))
            }
          </View>
        </View>

        <View style={styles.upcomingAppointmnts}>
          <View style={styles.upcomingAppointmntsHeader}>
            <Text weight="regular" style={styles.quickActionHeader}>Upcoming Appointments</Text>
            <Pressable onPress={() => router.replace("/(tabs)/appointments" as any)}>
              <Text weight="medium" style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          <FlatList
            data={appointments}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <AppointmentCard
                image={item.image}
                name={item.name}
                type={item.type}
                time={item.time}
                onPress={() => router.toAppointmentDetails({ id: item.id })}
              />
            )}
          />
        </View>
      </ScrollView>

      <PremiumUpgradeModal
        visible={showPremiumModal}
        onClose={handleCloseModal}
        onViewPlans={handleViewPlans}
      />
    </Screen >
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
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    borderColor: Colors.homeneutral,
    borderBottomWidth: 1,
    gap: 8,
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    paddingTop: 16,
    gap: 24,
    paddingBottom: 24,
  },
  homeCTAContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 6,
  },
  homeCTA: {
    backgroundColor: Colors.transparentPrimary,
    padding: 14,
    borderRadius: 16,
    flexDirection: 'column',
    gap: 24,
  },
  quickActions: {
    flexDirection: 'column',
    gap: 14,
  },
  quickActionHeader: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  quickActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 13,
  },
  quickActionButton: {
    width: '100%',
    backgroundColor: Colors.lightBeige,
    borderColor: Colors.homeneutral,
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  quickActionButtonDescription: {
    alignItems: 'center',
    width: '100%',
  },
  quickActionDescription: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#161A1D',
  },
  greetingText: {
    fontSize: 16,
    lineHeight: 17.6,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.neutral,
    marginTop: 4,
  },
  healthAssistantTitle: {
    fontSize: 16,
    lineHeight: 17.6,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
  healthAssistantDescription: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.lightGray2,
    width: '100%',
    marginTop: 4,
  },
  notificationButton: {
    width: 38,
    height: 38,
    borderRadius: 80,
    backgroundColor: Colors.lightBlue2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingAppointmnts: {
    gap: 14,
  },
  upcomingAppointmntsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  list: {
    gap: 8,
  },
  viewAllText: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.5,
    color: Colors.primary,
  },
});
