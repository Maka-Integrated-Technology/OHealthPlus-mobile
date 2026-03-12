import Colors from "@/constants/Colors";
import { authAssets } from "@/features/auth/assets";
import { Image, ImageSourcePropType, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "./Text";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'clear' | 'applePay' | 'googlePay' | 'destructive' | 'textDestructive';
    style?: StyleProp<ViewStyle>;
    icon?: ImageSourcePropType;
    disabled?: boolean;
}

export default function Button({ children, onPress, type = "primary", style, icon, disabled = false }: CustomButtonProps) {

    const getTextStyle = () => {
        if (type === 'applePay') return styles.applePayButtonText;
        if (type === 'googlePay') return styles.googlePayButtonText;
        if (type === 'clear') return styles.clearButtonText;
        if (type === 'destructive') return styles.destructiveButtonText;
        if (type === 'textDestructive') return styles.textDestructiveButtonText;
        if (type === 'primary') return styles.primaryButtonText;
        return styles.secondaryButtonText;
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                type !== 'applePay' && type !== 'googlePay' && type !== 'destructive' && type !== 'textDestructive' && styles[type],
                type === 'textDestructive' && styles.textDestructive,
                type === 'applePay' && styles.applePay,
                type === 'googlePay' && styles.googlePay,
                type === 'destructive' && styles.destructive,
                style,
                pressed && !disabled && { transform: [{ scale: 0.97 }], opacity: 0.8 },
                disabled && styles.buttonDisabled
            ]}
        >
            <View style={styles.content}>
                {icon && <Image source={icon} style={styles.icon} />}
                <Text weight="medium" style={[styles.text, getTextStyle()]}>
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
    },
    applePay: {
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#000000',
    },
    googlePay: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.homeneutral,
    },
    applePayButtonText: {
        color: 'white'
    },
    googlePayButtonText: {
        color: '#1A1A1A'
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    destructive: {
        backgroundColor: Colors.red500,
        borderWidth: 1,
        borderColor: Colors.red500,
    },
    destructiveButtonText: {
        color: 'white',
    },
    textDestructive: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
    },
    textDestructiveButtonText: {
        color: Colors.red500,
    },
});
