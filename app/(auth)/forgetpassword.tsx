import { BackButton } from "@/components/BackButton";
import { InputField } from "@/components/InputField";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgetPasswordScreen() {
    const [error, setError] = useState<string | null>(null);
    return (
        <SafeAreaView style={styles.container}>

            <BackButton />
            <Text weight="bold" style={styles.title}>Forgot Password?</Text>

            <Text style={styles.description}>Enter the email address linked to your HealthBridge account. </Text>

            <InputField
                icon="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!error}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28
    },
    description: {
        color: Colors.lightgray,

    }
})
