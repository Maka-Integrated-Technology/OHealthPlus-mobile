
import { Text } from "@/components/Text";
import AuthModal from "@/features/auth/components/AuthModal";
import { OnboardingContent } from "@/features/auth/components/onboardComponent";

import { onboardingData } from "@/features/auth/constants/onboardingData";
import useAuthModal from "@/features/auth/hooks/useAuthModal";
import { OnboardingSlide } from "@/features/auth/types/onboarding";
import { useCallback, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View,
    ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const screenWidth = Dimensions.get("window").width;

export default function TabTwoScreen() {
    const flatListRef = useRef<FlatList<any>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    const { createAccount, handleGoogleSignin, modalVisible, setModalVisible, handleAppleSignin } = useAuthModal();

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

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            console.log("Get started");
            setModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/*image header */}
            <View style={{ position: 'absolute', top: 40, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Image
                    style={{ width: 28, resizeMode: 'contain' }}
                    source={require("@/assets/icons/logo.png")}

                />
                <View>
                    <Text style={{ fontSize: 2 }} weight="bold">HealthBridge</Text>
                </View>

            </View>


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

            {/*onboard Auth modal */}
            <AuthModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                createAccount={createAccount}
                handleGoogleSignin={handleGoogleSignin}
                handleAppleSignin={handleAppleSignin}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: screenWidth * 1,
        height: "50%",
        marginTop: -30,
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


    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
}
);
