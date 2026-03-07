import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useAppRouter } from "@/config/route";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

export default function SelectDateTime() {
    const router = useAppRouter();
    const { professionalId, consultationType } = useLocalSearchParams<{ professionalId?: string; consultationType?: string }>();
    const [selectedDate, setSelectedDate] = useState<string>("tomorrow");
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // TODO: Fetch available slots based on professionalId and selectedDate
    // For now, using dummy data
    const consultationFee = 5000;
    const availableDates = [
        { id: "today", label: "Today", date: "Wed, 14" },
        { id: "tomorrow", label: "Tomorrow", date: "Thu, 15" },
        { id: "thu22", label: "Thu 22", date: "Thu, 22" },
        { id: "fri23", label: "Fri 23", date: "Fri, 23" },
    ];

    const availableTimes = selectedDate === "tomorrow" 
        ? [
            { time: "9:00 AM", available: true },
            { time: "10:30 AM", available: true },
            { time: "1:00 PM", available: false },
            { time: "3:00 PM", available: false },
        ]
        : [];

    const formatNaira = (amount: number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);

    const handleBookNow = () => {
        if (selectedTime) {
            router.toConfirmAppointment({
                professionalId: professionalId,
                consultationType: consultationType,
                date: availableDates.find(d => d.id === selectedDate)?.date,
                time: selectedTime,
            });
        }
    };

    return (
        <Screen>
            <View style={styles.header}>
                <BackButton style={{ marginBottom: 0 }} />
                <Text weight="semibold" style={styles.headerTitle}>Select Date & Time</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                {/* Date Selector */}
                <View style={styles.dateSelector}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScrollContent}>
                        {availableDates.map((date) => (
                            <Pressable
                                key={date.id}
                                onPress={() => {
                                    setSelectedDate(date.id);
                                    setSelectedTime(null);
                                }}
                                style={[
                                    styles.dateButton,
                                    selectedDate === date.id && styles.dateButtonSelected
                                ]}
                            >
                                <Text 
                                    weight={selectedDate === date.id ? "semibold" : "regular"} 
                                    style={[
                                        styles.dateButtonText,
                                        selectedDate === date.id && styles.dateButtonTextSelected
                                    ]}
                                >
                                    {date.label}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* Available Times */}
                {availableTimes.length > 0 ? (
                    <View style={styles.timesSection}>
                        <Text weight="semibold" style={styles.sectionTitle}>Available Times</Text>
                        <View style={styles.timesGrid}>
                            {availableTimes.map((slot, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => slot.available && setSelectedTime(slot.time)}
                                    disabled={!slot.available}
                                    style={[
                                        styles.timeButton,
                                        !slot.available && styles.timeButtonDisabled,
                                        selectedTime === slot.time && styles.timeButtonSelected
                                    ]}
                                >
                                    <Text 
                                        weight={selectedTime === slot.time ? "medium" : "regular"}
                                        style={[
                                            styles.timeButtonText,
                                            !slot.available && styles.timeButtonTextDisabled,
                                            selectedTime === slot.time && styles.timeButtonTextSelected
                                        ]}
                                    >
                                        {slot.time}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.noSlotsContainer}>
                        <View style={styles.noSlotsIcon}>
                            <Text style={styles.noSlotsIconText}>📅</Text>
                        </View>
                        <Text weight="semibold" style={styles.noSlotsTitle}>No available slots</Text>
                        <Text weight="regular" style={styles.noSlotsText}>
                            This professional is unavailable on this date. Choose another date.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text weight="regular" style={styles.feeText}>
                    Consultation fee {formatNaira(consultationFee)}
                </Text>
                <Button 
                    onPress={handleBookNow} 
                    style={styles.bookButton}
                    disabled={!selectedTime}
                >
                    Book Now
                </Button>
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
        paddingBottom: 100,
    },
    dateSelector: {
        marginBottom: 24,
    },
    dateScrollContent: {
        gap: 12,
        paddingHorizontal: 4,
    },
    dateButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: Colors.lightBeige,
        borderWidth: 1,
        borderColor: Colors.homeneutral,
        marginRight: 12,
    },
    dateButtonSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    dateButtonText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.neutral,
    },
    dateButtonTextSelected: {
        color: 'white',
    },
    timesSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: '#1A1A1A',
        marginBottom: 12,
    },
    timesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    timeButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: Colors.primary,
        minWidth: 100,
    },
    timeButtonDisabled: {
        borderColor: Colors.homeneutral,
        backgroundColor: Colors.lightBeige,
    },
    timeButtonSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    timeButtonText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.primary,
        textAlign: 'center',
    },
    timeButtonTextDisabled: {
        color: Colors.neutral,
    },
    timeButtonTextSelected: {
        color: 'white',
    },
    noSlotsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    noSlotsIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.homeneutral,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    noSlotsIconText: {
        fontSize: 40,
    },
    noSlotsTitle: {
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: -0.5,
        color: '#1A1A1A',
        marginBottom: 8,
    },
    noSlotsText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.neutral,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: Colors.homeneutral,
        gap: 12,
    },
    feeText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: '#1A1A1A',
        flex: 1,
    },
    bookButton: {
        flex: 1,
        maxWidth: 200,
    },
});
