import Button from "@/components/Button";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

interface DownloadProgressModalProps {
  visible: boolean;
  fileName?: string;
  /** Simulated total size label, e.g. "2.4 MB". */
  sizeLabel?: string;
  onCancel: () => void;
  onComplete: () => void;
}

const DURATION_MS = 2200;
const TICK_MS = 100;

/**
 * Simulated download progress sheet. Animates a progress bar to completion over
 * ~2s, then calls onComplete. No real file is fetched yet.
 */
export function DownloadProgressModal({
  visible,
  fileName = "lab result",
  sizeLabel = "2.4 MB",
  onCancel,
  onComplete,
}: DownloadProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      completedRef.current = false;
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min((Date.now() - start) / DURATION_MS, 1);
      setProgress(pct);
      if (pct >= 1 && !completedRef.current) {
        completedRef.current = true;
        clearInterval(interval);
        onComplete();
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [visible, onComplete]);

  const secondsRemaining = Math.max(
    0,
    Math.ceil((DURATION_MS * (1 - progress)) / 1000),
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.iconWrapper}>
            <Ionicons name="cloud-download-outline" size={26} color={Colors.primary} />
          </View>

          <Text weight="semibold" style={styles.title}>
            Downloading result
          </Text>
          <Text weight="regular" style={styles.subtitle}>
            Please wait while we download your {fileName}.
          </Text>

          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
          </View>

          <View style={styles.metaRow}>
            <Text weight="regular" style={styles.meta}>
              {sizeLabel}
            </Text>
            <Text weight="regular" style={styles.meta}>
              {secondsRemaining > 0
                ? `${secondsRemaining} seconds remaining`
                : "Finishing up…"}
            </Text>
          </View>

          <Button type="secondary" onPress={onCancel} style={styles.cancelButton}>
            Cancel Download
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.lightBlue2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    letterSpacing: -0.4,
    color: Colors.black100,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral,
    textAlign: "center",
  },
  track: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.homeneutral,
    marginTop: 12,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  metaRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  meta: {
    fontSize: 12,
    color: Colors.neutral,
  },
  cancelButton: {
    width: "100%",
    marginTop: 16,
  },
});
