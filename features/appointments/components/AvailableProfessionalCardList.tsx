import { useAppRouter } from "@/config/route";
import { FlatList, StyleSheet } from "react-native";
import { appointmentAssets } from "../assets";
import { Professional } from "../types/Professional";
import AvailableProfessionalCard from "./AvailableProfessionalCard";

export default function AvailableProfessionalCardList() {

    const PersonnelImages = appointmentAssets.images;
    const router = useAppRouter();





    // dummyProfessionals.ts


    const dummyProfessionals: Professional[] = [
        {
            id: '1',
            name: 'Dr. Adebayo Okafor',
            role: 'General Doctor',
            reviews: 128,
            rating: 4.8,
            consultationfee: 5000,
            image: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
        },
        {
            id: '2',
            name: 'Dr. Ngozi Eze',
            role: 'Nutritionist',
            reviews: 74,
            rating: 4.5,
            consultationfee: 3500,
            image: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
        },
        {
            id: '3',
            name: 'Dr. Emeka Nwosu',
            role: 'Counsellor',
            reviews: 56,
            rating: 4.2,
            consultationfee: 4000,
            image: { uri: 'https://randomuser.me/api/portraits/men/65.jpg' },
        },
        {
            id: '4',
            name: 'Nurse Fatima Bello',
            role: 'Nurse',
            reviews: 210,
            rating: 4.9,
            consultationfee: 2000,
            image: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
        },
        {
            id: '5',
            name: 'Dr. Chisom Obi',
            role: 'General Doctor',
            reviews: 95,
            rating: 4.6,
            consultationfee: 6000,
            image: { uri: 'https://randomuser.me/api/portraits/women/12.jpg' },
        },
    ];

    return (
        <FlatList
            data={dummyProfessionals}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <AvailableProfessionalCard
                    professional={item}
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



