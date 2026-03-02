import { AppointmentsIcon, HomeIcon, MessagesIcon, ProfileIcon, SparkIcon } from '@/components/TabIcons';
import Colors from '@/constants/Colors';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Text';




const iconMap = {
    index: HomeIcon,
    appointments: AppointmentsIcon,
    messages: MessagesIcon,
    profile: ProfileIcon,
    tests: SparkIcon
};



type IconName = keyof typeof iconMap;

const TAB_BAR_RADIUS = 24;
const TAB_BAR_PADDING = 5;

export function CustomTabBar({
    state,
    navigation,
}: BottomTabBarProps) {

    const insets = useSafeAreaInsets();



    return (
        <View style={[styles.tabBarContainer, { bottom: Math.max(insets.bottom, 8) }]}>

            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)']}
                locations={[0, 0.4]}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, borderColor: 'red' }}
                pointerEvents="none"
            />



            {/* <View style={{ backgroundColor: 'red', borderColor: 'red', borderWidth: 4 }}> */}
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

                        // Get icon based on route name


                        // Get label
                        const getLabel = () => {
                            switch (route.name) {
                                case "index":
                                    return "Home";
                                case "appointments":
                                    return "Appointments";
                                case "messages":
                                    return "Messages";
                                case "profile":
                                    return "Profile";
                                case "tests":
                                    return "Tests"
                                default:
                                    return "";
                            }
                        };



                        return (
                            <Pressable
                                key={route.key}
                                // style={({ pressed }) => [styles.tabItem, isFocused && [styles.tabItemActive], pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 }]}
                                style={({ pressed }) => [
                                    styles.tabItem,
                                    isFocused && styles.tabItemActive,
                                    (pressed || isFocused) && { transform: [{ scale: 0.97 }] }
                                ]}
                                onPress={onPress}

                            >

                                <Icon
                                    size={32}
                                    color={isFocused ? "#ffff" : Colors.primary}
                                />


                                <Text
                                    style={[
                                        styles.tabLabel,
                                        isFocused && styles.tabLabelActive,
                                    ]}
                                >
                                    {getLabel()}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            {/* </View> */}

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
        // justifyContent: "space-evenly",
        alignItems: "center",
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.homeneutral,
        height: 100,
        borderRadius: TAB_BAR_RADIUS,
        paddingVertical: TAB_BAR_PADDING,
        paddingHorizontal: TAB_BAR_PADDING,
        width: "100%",

        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 8, // Android
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        height: '100%',

        // borderWidth: 3,
        // width: "20%",
        flex: 0.2,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
        display: 'none'
    },
    tabLabelActive: {
        color: "#ffff",
        display: 'flex'
    },




    iconContainer: {
        width: "100%",
        // height: "100%",
        padding: 4,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    tabItemActive: {
        // width: '20%',
        backgroundColor: Colors.primary,
        borderRadius: TAB_BAR_RADIUS - TAB_BAR_PADDING,
        flex: 0.3,
    }
});
