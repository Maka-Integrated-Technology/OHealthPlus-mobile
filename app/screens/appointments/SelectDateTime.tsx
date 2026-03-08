import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function generateDates() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const label =
            i === 0 ? "Today" :
                i === 1 ? "Tomorrow" :
                    `${days[d.getDay()]}, ${getOrdinal(d.getDate())}`;
        return {
            id: d.toISOString().split("T")[0],
            label,
            dateObj: d,
        };
    });
}

export default function SelectDateTime() {
    const router = useAppRouter();
    const { professionalId, consultationType } = useLocalSearchParams<{
        professionalId?: string;
        consultationType?: string;
    }>();

    const availableDates = generateDates();
    const [selectedDate, setSelectedDate] = useState<string>(availableDates[1].id); // default tomorrow
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const consultationFee = 15000;

    // TODO: Fetch real slots — dummy data keyed by date id
    const slotsByDate: Record<string, { time: string; available: boolean }[]> = {
        [availableDates[1].id]: [
            { time: "9:00 AM", available: true },
            { time: "10:30 AM", available: true },
            { time: "9:00 AM", available: false },
            { time: "3:00 PM", available: true },
        ],
    };

    const availableTimes = slotsByDate[selectedDate] ?? [];

    const formatNaira = (amount: number) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(amount);

    const handleBookNow = () => {
        if (selectedTime) {
            router.toConfirmAppointment({
                professionalId,
                consultationType,
                date: availableDates.find(d => d.id === selectedDate)?.label,
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
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateScrollContent}
                    >
                        {availableDates.map((date) => (
                            <Pressable
                                key={date.id}
                                onPress={() => {
                                    setSelectedDate(date.id);
                                    setSelectedTime(null);
                                }}
                                style={[
                                    styles.dateButton,
                                    selectedDate === date.id && styles.dateButtonSelected,
                                ]}
                            >
                                <Text
                                    weight={selectedDate === date.id ? "semibold" : "regular"}
                                    style={[
                                        styles.dateButtonText,
                                        selectedDate === date.id && styles.dateButtonTextSelected,
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
                                <View key={index} style={styles.timeButtonWrapper}>
                                    <Pressable
                                        onPress={() => slot.available && setSelectedTime(slot.time)}
                                        disabled={!slot.available}
                                        style={[
                                            styles.timeButton,
                                            !slot.available && styles.timeButtonDisabled,
                                            selectedTime === slot.time && slot.available && styles.timeButtonSelected,
                                        ]}
                                    >
                                        <Text
                                            weight={selectedTime === slot.time && slot.available ? "medium" : "regular"}
                                            style={[
                                                styles.timeButtonText,
                                                !slot.available && styles.timeButtonTextDisabled,
                                                selectedTime === slot.time && slot.available && styles.timeButtonTextSelected,
                                            ]}
                                        >
                                            {slot.time}
                                        </Text>
                                    </Pressable>
                                </View>
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
                            This professional is unavailable on the selected date. Choose another date.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            {availableTimes.length > 0 && (
                <View style={styles.bottomBar}>
                    <View style={styles.feeContainer}>
                        <Text weight="regular" style={styles.feeLabel}>Consultation Fee</Text>
                        <Text weight="semibold" style={styles.feeAmount}>{formatNaira(consultationFee)}</Text>
                    </View>
                    <Button
                        onPress={handleBookNow}
                        style={[styles.bookButton, !selectedTime && styles.bookButtonDisabled]}
                    >
                        Book Now
                    </Button>
                </View>
            )}
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
        flexDirection: "row",
        alignItems: "center",
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
        paddingBottom: 110,
    },
    dateSelector: {
        marginBottom: 28,
    },
    dateScrollContent: {
        gap: 8,
        paddingHorizontal: 2,
    },
    dateButton: {
        padding: 14,
        borderRadius: 16,
        backgroundColor: Colors.beige,
    },
    dateButtonSelected: {
        backgroundColor: Colors.blue600,
    },
    dateButtonText: {
        fontSize: 14,
        lineHeight: 14 * 1.2,
        letterSpacing: -0.5,
        color: Colors.black200,
    },
    dateButtonTextSelected: {
        color: "white",
    },
    timesSection: {
        gap: 14,
        marginBottom: 24,
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 16,
        lineHeight: 17.6,
        color: Colors.black100,
    },
    timesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    timeButtonWrapper: {
        width: "48%",
    },
    timeButton: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: Colors.lightBeige,
        borderWidth: 1,
        borderColor: Colors.homeneutral,
        alignItems: "center",
        width: "100%",
    },
    timeButtonDisabled: {
        borderColor: "transparent",
        backgroundColor: Colors.lightBeige,
    },
    timeButtonSelected: {
        backgroundColor: Colors.blue600,
        borderColor: Colors.blue600,
    },
    timeButtonText: {
        fontSize: 14,
        lineHeight: 14 * 1.2,
        // letterSpacing: -0.3,
        color: Colors.black200,
        textAlign: "center",
    },
    timeButtonTextDisabled: {
        color: Colors.neutral300,
    },
    timeButtonTextSelected: {
        color: "white",
    },
    noSlotsContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    noSlotsIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.homeneutral,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    noSlotsIconText: {
        fontSize: 36,
    },
    noSlotsTitle: {
        fontSize: 16,
        lineHeight: 16 * 1.1,
        // letterSpacing: -0.8,
        color: Colors.neutral,
        marginBottom: 8,
    },
    noSlotsText: {
        fontSize: 14,
        lineHeight: 14 * 1.2,
        letterSpacing: -0.5,
        color: Colors.neutral,
        textAlign: "center",
        paddingHorizontal: 30,
    },
    feeContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 2,
    },
    feeLabel: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
        color: Colors.neutral600,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: Colors.homeneutral,
        gap: 12,
    },
    feeText: {
        fontSize: 12,
        lineHeight: 12 * 1.2,
        letterSpacing: -0.2,
        color: Colors.neutral600,
        flex: 1,
    },
    feeAmount: {
        fontSize: 18,
        lineHeight: 19.8,
        letterSpacing: -0.8,
        color: Colors.background,
        fontWeight: '600',
    },
    bookButton: {
        flex: 1,
        maxWidth: 200,
    },
    bookButtonDisabled: {
        opacity: 0.4,
    },
});