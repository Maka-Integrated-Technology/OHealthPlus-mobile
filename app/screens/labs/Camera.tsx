import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import { labAssets } from "@/features/labs/assets";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Camera() {
  const router = useAppRouter();
  const [captured, setCaptured] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Ionicons name="close" size={20} color="white" />
        </Pressable>
      </SafeAreaView>

      <Image
        source={labAssets.images.testDocument}
        style={styles.preview}
        resizeMode="cover"
      />

      <View style={styles.bottomBar}>
        {captured ? (
          <Pressable
            onPress={() => router.toReadingTestRequest()}
            style={styles.uploadPill}
          >
            <Text weight="semibold" style={styles.uploadText}>
              Upload
            </Text>
            <Ionicons name="checkmark" size={16} color="#1F2A37" />
          </Pressable>
        ) : (
          <Pressable onPress={() => setCaptured(true)} style={styles.shutter}>
            <View style={styles.shutterInner} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222020",
  },
  topBar: {
    height: 82,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  cancelButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(120,120,120,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    flex: 1,
    width: "100%",
  },
  bottomBar: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  shutter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
  },
  uploadPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 102,
  },
  uploadText: {
    fontSize: 14,
    lineHeight: 24,
    color: "#1F2A37",
  },
});
