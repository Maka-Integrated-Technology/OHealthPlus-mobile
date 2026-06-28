import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { useAppRouter } from "@/config/route";
import { RecordRow } from "@/features/medical/components";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";

export default function MedicalRecordsScreen() {
  const router = useAppRouter();

  const rows: {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }[] = [
    {
      id: "general",
      label: "General",
      icon: "heart-outline",
      onPress: () => router.toGeneralInformation(),
    },
    {
      id: "allergies",
      label: "Allergies",
      icon: "alert-circle-outline",
      onPress: () => router.toAllergies(),
    },
    {
      id: "lab-results",
      label: "Lab Results",
      icon: "flask-outline",
      onPress: () => router.toLabResults(),
    },
    {
      id: "health-conditions",
      label: "Health Conditions",
      icon: "fitness-outline",
      onPress: () => router.toHealthConditions(),
    },
  ];

  return (
    <Screen>
      <DetailHeader title="Medical Records" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.group}>
          {rows.map((row) => (
            <RecordRow
              key={row.id}
              icon={row.icon}
              label={row.label}
              onPress={row.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  group: {
    gap: 12,
  },
});
