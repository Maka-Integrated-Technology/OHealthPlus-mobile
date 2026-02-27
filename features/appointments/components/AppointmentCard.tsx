// Appointments.tsx
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { appointmentAssets } from "../assets";

interface Props {
    image: ImageSourcePropType;
    name: string;
    type: "video" | "chat";
    time: string;
}

export default function AppointmentCard({ image, name, type, time }: Props) {
    const icons = appointmentAssets.icons;

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.avatar} />

            <View style={styles.info}>
                <Text weight="bold" style={styles.name}>{name}</Text>

                <View style={styles.row}>
                    <Image
                        source={type === "video" ? icons.cameraIcon : icons.chatIcon}
                        style={styles.icon}
                    />
                    <Text style={styles.subText}>
                        {type === "video" ? "Video" : "Chat"} Consultation
                    </Text>
                </View>

                <View style={styles.row}>
                    <Image source={icons.calendarIcon} style={styles.icon} />
                    <Text style={styles.subText}>{time}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        gap: 12,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        borderColor: Colors.homeneutral,
        borderWidth: 2,
        // shadowRadius: 8,
        // shadowOffset: { width: 0, height: 2 },
        // elevation: 2,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 28,
        alignSelf: 'flex-start'
    },
    info: {
        flex: 1,
        gap: 1,
    },
    name: {
        fontSize: 25,
        color: "#111",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    icon: {
        width: 28,
        height: 28,
    },
    subText: {
        fontSize: 16,
        color: Colors.neutral,
    },
});
