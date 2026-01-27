import { authAssets } from "@/features/auth/assets";
import { OnboardingContent } from "@/features/auth/components/onboardComponent";
import { View } from "react-native";
import { useAppRouter } from "@/config/route";
import { useCallback, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ImageSourcePropType,
    StyleSheet,
    ViewToken,
} from "react-native";

export interface DescriptionObj {
    icon: ImageSourcePropType,
    description: string
}

interface OnboardingSlide {
    id: string;
    image: ImageSourcePropType;
    header: string;
    description: string | DescriptionObj[];
}

const onboardingData: OnboardingSlide[] = [
    {
        id: "1",
        image: authAssets.onboarding.slide1,
        header: "Healthcare, Made Simple ",
        description: "Connect with verified healthcare professionals and get the care you need, without the stress of long waits or travel",
    },
    {
        id: "2",
        image: authAssets.onboarding.slide2,
        header: "What you can do",
        description: [
            { icon: authAssets.onboarding.icon1, description: 'Book video or chat consultations' },
            { icon: authAssets.onboarding.icon2, description: "Manage your care in one place" },
            { icon: authAssets.onboarding.icon3, description: "Get instant AI health guidance" },
        ],

    },
    {
        id: "3",
        image: authAssets.onboarding.slide3,
        header: "Your health, your control",
        description: "Your data is private and secure. \nEvery healthcare professional is verified, so you can feel confident about the care you receive.",
    },
];

const screenWidth = Dimensions.get("window").width;

export default function TabTwoScreen() {
    const flatListRef = useRef<FlatList<any>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useAppRouter();

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0) {
                console.log(viewableItems);
                setCurrentIndex(viewableItems[0].index ?? 0);
            }
        },
        [] // Empty dependency array - function never changes
    );

    const viewabilityConfig = useMemo(
        () => ({
            itemVisiblePercentThreshold: 50,
        }),
        []
    );

    const handleSkip = () => {
        router.toSignIn();
    };

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            console.log("Get started");
            router.toSignIn();
        }
    };

    return (
        <View style={styles.container}>
            {/*image header */}
            <Image
                source={require("@/assets/icons/icon.png")}
                style={{ width: 100, height: 60, objectFit: 'contain', position: 'absolute', top: 40 }}
            />

            {/*Onboarding Image slider */}
            <FlatList
                data={onboardingData}
                ref={flatListRef}
                pagingEnabled
                horizontal
                renderItem={({ item }: { item: OnboardingSlide }) => (
                    <View style={styles.onboardImageContainer}>
                        <Image style={styles.onboardImage} source={item.image} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.imageContainer}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />

            {/*Onboarding Content text */}
            <OnboardingContent
                title1={onboardingData[currentIndex].header}
                title={onboardingData[currentIndex].description}
                currentIndex={currentIndex}
                totalSlides={onboardingData.length}
                onNext={handleNext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: screenWidth * 1,
        height: "50%",
        marginBottom: -20,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        borderWidth: 8,
    },
    onboardImageContainer: {
        width: screenWidth * 1, // matches your 90% container width
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    onboardImage: {
        width: "90%",
        objectFit: "contain",
        alignItems: "center",
    },
    imageView: {
        borderColor: "red",
        borderWidth: 3,
        height: 20,
        width: "100%",
    },
    title1: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
        width: 200,
    },
    title: {
        fontSize: 16,
        fontWeight: "ultralight",
        marginBottom: 12,
        textAlign: "center",
    },
    onboardingBottomView: {
        backgroundColor: "#5669FF",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 20,
        padding: 24,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        flex: 0.5,
        paddingBottom: 50,
    },
    dot: {
        backgroundColor: "red",
        height: 10,
        width: 10,
    },
    onboardFooter: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: "auto",
        backgroundColor: "#5669FF",
    },
    dots: {
        flexDirection: "row",
        gap: 12,
        backgroundColor: "#5669FF",
    },
});
