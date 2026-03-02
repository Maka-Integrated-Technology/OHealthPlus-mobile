import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import AnimatedBalls from "@/features/appointments/components/AnimatedBalls";
import AvailableProfessionalCardList from "@/features/appointments/components/AvailableProfessionalCardList";
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
            <View style={{ flexDirection: 'row', gap: 4 }}>
                {/* <View> */}
                <Text style={{ fontSize: 18, color: "black", marginBottom: 20 }}>Looking for doctors available near you</Text>

                <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center' }}>

                    {[1, 2, 3].map((item, index) => (
                        <AnimatedBalls
                            key={item}
                            delay={index * 150}  // 0ms, 150ms, 300ms, 450ms, 600ms
                        />
                    ))}

                </View>

            </View>

            {/* <BookAppointmentCardList /> */}
            {/* {[5, 4, 3, 2, 1].map((item, index) => (
                <AvailableProfessionalsSkeleton
                    key={item}
                    opacity={Math.pow(1 - index / 5, 1)}
                />
            ))} */}


            <AvailableProfessionalCardList />






        </Screen>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
