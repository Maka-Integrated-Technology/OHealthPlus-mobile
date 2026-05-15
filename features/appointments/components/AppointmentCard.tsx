// Appointments.tsx
import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { appointmentAssets } from "../assets";

interface Props {
    image: ImageSourcePropType;
    name: string;
    type: "video" | "chat";
    time: string;
    onPress?: () => void;
}

export default function AppointmentCard({ image, name, type, time, onPress }: Props) {
    const icons = appointmentAssets.icons;

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.avatar} />

            <View style={styles.info}>
                <Text weight="semibold" style={styles.name}>{name}</Text>

                <View style={styles.row}>
                    <Image
                        source={type === "video" ? icons.cameraIcon : icons.chatIcon}
                        style={styles.icon}
                    />
                    <Text weight="regular" style={styles.subText}>
                        {type === "video" ? "Video" : "Chat"} Consultation
                    </Text>
                </View>

                <View style={styles.row}>
                    <Image source={icons.calendarIcon} style={styles.icon} />
                    <Text weight="regular" style={styles.subText}>{time}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.lightBeige,
        borderRadius: 12,
        padding: 14,
        gap: 12,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        borderColor: Colors.homeneutral,
        borderWidth: 1,
        // shadowRadius: 8,
        // shadowOffset: { width: 0, height: 2 },
        // elevation: 2,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 999,
        alignSelf: 'flex-start',
        resizeMode: 'cover',
    },
    info: {
        flex: 1,
        gap: 6,
    },
    name: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: Colors.black100,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    subText: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: Colors.neutral,
    },
});
