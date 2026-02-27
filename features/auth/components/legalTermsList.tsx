import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { FlatList, StyleSheet, View } from "react-native";

type listItem = {
    title: string,
    description: string
}

interface LegalTermsList {
    list: listItem[]
}

export default function LegalTermsList({ list }: LegalTermsList) {

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
                <View key={index}>
                    <Text style={styles.title}>{index + 1}.{item.title}</Text>
                    <Text>{item.description}</Text>
                </View>
            )}
        />
    )
}


const styles = StyleSheet.create({
    title: {
        color: Colors.primary,
        marginBottom: 4,
        fontSize: 18
    },
    description: {
        color: Colors.neutral,
        fontSize: 16
    }
})
