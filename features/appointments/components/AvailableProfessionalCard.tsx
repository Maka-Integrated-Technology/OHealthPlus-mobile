import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import rating_icon from "@/features/appointments/assets/icons/rating_icon.png";
import verification_icon from "@/features/appointments/assets/icons/verification_icon.png";
import { Image, StyleSheet, View } from "react-native";
import { Professional } from "../types/Professional";

interface AvailableProfessionalCardProps {
    professional: Professional;
    isSelected?: boolean;
    onSelect?: () => void;
}

export default function AvailableProfessionalCard({ 
    professional, 
    isSelected = false,
    onSelect 
}: AvailableProfessionalCardProps) {
    const router = useAppRouter();

    const formatNaira = (amount: number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);

    const handleCardPress = () => {
        onSelect?.();
    };

    const handleViewProfile = () => {
        router.toProfessionalProfile({ professionalId: professional.id });
    };

    return (
        <Pressable 
            style={[
                styles.container,
                isSelected && styles.containerSelected
            ]}
            onPress={handleCardPress}
        >
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
                <View style={{ gap: 8 }}>
                    <View>
                        <Text weight="semibold" style={styles.name}>{professional.name}</Text>
                        <Text weight="regular" style={styles.role}>{professional.role}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingBox}>
                            <Image source={rating_icon} style={{ width: 14, height: 14 }} />
                            <Text weight="medium" style={styles.rating}>{professional.rating}</Text>
                        </View>
                        <Text weight="regular" style={styles.reviews}>({professional.reviews} revews)</Text>
                    </View>
                </View>

                <Text weight="semibold" style={styles.consultationFee}>{formatNaira(professional.consultationfee)}</Text>
                
                {isSelected && (
                    <Button 
                        onPress={handleViewProfile}
                        style={styles.viewProfileButton}
                    >
                        View Profile →
                    </Button>
                )}
            </View>

        </Pressable >
    )
}



const styles = StyleSheet.create({
    ProfessionalImage: {
        height: 100,
        aspectRatio: 1 / 1,
        borderRadius: 12,
        // overflow: 'hidden', // ✅ clips the image to the border radius
    },
    name: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.8,
        color: Colors.black200,
        marginBottom: 8,
    },
    role: {
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.5,
        color: Colors.primary,
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
    consultationFee: {
        fontSize: 18,
        lineHeight: 19.8,
        letterSpacing: -0.8,
        color: Colors.black300,
    },
    container: {
        flexDirection: "row",
        gap: 12,
        // alignItems: "center",
        borderWidth: 1,
        backgroundColor: Colors.lightBeige,
        borderColor: Colors.homeneutral,
        padding: 14,
        borderRadius: 16,
    },
    containerSelected: {
        borderColor: Colors.primary,
        borderWidth: 2,
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
    viewProfileButton: {
        width: '100%',
        marginTop: 4,
    },
})
