import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useGeneralInfo } from "@/features/medical/hooks/useMedical";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function GeneralInformationScreen() {
  const router = useAppRouter();
  const { data, isLoading } = useGeneralInfo();

  const rows = [
    { label: "Height", value: data?.height_cm ? `${data.height_cm}cm` : null },
    { label: "Weight", value: data?.weight_kg ? `${data.weight_kg}kg` : null },
    { label: "Blood Group", value: data?.blood_group ?? null },
    { label: "Genotype", value: data?.genotype ?? null },
    {
      label: "Body Mass Index (BMI)",
      value: data?.bmi != null ? `${data.bmi}` : null,
    },
  ];

  return (
    <Screen>
      <DetailHeader title="General Information" />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.group}>
            {rows.map((row) => (
              <View key={row.label} style={styles.row}>
                <Text weight="regular" style={styles.label}>
                  {row.label}
                </Text>
                <View style={styles.right}>
                  <Text
                    weight="medium"
                    style={[styles.value, !row.value && styles.placeholder]}
                  >
                    {row.value ?? "Not set"}
                  </Text>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={18}
                    color={Colors.neutral300}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Button onPress={() => router.toUpdateGeneralInformation()}>
          Update Information
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
  group: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  label: {
    fontSize: 15,
    letterSpacing: -0.3,
    color: Colors.neutral,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  value: {
    fontSize: 15,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  placeholder: {
    color: Colors.neutral300,
  },
  footer: {
    paddingVertical: 16,
  },
});
