import { useEffect } from "react";
import { View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export default function AnimatedBalls({ delay }: { delay: number }) {
    const translateY = useSharedValue(0); // starts 20px below

    useEffect(() => {
        translateY.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(-20, { duration: 500, easing: Easing.out(Easing.quad) }),
                    withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) })
                ),
                -1,
                false
            )
        );


        return () => {
            // cancelAnimation(translateY); // ✅ clean up on unmount
        };

    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }]
    }));

    return (
        <Animated.View style={animatedStyle}>
            <View style={{ width: 8, height: 8, borderRadius: 10, backgroundColor: "black" }} />
        </Animated.View>
    )
}
