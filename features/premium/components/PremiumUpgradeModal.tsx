import premiumIcon from "@/assets/icons/lock-circle.png";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";

interface PremiumUpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  onViewPlans: () => void;
}

export default function PremiumUpgradeModal({
  visible,
  onClose,
  onViewPlans,
}: PremiumUpgradeModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Premium Icon */}
          <View style={styles.iconContainer}>
            <Image source={premiumIcon} resizeMode="contain" />
          </View>

          <View>
            {/* Title */}
            <Text weight="semibold" style={styles.title}>
              Upgrade to Premium Care
            </Text>
            {/* Description */}
            <Text weight="regular" style={styles.description}>
              Get continuous medical support and priority access.
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button onPress={onViewPlans}>View Plans</Button>
            <Button onPress={onClose} type="secondary">
              Not Now
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 343,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    gap: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    lineHeight: 28.6,
    letterSpacing: -0.8,
    color: Colors.black100,
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: "#71717A",
    textAlign: "center",
    marginBottom: 12,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
});
