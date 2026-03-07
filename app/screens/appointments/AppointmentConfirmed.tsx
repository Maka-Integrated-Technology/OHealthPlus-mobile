import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useAppRouter } from "@/config/route";
import { appointmentAssets } from "@/features/appointments/assets";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function AppointmentConfirmed() {
    const router = useAppRouter();
    const { professionalId, consultationType, date, time } = useLocalSearchParams<{
        professionalId?: string;
        consultationType?: string;
        date?: string;
        time?: string;
    }>();

    // TODO: Fetch professional data based on professionalId
    const professional = {
        id: professionalId || "1",
        name: "Dr. Aisha Bello",
    };

    return (
        <Screen>
            <View style={styles.container}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.successCircle}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                </View>

                {/* Confirmation Message */}
                <Text weight="semibold" style={styles.title}>Appointment Confirmed</Text>
                <Text weight="regular" style={styles.subtitle}>
                    Your consultation with {professional.name} is scheduled.
                </Text>

                {/* Appointment Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text weight="regular" style={styles.detailLabel}>Consultation type</Text>
                        <Text weight="medium" style={styles.detailValue}>
                            {consultationType === "video" ? "Video" : "Chat"} Consultation
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text weight="regular" style={styles.detailLabel}>Date</Text>
                        <View style={styles.detailValueRow}>
                            <Image source={appointmentAssets.icons.calendarIcon} style={styles.detailIcon} />
                            <Text weight="medium" style={styles.detailValue}>{date || "Wed, 14"}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <Text weight="regular" style={styles.detailLabel}>Time</Text>
                        <View style={styles.detailValueRow}>
                            <Image source={appointmentAssets.icons.calendarIcon} style={styles.detailIcon} />
                            <Text weight="medium" style={styles.detailValue}>{time || "10:30 AM"}</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => router.toHome()} 
                        style={styles.primaryButton}
                    >
                        View Appointment
                    </Button>
                    <Button 
                        onPress={() => router.toHome()} 
                        type="secondary"
                        style={styles.secondaryButton}
                    >
                        Back to Dashboard
                    </Button>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    iconContainer: {
        marginBottom: 32,
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        lineHeight: 28.8,
        letterSpacing: -0.8,
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.3,
        color: Colors.neutral,
        textAlign: 'center',
        marginBottom: 40,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: Colors.lightBeige,
        borderRadius: 16,
        padding: 20,
        marginBottom: 40,
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.neutral,
    },
    detailValue: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: '#1A1A1A',
    },
    detailValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailIcon: {
        width: 16,
        height: 16,
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        width: '100%',
    },
    secondaryButton: {
        width: '100%',
    },
});
