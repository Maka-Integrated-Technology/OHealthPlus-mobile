import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import type { ExtractedTest } from "../types";

interface SelectableTestRowProps {
  test: ExtractedTest;
  isSelected: boolean;
  onToggle: () => void;
}

export default function SelectableTestRow({
  test,
  isSelected,
  onToggle,
}: SelectableTestRowProps) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <Text weight="medium" style={styles.name} numberOfLines={1}>
        {test.name}
      </Text>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.neutral200,
  },
  name: {
    flex: 1,
    fontSize: 14,
    lineHeight: 28,
    color: "#1F2A37",
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 999,
    borderWidth: 1.276,
    borderColor: "#D2D6DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: "#2970FF",
  },
  radioDot: {
    width: 12.8,
    height: 12.8,
    borderRadius: 999,
    backgroundColor: "#2970FF",
  },
});
