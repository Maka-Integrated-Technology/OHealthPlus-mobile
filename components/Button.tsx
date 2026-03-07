import Colors from "@/constants/Colors";
import { authAssets } from "@/features/auth/assets";
import { Image, ImageSourcePropType, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "./Text";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'clear';
    style?: StyleProp<ViewStyle>;
    icon?: ImageSourcePropType;
}

export default function Button({ children, onPress, type = "primary", style, icon }: CustomButtonProps) {

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
            <View style={styles.content}>
                {icon && <Image source={icon} style={styles.icon} />}
                <Text weight="medium" style={[styles.text, type === 'clear' ? styles.clearButtonText : type == "primary" ? styles.primaryButtonText : styles.secondaryButtonText]}>
                    {children}
                </Text>
            </View>
        </Pressable>
    );
}

// GoogleButton wrapper - icon pre-imported
export function GoogleButton({ onPress, style }: { onPress: () => void; style?: StyleProp<ViewStyle> }) {
    return (
        <Button
            type="clear"
            onPress={onPress}
            style={[{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 16 }, style]}
            icon={authAssets.icons.google}
        >
            Continue with Google
        </Button>
    );
}


export function AppleButton({ onPress, style }: { onPress: () => void; style?: StyleProp<ViewStyle> }) {
    return (
        <Button
            type="clear"
            onPress={onPress}
            style={[{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 16 }, style]}
            icon={authAssets.icons.apple}
        >
            Continue with Apple
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    primary: {
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondaryLight,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    clear: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 20
    },
    text: {
        fontSize: 16,
        lineHeight: 17.6,
        letterSpacing: -0.2,
        textAlign: 'center',
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
