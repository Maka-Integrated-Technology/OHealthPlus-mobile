import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useAppRouter } from "@/config/route";
import rating_icon from "@/features/appointments/assets/icons/rating_icon.png";
import { Professional } from "@/features/appointments/types/Professional";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

type ConsultationType = "chat" | "video";

export default function ProfessionalProfile() {
    const router = useAppRouter();
    const { professionalId } = useLocalSearchParams<{ professionalId?: string }>();
    const [consultationType, setConsultationType] = useState<ConsultationType>("chat");

    // TODO: Fetch professional data based on professionalId
    // For now, using dummy data
    const professional: Professional = {
        id: professionalId || "1",
        name: "Dr. Aisha Bello",
        role: "General Doctor",
        reviews: 230,
        rating: 4.9,
        consultationfee: 5000,
        image: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
    };

    const formatNaira = (amount: number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);

    const handleBookNow = () => {
        router.toSelectDateTime({
            professionalId: professional.id,
            consultationType: consultationType,
        });
    };

    return (
        <Screen>
            <View style={styles.header}>
                <BackButton style={{ marginBottom: 0 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                {/* Doctor Details */}
                <View style={styles.doctorSection}>
                    <Image source={professional.image} style={styles.doctorImage} />
                    <View style={styles.doctorInfo}>
                        <View style={styles.availabilityBadge}>
                            <View style={styles.availabilityDot} />
                            <Text weight="regular" style={styles.availabilityText}>Available today</Text>
                        </View>
                        <Text weight="semibold" style={styles.doctorName}>{professional.name}</Text>
                        <Text weight="regular" style={styles.doctorRole}>{professional.role}</Text>
                        <Text weight="regular" style={styles.experience}>8 yrs experience</Text>
                        <View style={styles.ratingContainer}>
                            <View style={styles.ratingBox}>
                                <Image source={rating_icon} style={{ width: 14, height: 14 }} />
                                <Text weight="medium" style={styles.rating}>{professional.rating}</Text>
                            </View>
                            <Text weight="regular" style={styles.reviews}>({professional.reviews} reviews)</Text>
                        </View>
                    </View>
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text weight="semibold" style={styles.sectionTitle}>About</Text>
                    <Text weight="regular" style={styles.aboutText}>
                        A seasoned general practitioner dedicated to ensuring patient-centered care and promoting preventive health behaviors.
                    </Text>
                </View>

                {/* Consultation Type Selection */}
                <View style={styles.section}>
                    <Text weight="semibold" style={styles.sectionTitle}>Choose Consultation Type</Text>
                    <View style={styles.consultationOptions}>
                        <Pressable
                            onPress={() => setConsultationType("chat")}
                            style={[
                                styles.consultationOption,
                                consultationType === "chat" && styles.consultationOptionSelected
                            ]}
                        >
                            <View style={[
                                styles.radioButton,
                                consultationType === "chat" && styles.radioButtonSelected
                            ]}>
                                {consultationType === "chat" && <View style={styles.radioButtonInner} />}
                            </View>
                            <Text weight="regular" style={styles.consultationOptionText}>Chat Consultation</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setConsultationType("video")}
                            style={[
                                styles.consultationOption,
                                consultationType === "video" && styles.consultationOptionSelected
                            ]}
                        >
                            <View style={[
                                styles.radioButton,
                                consultationType === "video" && styles.radioButtonSelected
                            ]}>
                                {consultationType === "video" && <View style={styles.radioButtonInner} />}
                            </View>
                            <Text weight="regular" style={styles.consultationOptionText}>Video Consultation</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text weight="regular" style={styles.feeText}>
                    Consultation fee {formatNaira(professional.consultationfee)}
                </Text>
                <Button onPress={handleBookNow} style={styles.bookButton}>
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
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 100,
    },
    doctorSection: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    doctorInfo: {
        flex: 1,
        gap: 6,
    },
    availabilityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    availabilityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
    },
    availabilityText: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
        color: '#10B981',
    },
    doctorName: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: '#1A1A1A',
    },
    doctorRole: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: '#1570EF',
    },
    experience: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
        color: Colors.neutral,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.lightYellow,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    rating: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: 0,
        color: '#1A1A1A',
    },
    reviews: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
        color: '#4D5761',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: '#1A1A1A',
        marginBottom: 12,
    },
    aboutText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: Colors.neutral,
    },
    consultationOptions: {
        gap: 12,
    },
    consultationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: Colors.homeneutral,
        backgroundColor: Colors.lightBeige,
    },
    consultationOptionSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.transparentPrimary,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.homeneutral,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: Colors.primary,
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    consultationOptionText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: '#1A1A1A',
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
