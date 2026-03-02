import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import rating_icon from "@/features/appointments/assets/icons/rating_icon.png";
import verification_icon from "@/features/appointments/assets/icons/verification_icon.png";
import { Image, StyleSheet, View } from "react-native";
import { Professional } from "../types/Professional";

export default function AvailableProfessionalCard({ professional }: { professional: Professional }) {

    const formatNaira = (amount: number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);

    return (
        <Pressable style={styles.container}>
            <View style={styles.ProfessionalImage}>
                <Image
                    source={professional.image}
                    style={{ width: '100%', height: '100%', zIndex: -1, borderRadius: 14 }}
                />

                <View style={{ position: 'absolute', top: -10, zIndex: 22, right: -4, padding: 4, backgroundColor: Colors.lightBeige, borderRadius: 999 }}>
                    <Image
                        source={verification_icon}
                        style={{ height: 20, width: 20, }}
                    />
                </View>
            </View>


            <View>
                <Text weight="bold" style={styles.name}>{professional.name}</Text>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>{professional.role}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.lightYellow, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999 }}>
                        <Image source={rating_icon} style={{ width: 20, height: 20 }} />
                        <Text>{professional.rating}</Text>
                    </View>

                    <Text style={{ color: Colors.neutral }}>({professional.reviews} revews)</Text>
                </View>

                <Text weight="bold" style={{ fontSize: 20 }}>{formatNaira(professional.consultationfee)}</Text>
            </View>

        </Pressable >
    )
}



const styles = StyleSheet.create({
    ProfessionalImage: {
        height: 120,
        aspectRatio: 1 / 1,
        borderRadius: 20,
        // overflow: 'hidden', // ✅ clips the image to the border radius
    },
    name: {
        fontSize: 24,
        letterSpacing: -1,
    },
    container: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: Colors.lightBeige,
        borderColor: Colors.homeneutral,
        padding: 12,
        borderRadius: 12,
    }
})
