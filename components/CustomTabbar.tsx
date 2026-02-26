import { AppointmentsIcon, HomeIcon, MessagesIcon, ProfileIcon } from '@/components/TabIcons';
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
};



type IconName = keyof typeof iconMap;

export function CustomTabBar({
    state,
    navigation,
}: BottomTabBarProps) {

    const insets = useSafeAreaInsets();

    return (
        <View>

            <View style={{ position: 'absolute', top: -40, left: 0, right: 0, height: 40, zIndex: -1 }}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                    style={{ flex: 1 }}
                />
            </View>


            <View style={[styles.tabBarContainer, { bottom: Math.max(insets.bottom, 16) }]}>
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
            </View>

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
        paddingVertical: 12,
        paddingHorizontal: 10,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderColor: Colors.homeneutral,
        height: 100,
        borderRadius: 24,
        width: "100%",

    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
        width: "25%",
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500",
    },
    tabLabelActive: {
        color: "#ffff",
    },
    centerButton: {
        position: "relative",
        top: -20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    centerButtonInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#5669FF",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#5669FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    centerButtonIcon: {
        backgroundColor: "white",
        height: 24,
        borderRadius: 2,
        width: 24,
        justifyContent: "center",
        alignItems: "center",
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
        backgroundColor: Colors.primary,
        borderRadius: 24,
    }
});
