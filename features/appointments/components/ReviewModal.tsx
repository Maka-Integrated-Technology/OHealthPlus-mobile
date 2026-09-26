import Button from "@/components/Button";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { getApiErrorMessage } from "@/utils/apiError";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; comment?: string }) => Promise<void>;
}

const STAR_COUNT = 5;

export default function ReviewModal({
  visible,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setRating(0);
    setComment("");
    setSubmitting(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      Alert.alert("Please select a rating");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ rating, comment: comment.trim() || undefined });
      reset();
      onClose();
    } catch (err) {
      Alert.alert("Error", getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <Text weight="semibold" style={styles.title}>
              Leave a review
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              disabled={submitting}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color={Colors.neutral400} />
            </TouchableOpacity>
          </View>

          <Text weight="regular" style={styles.label}>
            Rate your experience
          </Text>
          <View style={styles.starsRow}>
            {Array.from({ length: STAR_COUNT }).map((_, i) => {
              const idx = i + 1;
              const active = idx <= rating;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setRating(idx)}
                  disabled={submitting}
                  hitSlop={8}
                >
                  <Ionicons
                    name={active ? "star" : "star-outline"}
                    size={32}
                    color={active ? "#FACC15" : Colors.neutral300}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text weight="regular" style={styles.label}>
            Comment (optional)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Share more about your experience"
            placeholderTextColor={Colors.neutral400}
            value={comment}
            onChangeText={setComment}
            multiline
            textAlignVertical="top"
            editable={!submitting}
          />

          <Button
            onPress={handleSubmit}
            disabled={submitting || rating < 1}
            style={styles.submitButton}
          >
            {submitting ? (
              <ActivityIndicator color="white" />
            ) : (
              "Submit review"
            )}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.black100,
  },
  closeButton: {
    padding: 4,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.neutral,
  },
  starsRow: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.black100,
    backgroundColor: Colors.lightBeige,
  },
  submitButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 4,
  },
});
