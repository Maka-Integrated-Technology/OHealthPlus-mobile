import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import clock_icon from "@/features/appointments/assets/icons/clock.png";
import message_icon from "@/features/appointments/assets/icons/message_icon.png";
import rating_icon from "@/features/appointments/assets/icons/rating_icon.png";
import verification_icon from "@/features/appointments/assets/icons/verification_icon.png";
import video_icon from "@/features/appointments/assets/icons/video_icon.png";
import { Professional } from "@/features/appointments/types/Professional";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

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
                <View style={styles.doctorDetailsContainer}>
                    <View style={styles.ProfessionalImage}>
                        <Image
                            source={professional.image}
                            style={{ width: '100%', height: '100%', zIndex: -1, borderRadius: 12 }}
                        />

                        <View style={{ position: 'absolute', top: -10, zIndex: 22, right: -4, padding: 4, backgroundColor: Colors.lightBeige, borderRadius: 999 }}>
                            <Image
                                source={verification_icon}
                                style={{ height: 20, width: 20, }}
                            />
                        </View>
                    </View>


                    <View style={{ flex: 1, gap: 12 }}>
                        <View style={styles.availabilityBadge}>
                            <Image source={clock_icon} style={{ width: 16, height: 16 }} />
                            <Text weight="medium" style={styles.availabilityText}>Available today</Text>
                        </View>
                        <View style={{ gap: 8 }}>
                            <View style={{ gap: 6 }}>
                                <Text weight="semibold" style={styles.name}>{professional.name}</Text>
                                <Text weight="regular" style={styles.role}>{professional.role}</Text>
                                <Text weight="regular" style={styles.role}>8 yrs experience</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <View style={styles.ratingBox}>
                                    <Image source={rating_icon} style={{ width: 14, height: 14 }} />
                                    <Text weight="medium" style={styles.rating}>{professional.rating}</Text>
                                </View>
                                <Text weight="regular" style={styles.reviews}>({professional.reviews} revews)</Text>
                            </View>
                        </View>
                    </View>

                </View>

                {/* About Section */}
                <View style={styles.aboutSection}>
                    <Text weight="semibold" style={styles.name}>About</Text>
                    <Text weight="regular" style={styles.aboutText}>
                        A seasoned general practitioner dedicated to ensuring patient-centered care and promoting preventive health behaviors.
                    </Text>
                </View>

                {/* Consultation Type Selection */}
                <View style={styles.consultationTypeSection}>
                    <Text weight="semibold" style={styles.name}>Choose Consultation Type</Text>
                    <View style={styles.consultationOptions}>
                        <Pressable
                            onPress={() => setConsultationType("chat")}
                            style={[
                                styles.consultationOption,
                                consultationType === "chat" && styles.consultationOptionSelected
                            ]}
                        >
                            <Image source={message_icon} style={{ width: 32, height: 32 }} />
                            <Text weight="regular" style={styles.consultationOptionText}>Chat Consultation</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setConsultationType("video")}
                            style={[
                                styles.consultationOption,
                                consultationType === "video" && styles.consultationOptionSelected
                            ]}
                        >
                            <Image source={video_icon} style={{ width: 32, height: 32 }} />
                            <Text weight="regular" style={styles.consultationOptionText}>Video Consultation</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text weight="regular" style={styles.feeText}>
                    Consultation Fee{" "}
                    <Text weight="semibold" style={styles.feeAmount}>
                        {formatNaira(professional.consultationfee)}
                    </Text>
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
        marginBottom: 4,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        gap: 12,
        paddingBottom: 100,
    },
    doctorDetailsContainer: {
        flexDirection: "row",
        gap: 12,
        backgroundColor: Colors.lightBeige,
        padding: 14,
        borderRadius: 16,
    },
    ProfessionalImage: {
        height: 130,
        aspectRatio: 1 / 1,
        borderRadius: 12,
    },
    name: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: Colors.black200,
    },
    role: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: Colors.neutral,
    },
    rating: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: 0,
        color: Colors.black200,
    },
    reviews: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
        color: Colors.neutral,
    },
    availabilityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    availabilityText: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: Colors.blue400,
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
    aboutSection: {
        flexDirection: "column",
        gap: 8,
        backgroundColor: Colors.lightBeige,
        padding: 14,
        borderRadius: 16,
    },
    consultationTypeSection: {
        flexDirection: "column",
        gap: 14,
        paddingTop: 8,
    },
    aboutText: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: Colors.neutral,
    },
    consultationOptions: {
        gap: 12,
    },
    consultationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.homeneutral,
        backgroundColor: Colors.lightBeige,
    },
    consultationOptionSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.transparentPrimary,
    },
    consultationOptionText: {
        fontSize: 16,
        lineHeight: 19.2,
        letterSpacing: -0.8,
        color: Colors.black200,
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
        color: '#6C737F',
        flex: 1,
    },
    feeAmount: {
        fontSize: 18,
        lineHeight: 18 * 1.1,
        letterSpacing: -0.8,
        color: '#155EEF',
        fontWeight: '600',
    },
    bookButton: {
        flex: 1,
        maxWidth: 200,
    },
});
