import { BackButton } from "@/components/BackButton";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useAppRouter } from "@/config/route";
import { appointmentAssets } from "@/features/appointments/assets";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function ConfirmAppointment() {
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
        role: "General Doctor",
        image: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
    };

    const consultationFee = 5000;
    const discount = 0;
    const total = consultationFee - discount;

    const formatNaira = (amount: number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);

    const handlePayment = (paymentMethod: 'apple' | 'google') => {
        // TODO: Process payment
        router.toAppointmentConfirmed({
            professionalId: professional.id,
            consultationType: consultationType,
            date: date,
            time: time,
        });
    };

    return (
        <Screen>
            <View style={styles.header}>
                <BackButton style={{ marginBottom: 0 }} />
                <Text weight="semibold" style={styles.headerTitle}>Confirm Appointment</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                {/* Doctor Details */}
                <View style={styles.doctorSection}>
                    <Image source={professional.image} style={styles.doctorImage} />
                    <View style={styles.doctorInfo}>
                        <Text weight="semibold" style={styles.doctorName}>{professional.name}</Text>
                        <Text weight="regular" style={styles.doctorRole}>{professional.role}</Text>
                    </View>
                </View>

                {/* Appointment Details */}
                <View style={styles.section}>
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

                {/* Payment Summary */}
                <View style={styles.section}>
                    <Text weight="semibold" style={styles.sectionTitle}>Payment Summary</Text>
                    <View style={styles.paymentRow}>
                        <Text weight="regular" style={styles.paymentLabel}>Consultation fee</Text>
                        <Text weight="medium" style={styles.paymentValue}>{formatNaira(consultationFee)}</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text weight="regular" style={styles.paymentLabel}>Discount</Text>
                        <Text weight="medium" style={styles.paymentValue}>{formatNaira(discount)}</Text>
                    </View>
                    <View style={[styles.paymentRow, styles.totalRow]}>
                        <Text weight="semibold" style={styles.totalLabel}>Total</Text>
                        <Text weight="semibold" style={styles.totalValue}>{formatNaira(total)}</Text>
                    </View>
                    <Text weight="regular" style={styles.noteText}>
                        You'll receive a reminder before your appointment. You can cancel or reschedule if needed.
                    </Text>
                </View>
            </ScrollView>

            {/* Payment Options */}
            <View style={styles.paymentSection}>
                <Pressable
                    onPress={() => handlePayment('apple')}
                    style={styles.applePayButton}
                >
                    <Text style={styles.applePayIcon}>🍎</Text>
                    <Text weight="medium" style={styles.applePayText}>Pay with Apple Pay</Text>
                </Pressable>
                <Pressable
                    onPress={() => handlePayment('google')}
                    style={styles.googlePayButton}
                >
                    <Image 
                        source={{ uri: 'https://www.gstatic.com/images/branding/product/1x/google_g_64dp.png' }} 
                        style={styles.googlePayIcon}
                    />
                    <Text weight="medium" style={styles.googlePayText}>Pay with Google Pay</Text>
                </Pressable>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontSize: 18,
        lineHeight: 19.8,
        letterSpacing: -0.8,
        color: Colors.black100,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    doctorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    doctorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    doctorRole: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: '#1570EF',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: '#1A1A1A',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
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
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    paymentLabel: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.neutral,
    },
    paymentValue: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.primary,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.homeneutral,
    },
    totalLabel: {
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.5,
        color: '#1A1A1A',
    },
    totalValue: {
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.5,
        color: Colors.primary,
    },
    noteText: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: -0.2,
        color: Colors.neutral,
        marginTop: 12,
    },
    paymentSection: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.homeneutral,
        gap: 12,
    },
    applePayButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        gap: 10,
    },
    applePayIcon: {
        fontSize: 20,
    },
    applePayText: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: 'white',
    },
    googlePayButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.homeneutral,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        gap: 10,
    },
    googlePayIcon: {
        width: 20,
        height: 20,
    },
    googlePayText: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: '#1A1A1A',
    },
});
