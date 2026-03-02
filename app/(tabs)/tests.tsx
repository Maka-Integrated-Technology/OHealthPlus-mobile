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
import { messagesAssets } from "@/features/messages/assets";
import { FlatList, Image, StyleSheet, View } from 'react-native';


export default function Tests() {
    const router = useAppRouter();

    const QuickAction = [
        { icon: appointmentAssets.icons.bookappointment, onPress: () => { router.toBookAppointments() }, description: `Book a \n consultation` },
        { icon: appointmentAssets.icons.bookconsultation, onPress: () => { }, description: `View your \n appointments` },
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
        {
            id: "4",
            image: { uri: "https://randomuser.me/api/portraits/men/76.jpg" },
            name: "Dr. Chidi Nwosu",
            type: "chat" as const,
            time: "Mon, 19 • 11:15 AM",
        },
    ];


    return (
        <Screen>
            <View style={styles.homeHeader}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 6 }}>
                    <Pressable onPress={() => router.toProfile()} >
                        <Image source={avatar} style={{ height: 48, width: 48, resizeMode: 'contain' }} />
                    </Pressable>
                    <View>
                        <Text weight="bold">Hello, Olivia Jane</Text>
                        <Text style={{ color: Colors.neutral }}>Welcome back</Text>
                    </View>
                </View>

                <Pressable style={{ alignItems: 'center' }}>
                    <Image style={{ height: 24, resizeMode: 'contain' }} source={notificationIcon} />
                </Pressable>
            </View>


            <View style={styles.homeCTA}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 6 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ height: 34, width: 34, resizeMode: 'contain' }} source={messagesAssets.icons.splashIcon} />
                    </View>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 20 }} weight="bold">
                            Ask Health Assistant
                        </Text>
                        <Text style={{ color: Colors.neutral, width: '100%' }}>
                            {`Get guidance, understand symptoms, and \nfind the right care.`}
                        </Text>
                    </View>
                </View>

                <Button onPress={() => router.toHome()} >Start Conversation →</Button>
            </View>

            <View style={styles.quickActions}>
                <Text style={styles.quickActionHeader}>Quick Actions</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>

                    {
                        QuickAction.map((action, idx) => (
                            <Pressable onPress={action.onPress} key={idx} style={{ flex: 1, backgroundColor: Colors.lightBeige, borderColor: Colors.homeneutral, borderWidth: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12 }}>

                                <Image style={{ height: 48, width: 48, resizeMode: 'cover', }} source={action.icon} />

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>{action.description}</Text>
                                </View>
                            </Pressable>
                        ))
                    }


                </View>

            </View>

            <View style={styles.upcomingAppointmnts}>
                <View style={styles.upcomingAppointmntsHeader}>
                    <Text style={styles.quickActionHeader}>Upcoming Appointments</Text>
                    <Pressable>
                        <Text weight="semibold" style={{ color: Colors.primary, fontSize: 18 }}>View All</Text>
                    </Pressable>
                </View>


                <FlatList
                    data={appointments}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <AppointmentCard
                            image={item.image}
                            name={item.name}
                            type={item.type}
                            time={item.time}
                        />
                    )}
                />


            </View>


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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        borderColor: Colors.homeneutral,
        borderBottomWidth: 1,
    },
    homeCTA: {
        backgroundColor: Colors.transparentPrimary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        flexDirection: 'column',
        gap: 8,
        marginTop: 16
    },
    quickActions: {
        marginTop: 12,
        flexDirection: 'column',
        gap: 12,


    },
    quickActionHeader: {
        fontSize: 18
    },
    upcomingAppointmnts: {
        marginTop: 16,
        flex: 1,
    },
    upcomingAppointmntsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        // fontSize: 20
    },

    list: {
        marginTop: 8,
        gap: 12,
        paddingBottom: "30%"
    },
});
