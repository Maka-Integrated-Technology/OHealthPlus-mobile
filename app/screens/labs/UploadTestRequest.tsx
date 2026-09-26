import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { labAssets } from "@/features/labs/assets";
import UploadDropzone from "@/features/labs/components/UploadDropzone";
import UploadedFileRow from "@/features/labs/components/UploadedFileRow";
import type { UploadedFile } from "@/features/labs/types";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const dummyMediaFile: UploadedFile = {
  name: "Test result.jpg",
  sizeLabel: "2mb",
  previewImage: labAssets.images.testDocument,
};

export default function UploadTestRequest() {
  const router = useAppRouter();
  const [file, setFile] = useState<UploadedFile | null>(null);

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Upload Test Request
        </Text>
      </View>

      <View style={styles.content}>
        <UploadDropzone
          onPressUpload={() => setFile(dummyMediaFile)}
          onPressCamera={() => router.toUploadTestRequestCamera()}
          onPressMedia={() => setFile(dummyMediaFile)}
        />

        {file && <UploadedFileRow file={file} onRemove={() => setFile(null)} />}
      </View>

      {file && (
        <View style={styles.footer}>
          <Button onPress={() => router.toReadingTestRequest()}>Proceed</Button>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    paddingTop: 8,
    paddingBottom: 12,
    marginTop: 12,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  content: {
    flex: 1,
    gap: 25,
  },
  footer: {
    paddingVertical: 16,
  },
});
