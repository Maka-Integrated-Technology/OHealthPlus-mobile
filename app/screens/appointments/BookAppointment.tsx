import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import BookAppointmentCardList from "@/features/appointments/components/BookAppointmentcardListt";
import { StyleSheet, View } from "react-native";

export default function BookAppointment() {

    return (
        <Screen>
            <View style={{ borderBottomWidth: 1, borderColor: Colors.homeneutral, paddingBottom: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
                    <BackButton style={{ marginBottom: 0 }} />
                    <View >
                        <Text weight="semibold" style={{ fontSize: 20, alignItems: 'center' }}>Choose a specialty</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 20, color: Colors.neutral }}>Select the type of care you need</Text>
                </View>

            </View>

            <BookAppointmentCardList />






        </Screen>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
