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
            <View style={styles.header}>
                <BackButton style={{ marginBottom: 0 }} />
                <Text weight="semibold" style={styles.headerTitleText}>Available Professionals</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 4 }}>
                <Text weight="regular" style={styles.availableText}>
                    {isLoading ? 'Looking for doctors available near you' : 'Doctors available near you'}
                </Text>

                {isLoading && (
                    <View style={styles.loadingContainer}>
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
    },
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
    headerTitleText: {
        fontSize: 18,
        lineHeight: 19.8,
        letterSpacing: -0.8,
        color: Colors.black100,
    },
    availableText: {
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: -0.2,
        color: Colors.black200,
        marginBottom: 16,
    },
    loadingContainer: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
