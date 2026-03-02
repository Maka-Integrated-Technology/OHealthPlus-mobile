import { AppointmentsIcon, HomeIcon, MessagesIcon, ProfileIcon, SparkIcon } from '@/components/TabIcons';
import Colors from '@/constants/Colors';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Text';

const iconMap = {
    index: HomeIcon,
    appointments: AppointmentsIcon,
    messages: MessagesIcon,
    tests: SparkIcon,
    profile: ProfileIcon,
};

type IconName = keyof typeof iconMap;

const TAB_BAR_RADIUS = 24;
const TAB_BAR_PADDING = 5;


function AnimatedTabItem({
    isFocused,
    children,
}: {
    isFocused: boolean;
    children: React.ReactNode;
}) {
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);

    useEffect(() => {
        if (isFocused) {
            // WhatsApp-like: quick pop up then settle
            scale.value = withSpring(1.05, { damping: 10, stiffness: 300 }, () => {
                scale.value = withSpring(1, { damping: 12, stiffness: 200 });
            });

            translateY.value = withSpring(-3, { damping: 10, stiffness: 300 }, () => {
                translateY.value = withSpring(0, { damping: 12, stiffness: 200 });
            });
        }
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: translateY.value }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBarContainer, { bottom: Math.max(insets.bottom, 0) }]}>
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)']}
                locations={[0, 0.4]}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180 }}
                pointerEvents="none"
            />

            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const Icon = iconMap[route.name as IconName];

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const getLabel = () => {
                        switch (route.name) {
                            case "index": return "Home";
                            case "appointments": return "Appointments";
                            case "messages": return "Messages";
                            case "tests": return "Tests";
                            case "profile": return "Profile";
                            default: return "";
                        }
                    };

                    return (
                        <Pressable
                            key={route.key}
                            style={({ pressed }) => [
                                styles.tabItem,
                                isFocused && styles.tabItemActive,
                                (pressed || isFocused) && { transform: [{ scale: 0.97 }] }
                            ]}
                            onPress={onPress}
                        >
                            {/* ✅ Only wraps the icon — your flex layout is untouched */}
                            <AnimatedTabItem isFocused={isFocused}>
                                <Icon size={32} color={isFocused ? "#fff" : Colors.primary} />
                            </AnimatedTabItem>

                            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                                {getLabel()}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <View style={styles.whiteView}></View>

        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        width: '100%',
        paddingHorizontal: 8,
        position: 'absolute',
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.homeneutral,
        height: 80,
        borderRadius: TAB_BAR_RADIUS,
        paddingVertical: TAB_BAR_PADDING,
        paddingHorizontal: TAB_BAR_PADDING,
        width: "100%",
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 8,
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
        flex: 0.3,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
        display: 'none'
    },
    tabLabelActive: {
        color: "#fff",
        display: 'flex'
    },
    iconContainer: {
        width: "100%",
        padding: 4,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    tabItemActive: {
        backgroundColor: Colors.primary,
        borderRadius: TAB_BAR_RADIUS - TAB_BAR_PADDING,
        flex: 0.4,
    },
    whiteView: {
        // borderWidth: 23,
        backgroundColor: 'white',
        height: 12,
        flex: 1,
    }
});







// import { AppointmentsIcon, HomeIcon, MessagesIcon, ProfileIcon, SparkIcon } from '@/components/TabIcons';
// import Colors from '@/constants/Colors';
// import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Pressable, StyleSheet, View } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Text } from './Text';




// const iconMap = {
//     index: HomeIcon,
//     appointments: AppointmentsIcon,
//     messages: MessagesIcon,
//     profile: ProfileIcon,
//     tests: SparkIcon
// };



// type IconName = keyof typeof iconMap;

// const TAB_BAR_RADIUS = 24;
// const TAB_BAR_PADDING = 5;

// export function CustomTabBar({
//     state,
//     navigation,
// }: BottomTabBarProps) {

