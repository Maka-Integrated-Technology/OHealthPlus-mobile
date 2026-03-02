import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import AnimatedBalls from "@/features/appointments/components/AnimatedBalls";
import AvailableProfessionalCardList from "@/features/appointments/components/AvailableProfessionalCardList";
import AvailableProfessionalsSkeleton from "@/features/appointments/components/AvailableProfessionalsSkeleton";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AvailableProfessionals() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Screen>
            <View style={{ borderBottomWidth: 1, borderColor: Colors.homeneutral, paddingBottom: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <BackButton style={{ marginBottom: 0 }} />
                    <View>
                        <Text weight="semibold" style={{ fontSize: 20 }}>Available Professionals</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontSize: 18, color: "black", marginBottom: 20 }}>
                    {isLoading ? 'Looking for doctors available near you' : 'Doctors available near you'}
                </Text>

                {isLoading && (
                    <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
                        {[1, 2, 3].map((item, index) => (
                            <AnimatedBalls key={item} delay={index * 150} />
                        ))}
                    </View>
                )}
            </View>

            {isLoading && (
                <View>
                    {[5, 4, 3, 2, 1].map((item, index) => (
                        <AvailableProfessionalsSkeleton
                            key={item}
                            opacity={Math.pow(1 - index / 5, 3)}
                        />
                    ))}
                </View>
            )}

            {!isLoading && <AvailableProfessionalCardList />}

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
