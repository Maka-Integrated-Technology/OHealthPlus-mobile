// OnboardingContent.tsx
import { DescriptionObj } from "@/app/(auth)/onboarding";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Text, View, StyleSheet, Image } from "react-native";

interface OnboardingContentProps {
    title1: string;
    title: string | DescriptionObj[];
    currentIndex: number;
    totalSlides: number;
    onNext: () => void;
}

export const OnboardingContent = ({
    title1,
    title,
    currentIndex,
    totalSlides,
    onNext,
}: OnboardingContentProps) => {
    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>

                {/*Onboard title */}
                <Text style={styles.title1}>{title1}</Text>


                {/*Onboard description */}
                {typeof title === "string" ? (
                    <Text style={styles.title}>{title}</Text>
                ) : (
                    <View style={styles.descriptionContainer}>
                        {title.map((item, index) => (
                            <View key={index} style={styles.descriptionItem}>
                                <Image source={item.icon} style={styles.icon} />
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>



            {/*Onboard dots */}
            <View style={styles.dotsContainer}>
                <View style={styles.dots}>
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentIndex && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            </View>

            <Button onPress={onNext} style={styles.button}>
                {currentIndex === 0 ? "start" : currentIndex === 2 ? "Get Started" : "Next"}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    textContainer: {
        marginBottom: 40,
        width: '100%',
    },
    title1: {
        fontSize: 32,
        marginBottom: 4,
        textAlign: "left",
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: "left",
        color: '#666',
    },
    descriptionContainer: {
        gap: 8,
        marginTop: 12,
    },
    descriptionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    icon: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    description: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
    button: {
        width: "100%",
        marginTop: 20,
        borderRadius: 18
    },
    dotsContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    dots: {
        flexDirection: "row",
        gap: 4,
    },
    dot: {
        backgroundColor: Colors.primary,
        opacity: 0.3,
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: Colors.primary,
        width: 20,
        opacity: 1.0,
        borderRadius: 12
    },
});