//     const insets = useSafeAreaInsets();



//     return (
//         <View style={[styles.tabBarContainer, { bottom: Math.max(insets.bottom, 8) }]}>

//             <LinearGradient
//                 colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)']}
//                 locations={[0, 0.4]}
//                 style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, borderColor: 'red' }}
//                 pointerEvents="none"
//             />



//             {/* <View style={{ backgroundColor: 'red', borderColor: 'red', borderWidth: 4 }}> */}
//             <View style={styles.tabBar}>
//                     {state.routes.map((route, index) => {
//                         const isFocused = state.index === index;
//                         const Icon = iconMap[route.name as IconName];

//                         const onPress = () => {
//                             const event = navigation.emit({
//                                 type: "tabPress",
//                                 target: route.key,
//                                 canPreventDefault: true,
//                             });

//                             if (!isFocused && !event.defaultPrevented) {
//                                 navigation.navigate(route.name);
//                             }
//                         };

//                         // Get icon based on route name


//                         // Get label
//                         const getLabel = () => {
//                             switch (route.name) {
//                                 case "index":
//                                     return "Home";
//                                 case "appointments":
//                                     return "Appointments";
//                                 case "messages":
//                                     return "Messages";
//                                 case "profile":
//                                     return "Profile";
//                                 case "tests":
//                                     return "Tests"
//                                 default:
//                                     return "";
//                             }
//                         };



//                         return (
//                             <Pressable
//                                 key={route.key}
//                                 // style={({ pressed }) => [styles.tabItem, isFocused && [styles.tabItemActive], pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 }]}
//                                 style={({ pressed }) => [
//                                     styles.tabItem,
//                                     isFocused && styles.tabItemActive,
//                                     (pressed || isFocused) && { transform: [{ scale: 0.97 }] }
//                                 ]}
//                                 onPress={onPress}

//                             >

//                                 <Icon
//                                     size={32}
//                                     color={isFocused ? "#ffff" : Colors.primary}
//                                 />


//                                 <Text
//                                     style={[
//                                         styles.tabLabel,
//                                         isFocused && styles.tabLabelActive,
//                                     ]}
//                                 >
//                                     {getLabel()}
//                                 </Text>
//                             </Pressable>
//                         );
//                     })}
//                 </View>
//             {/* </View> */}

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     tabBarContainer: {
//         width: '100%',
//         paddingHorizontal: 8,
//         position: 'absolute',

//     },

//     tabBar: {
//         flexDirection: "row",
//         backgroundColor: "#fff",
//         justifyContent: "space-between",
//         // justifyContent: "space-evenly",
//         alignItems: "center",
//         borderTopWidth: 2,
//         borderLeftWidth: 2,
//         borderRightWidth: 2,
//         borderBottomWidth: 2,
//         borderColor: Colors.homeneutral,
//         height: 90,
//         borderRadius: TAB_BAR_RADIUS,
//         paddingVertical: TAB_BAR_PADDING,
//         paddingHorizontal: TAB_BAR_PADDING,
//         width: "100%",

//         shadowColor: "#fff",
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.08,
//         shadowRadius: 2,
//         elevation: 8, // Android
//     },
//     tabItem: {
//         alignItems: "center",
//         justifyContent: "center",
//         height: '100%',
//         flex: 0.2,
//     },
//     tabLabel: {
//         fontSize: 12,
//         marginTop: 4,
//         textAlign: 'center',
//         display: 'none'
//     },
//     tabLabelActive: {
//         color: "#ffff",
//         display: 'flex'
//     },




//     iconContainer: {
//         width: "100%",
//         // height: "100%",
//         padding: 4,
//         borderRadius: 2,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     tabItemActive: {
//         // width: '20%',
//         backgroundColor: Colors.primary,
//         borderRadius: TAB_BAR_RADIUS - TAB_BAR_PADDING,
//         flex: 0.3,
//     }
// });
