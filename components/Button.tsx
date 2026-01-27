// src/components/Button.tsx
import Colors from "@/constants/Colors";
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'clear';
    style?: StyleProp<ViewStyle>;
}

export default function Button({ children, onPress, type = "primary", style }: CustomButtonProps) {
    return (
        <Pressable onPress={onPress} style={[styles.button, styles[type], style]}>
            <Text style={[styles.text, type === 'clear' ? styles.clearButtonText : styles.buttonText]}>
                {children}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    primary: {
        backgroundColor: Colors.primary
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    clear: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 20
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonText: {
        color: 'white'
    },
    clearButtonText: {
        color: 'black'
    }
});
