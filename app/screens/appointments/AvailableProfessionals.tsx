import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import AvailableProfessionalsSkeleton from "@/features/appointments/components/AvailableProfessionalsSkeleton";
import { StyleSheet, View } from "react-native";

export default function AvailableProfessionals() {

    return (
        <Screen>
            <View style={{ borderBottomWidth: 1, borderColor: Colors.homeneutral, paddingBottom: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
                    <BackButton style={{ marginBottom: 0 }} />
                    <View >
                        <Text weight="semibold" style={{ fontSize: 20, alignItems: 'center' }}>Available Professionals</Text>
                    </View>
                </View>


            </View>
            <View>
                <Text style={{ fontSize: 18, color: Colors.neutral, marginBottom: 20 }}>Looking for doctors available near you</Text>
            </View>

            {/* <BookAppointmentCardList /> */}
            {[5, 4, 3, 2, 1].map((item) => (
                <AvailableProfessionalsSkeleton key={item} opacity={item / 5} />
            ))}
        </Screen>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
