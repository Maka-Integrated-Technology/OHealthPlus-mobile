import Colors from "@/constants/Colors";
import { Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Text } from "./Text";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'clear';
    style?: StyleProp<ViewStyle>;
}

export default function Button({ children, onPress, type = "primary", style }: CustomButtonProps) {

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                styles[type],
                style,
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 }
            ]}
        >
            <Text weight="semibold" style={[styles.text, type === 'clear' ? styles.clearButtonText : styles.buttonText]}>
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
        fontSize: 19,
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'OpenSans'
    },
    buttonText: {
        color: 'white'
    },
    clearButtonText: {
        color: 'black'
    },
    primaryButtonText: {
        color: 'white'
    },
    secondaryButtonText: {
        color: Colors.primary
    }
});
