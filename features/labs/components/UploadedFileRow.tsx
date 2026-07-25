import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import type { UploadedFile } from "../types";

interface UploadedFileRowProps {
  file: UploadedFile;
  onRemove: () => void;
}

export default function UploadedFileRow({ file, onRemove }: UploadedFileRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Ionicons name="image" size={35} color={Colors.primary} />
        <View>
          <Text weight="medium" style={styles.name}>
            {file.name}
          </Text>
          <Text weight="regular" style={styles.size}>
            {file.sizeLabel}
          </Text>
        </View>
      </View>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Ionicons name="trash-outline" size={21} color={Colors.red500} />
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black100,
  },
  size: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.neutral600,
  },
});
