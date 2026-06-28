import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

export type ShareMethod = "copy" | "whatsapp" | "email" | "message";

interface ShareResultSheetProps {
  visible: boolean;
  onClose: () => void;
  onShare: (method: ShareMethod) => void;
}

const OPTIONS: {
  method: ShareMethod;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { method: "copy", label: "Copy link", icon: "link-outline" },
  { method: "whatsapp", label: "WhatsApp", icon: "logo-whatsapp" },
  { method: "email", label: "Email", icon: "mail-outline" },
  { method: "message", label: "Message", icon: "chatbubble-outline" },
];

export function ShareResultSheet({
  visible,
  onClose,
  onShare,
}: ShareResultSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.sheet}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={8}>
            <Ionicons name="close" size={20} color={Colors.neutral} />
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <Ionicons name="share-social-outline" size={24} color={Colors.primary} />
          </View>

          <Text weight="semibold" style={styles.title}>
            Share Lab Result
          </Text>
          <Text weight="regular" style={styles.subtitle}>
            Share your lab report with trusted healthcare providers.
          </Text>

          <View style={styles.options}>
            {OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.method}
                style={styles.option}
                activeOpacity={0.7}
                onPress={() => onShare(option.method)}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name={option.icon} size={22} color={Colors.primary} />
                </View>
                <Text weight="regular" style={styles.optionLabel}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
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
    paddingTop: 28,
    paddingBottom: 36,
    alignItems: "center",
    gap: 8,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 4,
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
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  option: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.lightBlue2,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    fontSize: 12,
    color: Colors.neutral,
  },
});
