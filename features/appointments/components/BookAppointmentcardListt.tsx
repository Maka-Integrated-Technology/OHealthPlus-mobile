import { FlatList, StyleSheet } from "react-native";
import { appointmentAssets } from "../assets";
import { BookAppointmentCard, Personnel } from "./BookAppointmentcard";

export default function BookAppointmentCardList() {

    const PersonnelImages = appointmentAssets.images;


    const Personnels: Personnel[] = [
        { image: PersonnelImages.doctor, text: "General Doctor" },
        { image: PersonnelImages.nurse, text: "Nurse" },
        { image: PersonnelImages.nutritionist, text: "Nutritionist" },
        { image: PersonnelImages.counsellor, text: "Counsellor" }
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



