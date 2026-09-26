import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface UploadDropzoneProps {
  onPressUpload: () => void;
  onPressCamera: () => void;
  onPressMedia: () => void;
}

export default function UploadDropzone({
  onPressUpload,
  onPressCamera,
  onPressMedia,
}: UploadDropzoneProps) {
  return (
    <Pressable onPress={onPressUpload} style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="cloud-upload-outline" size={40} color={Colors.primary} />
      </View>
      <Text weight="semibold" style={styles.title}>
        Tap to upload file
      </Text>
      <View style={styles.actions}>
        <Pressable onPress={onPressCamera} style={styles.actionButton}>
          <Ionicons name="camera-outline" size={18} color={Colors.lightGray2} />
          <Text weight="medium" style={styles.actionText}>
            Camera
          </Text>
        </Pressable>
        <Pressable onPress={onPressMedia} style={styles.actionButton}>
          <Ionicons name="image-outline" size={18} color={Colors.lightGray2} />
          <Text weight="medium" style={styles.actionText}>
            Media
          </Text>
        </Pressable>
      </View>
      <Text weight="regular" style={styles.hint}>
        Supported formats: JPG, PNG, PDF, word
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: Colors.neutral300,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 47,
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.primary,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.homeneutral,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actionText: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.lightGray2,
  },
  hint: {
    fontSize: 12,
    lineHeight: 24,
    color: Colors.neutral600,
    textAlign: "center",
  },
});
