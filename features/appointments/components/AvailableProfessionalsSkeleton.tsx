import Colors from "@/constants/Colors";
import SkeletonImage from "@/features/appointments/assets/icons/Skeleton.png";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { DimensionValue, Image, StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";


const SHIMMER_WIDTH = 200;

function ShimmerBar({ width, height, borderRadius = 24 }: { width?: DimensionValue, height: number, borderRadius?: number }) {
    const translateX = useSharedValue(-SHIMMER_WIDTH);

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(400, { duration: 1200, easing: Easing.linear }),
            -1, // infinite
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={[{ backgroundColor: Colors.neutral200, height, borderRadius, overflow: 'hidden' }, width ? { width } : { flex: 1 }]}>
            <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: SHIMMER_WIDTH, height: '100%' }}
                />
            </Animated.View>
        </View>
    );
}

export default function AvailableProfessionalsSkeleton({ opacity }: { opacity?: number }) {
    return (
        <View style={{ backgroundColor: Colors.lightBeige, width: "100%", borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'space-between', opacity }}>
            <Image source={SkeletonImage} style={{ width: 100, height: 100 }} />

            <View style={{ gap: 8, flex: 1 }}>
                <ShimmerBar height={18} />
                <ShimmerBar height={12} />

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <ShimmerBar height={12} />
                    <ShimmerBar height={12} />
                </View>

                <ShimmerBar height={13} />
            </View>
        </View>
    );
}
