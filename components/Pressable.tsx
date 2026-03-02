import { ReactNode, useRef } from "react";
import { PressableProps, Pressable as RNPressable, StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface Props extends Omit<PressableProps, "style"> {
    children: ReactNode
    style?: StyleProp<ViewStyle>;
}
export default function Pressable({ children, style, ...props }: Props) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const pressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const handlePressIn = () => {


        // ✅ delay so scroll gestures don't trigger the animation
        pressTimeout.current = setTimeout(() => {
            scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
            opacity.value = withTiming(0.6, { duration: 100 });
        }, 80);
    };

    const handlePressOut = () => {


        // ✅ cancel if finger lifted before delay completes (i.e. it was a scroll)
        if (pressTimeout.current) {
            clearTimeout(pressTimeout.current);
            pressTimeout.current = null;
        }
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(1, { duration: 150 });
    };

    return (
        <RNPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
        >
            <Animated.View style={[animatedStyle, style]}>
                {children}
            </Animated.View>
        </RNPressable>
    );
}
