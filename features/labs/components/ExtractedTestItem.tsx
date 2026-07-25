import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import type { ExtractedTest } from "../types";

interface ExtractedTestItemProps {
  test: ExtractedTest;
  onRemove: () => void;
}

export default function ExtractedTestItem({ test, onRemove }: ExtractedTestItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Ionicons name="checkmark-circle" size={24} color={Colors.black100} />
        <Text weight="medium" style={styles.name}>
          {test.name}
        </Text>
      </View>
      <Pressable onPress={onRemove} hitSlop={8} style={styles.removeButton}>
        <Ionicons name="close-circle-outline" size={20} color={Colors.red500} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 22,
    width: "100%",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  name: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black100,
  },
  removeButton: {
    padding: 4,
  },
});
