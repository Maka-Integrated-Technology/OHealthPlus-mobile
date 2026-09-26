import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { ConditionCard, EmptyState } from "@/features/medical/components";
import {
  useDeleteHealthCondition,
  useHealthConditions,
} from "@/features/medical/hooks/useMedical";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function HealthConditionsScreen() {
  const router = useAppRouter();
  const { data: conditions = [], isLoading } = useHealthConditions();
  const { mutate: deleteCondition, isPending, variables } =
    useDeleteHealthCondition();

  const confirmDelete = (id: string, name: string) => {
    Alert.alert("Remove condition", `Remove "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          deleteCondition(id, {
            onError: () =>
              Alert.alert("Couldn't remove", "Please try again later."),
          }),
      },
    ]);
  };

  return (
    <Screen>
      <DetailHeader title="Health Conditions" />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : conditions.length === 0 ? (
        <EmptyState
          icon="fitness-outline"
          title="No Health Conditions Added"
          subtitle="Add your health conditions for more personalized care and recommendations."
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.list}>
            {conditions.map((condition) => (
              <ConditionCard
                key={condition.id}
                condition={condition}
                deleting={isPending && variables === condition.id}
                onDelete={() => confirmDelete(condition.id, condition.name)}
              />
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Button onPress={() => router.toAddHealthCondition()}>
          Add Condition
        </Button>
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
