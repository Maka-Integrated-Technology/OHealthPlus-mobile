import { useAppRouter } from "@/config/route";
import { FlatList, StyleSheet } from "react-native";
import { appointmentAssets } from "../assets";
import { BookAppointmentCard, Personnel } from "./BookAppointmentcard";

export default function BookAppointmentCardList() {

    const PersonnelImages = appointmentAssets.images;
    const router = useAppRouter();


    const Personnels: Personnel[] = [
        { image: PersonnelImages.doctor, text: "General Doctor", onPress: () => router.toAvailabeleProfessionals() },
        { image: PersonnelImages.nurse, text: "Nurse", onPress: () => router.toAvailabeleProfessionals() },
        { image: PersonnelImages.nutritionist, text: "Nutritionist", onPress: () => router.toAvailabeleProfessionals() },
        { image: PersonnelImages.counsellor, text: "Counsellor", onPress: () => router.toAvailabeleProfessionals() }
    ];




    return (
        <FlatList
            data={Personnels}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.text}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <BookAppointmentCard
                    personnel={item}
                />
            )}
        />

    )
}


const styles = StyleSheet.create({

    list: {
        gap: 12,
        paddingBottom: "10%"
    },
})



