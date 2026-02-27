import { CustomTabBar } from "@/components/CustomTabbar";

import { Tabs } from "expo-router";

export default function TabLayout() {


    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#FCFCFC",
                    // borderColor: Colors.neutral,



                },
            }}
        >
            <Tabs.Screen name="index" options={{ headerShown: false }} />
            <Tabs.Screen name="appointments" options={{ headerShown: false }} />

            <Tabs.Screen name="messages" options={{ headerShown: false }} />
            <Tabs.Screen name="profile" options={{ headerShown: false }} />

            <Tabs.Screen
                name="screens"
                options={{ href: null }} // Hide from tabs
            />
        </Tabs>
    );
}
