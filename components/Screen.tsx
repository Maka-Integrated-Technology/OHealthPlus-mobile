import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children, style }: { children: React.ReactNode, style?: any }) {

    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: 'white'
    }
})
