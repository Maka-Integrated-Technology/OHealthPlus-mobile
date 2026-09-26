import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useAddHealthConditions } from "@/features/medical/hooks/useMedical";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const COMMON_CONDITIONS = [
  "Stroke",
  "Diabetes",
  "Hypertension",
  "Heart disease",
  "Cancer",
  "Kidney disease",
  "High Cholesterol",
  "High blood pressure",
];

export default function AddHealthConditionScreen() {
  const router = useAppRouter();
  const { mutateAsync: addConditions, isPending } = useAddHealthConditions();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleSave = async () => {
    const names = Array.from(selected);
    if (names.length === 0) {
      Alert.alert("Select a condition", "Choose at least one condition to add.");
      return;
    }
    try {
      await addConditions({ names });
      router.back();
    } catch {
      Alert.alert("Couldn't save", "Please try again in a moment.");
    }
  };

  return (
    <Screen>
      <DetailHeader title="Health Conditions" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.list}>
          {COMMON_CONDITIONS.map((name) => {
            const checked = selected.has(name);
            return (
              <TouchableOpacity
                key={name}
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => toggle(name)}
              >
                <Text weight="regular" style={styles.rowLabel}>
                  {name}
                </Text>
                <View style={[styles.checkbox, checked && styles.checkboxOn]}>
                  {checked && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Other → custom condition flow */}
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => router.toAddOtherCondition()}
          >
            <Text weight="regular" style={styles.rowLabel}>
              Other
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.neutral300}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleSave} disabled={isPending}>
          {isPending ? "Saving…" : "Save Condition"}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowLabel: {
    fontSize: 15,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.neutral300,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOn: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  footer: {
    paddingVertical: 16,
  },
});
