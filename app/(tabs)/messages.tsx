import AIHealthAssistant from "@/assets/images/ai-assistant.png";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useChatHistory } from "@/features/messages/hooks/useChat";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function MessagesScreen() {
  const router = useAppRouter();
  const { data: history } = useChatHistory();

  // Build a preview from the most recent message, if any.
  const lastMessage = (history?.messages ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )[0];
  const preview = lastMessage
    ? lastMessage.sender === "user"
      ? `You: ${lastMessage.content}`
      : lastMessage.content
    : "Get symptom guidance and care direction";

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <Text weight="semibold" style={styles.title}>
          Messages
        </Text>
        <Text weight="regular" style={styles.subtitle}>
          Secure conversations with your care team
        </Text>
      </View>
      <View style={styles.headerDivider} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Assistant card — backed by /chat/history */}
        <Pressable
          onPress={() => router.toAIHealthAssistant()}
          style={styles.aiCard}
        >
          <View style={styles.aiCardLeft}>
            <Image source={AIHealthAssistant} style={styles.aiIcon} />
            <View style={styles.aiCardText}>
              <Text weight="semibold" style={styles.aiCardTitle}>
                AI Health Assistant
              </Text>
              <Text
                weight="regular"
                style={styles.aiCardSubtitle}
                numberOfLines={1}
              >
                {preview}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
        </Pressable>

        {/* NOTE: Provider/care-team messaging is not supported by the backend.
            Only AI chat history exists. If a provider messaging endpoint is
            added in the future, render those threads here. */}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    paddingBottom: 12,
    gap: 4,
  },
  title: {
    fontSize: 18,
    lineHeight: 21.6,
    letterSpacing: -0.8,
    color: Colors.black100,
    textAlign: "center",
    paddingVertical: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral,
    textAlign: "center",
  },
  headerDivider: {
    height: 1,
    backgroundColor: Colors.homeneutral,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
    gap: 20,
  },

  // AI card
  aiCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.transparentPrimary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  aiCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  aiIcon: {
    width: 50,
    height: 50,
  },
  aiCardText: {
    flex: 1,
    gap: 2,
  },
  aiCardTitle: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.4,
    color: Colors.black100,
  },
  aiCardSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.neutral,
  },
});
