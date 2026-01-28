import { Modal, Pressable } from "react-native";
import { Image } from "react-native";
import Button, { GoogleButton, AppleButton } from "@/components/Button";
import { authAssets } from "../assets";
import React from "react";
import { View, StyleSheet } from "react-native";


interface AuthModalProps {
    modalVisible: boolean,
    setModalVisible: (modalVisible: boolean) => void,
    createAccount: () => void,
    handleGoogleSignin: () => void,
    handleAppleSignin: () => void,
}

export default function AuthModal({ modalVisible, setModalVisible, createAccount, handleGoogleSignin, handleAppleSignin }: AuthModalProps) {
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            backdropColor={"#0000"}
            statusBarTranslucent
            onDismiss={() => {

                setModalVisible(!modalVisible);
            }}
            onRequestClose={() => setModalVisible(false)}
        >
            <Pressable
                style={styles.centeredView}
                onPress={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalView}
                >

                    <View style={styles.buttonContainer}>
                        <Button style={{ width: '100%' }} onPress={createAccount}>
                            Create an account
                        </Button>
                        <Button type="secondary" style={{ width: '100%' }} onPress={createAccount}>
                            I have an account
                        </Button>
                    </View>

                    <Image source={authAssets.onboarding.divider} style={{ width: "100%", height: 40, objectFit: 'contain', }} />

                    <View style={styles.buttonContainer}>
                        <GoogleButton style={{ width: '100%' }} onPress={handleGoogleSignin} />
                        <AppleButton style={{ width: '100%' }} onPress={handleAppleSignin} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal >
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        width: "100%",
        gap: 10,
    },
});
