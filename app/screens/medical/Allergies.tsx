import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { AllergyCard, EmptyState } from "@/features/medical/components";
import {
  useAllergies,
  useDeleteAllergy,
} from "@/features/medical/hooks/useMedical";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AllergiesScreen() {
  const router = useAppRouter();
  const { data: allergies = [], isLoading } = useAllergies();
  const { mutate: deleteAllergy, isPending, variables } = useDeleteAllergy();

  const confirmDelete = (id: string, name: string) => {
    Alert.alert("Remove allergy", `Remove "${name}" from your allergies?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          deleteAllergy(id, {
            onError: () =>
              Alert.alert("Couldn't remove", "Please try again later."),
          }),
      },
    ]);
  };

  return (
    <Screen>
      <DetailHeader title="Allergies" />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : allergies.length === 0 ? (
        <EmptyState
          icon="alert-circle-outline"
          title="No allergies added"
          subtitle="Add allergies to receive safer and more personalized recommendations."
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.list}>
            {allergies.map((allergy) => (
              <AllergyCard
                key={allergy.id}
                allergy={allergy}
                deleting={isPending && variables === allergy.id}
                onDelete={() => confirmDelete(allergy.id, allergy.name)}
              />
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Button onPress={() => router.toAddAllergy()}>Add Allergies</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  list: {
    gap: 12,
  },
  footer: {
    paddingVertical: 16,
  },
});
