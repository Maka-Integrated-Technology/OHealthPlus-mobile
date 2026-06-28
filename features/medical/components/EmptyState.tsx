import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={28} color={Colors.neutral600} />
      </View>
      <Text weight="semibold" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text weight="regular" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 8,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.homeneutral,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.4,
    color: Colors.black100,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.neutral,
    textAlign: "center",
  },
});
