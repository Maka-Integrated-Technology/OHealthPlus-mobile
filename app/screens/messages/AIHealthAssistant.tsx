import AIHealthAssistantIcon from "@/assets/icons/ai-assistant-icon.svg";
import AIHealthAssistant from "@/assets/images/ai-assistant.png";
import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useChatHistory, useSendChatMessage } from "@/features/messages/hooks/useChat";
import type { ChatMessage } from "@/features/messages/types";
import { getApiErrorMessage } from "@/utils/apiError";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type ViewState = "intro" | "chat";

const PROMPT_CARDS = [
  { id: "1", emoji: "🤦", label: "I'm not feeling well" },
  { id: "2", emoji: "📓", label: "I have a health concern" },
  { id: "3", emoji: "👨‍⚕️", label: "I want to talk to a doctor", action: "doctor" as const },
  { id: "4", emoji: "❓", label: "I don't know what's wrong" },
];

/** Convert a backend ChatMessage to the local Message shape. */
function toMessage(msg: ChatMessage): Message {
  return {
    id: msg.id,
    role: msg.sender === "user" ? "user" : "assistant",
    text: msg.content,
  };
}

export default function AIHealthAssistantScreen() {
  const router = useAppRouter();
  const [viewState, setViewState] = useState<ViewState>("intro");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const { data: history, isLoading: historyLoading } = useChatHistory();
  const { mutateAsync: sendMessage, isPending: isSending } = useSendChatMessage();

  // Hydrate messages from chat history once loaded.
  useEffect(() => {
    if (hydrated || !history) return;
    const apiMessages = (history.messages ?? [])
      .slice()
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .map(toMessage);

    if (apiMessages.length > 0) {
      setMessages(apiMessages);
      setViewState("chat");
    }
    // Pick the most recent chat id to continue the conversation.
    const recentChat = (history.chats ?? [])
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )[0];
    if (recentChat) setChatId(recentChat.id);
    setHydrated(true);
  }, [history, hydrated]);

  const scrollToBottom = () =>
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMsg: Message = {
      id: `u${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setViewState("chat");
    scrollToBottom();

    try {
      const res = await sendMessage({ chatId, content: trimmed });
      if (res.chatId) setChatId(res.chatId);
      const aiMsg: Message = {
        id: `a${Date.now()}`,
        role: "assistant",
        text: res.ai,
      };
      setMessages((prev) => [...prev, aiMsg]);
      scrollToBottom();
    } catch (err) {
      Alert.alert("Error", getApiErrorMessage(err));
    }
  };

  const canSend = useMemo(() => inputText.trim().length > 0 && !isSending, [inputText, isSending]);

  return (
    <Screen>
      <DetailHeader title="AI Health Assistant" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {viewState === "intro" && !historyLoading ? (
          <ScrollView
            contentContainerStyle={styles.introContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.heroWrapper}>
              <Image source={AIHealthAssistant} style={styles.heroIcon} />
            </View>

            <Text weight="bold" style={styles.introHeading}>
              How can I help you today?
            </Text>
            <Text weight="regular" style={styles.introDescription}>
              I can help you understand your symptoms and guide you to the right
              care.
            </Text>

            <View style={styles.promptGrid}>
              {PROMPT_CARDS.map((card, i) => (
                <TouchableOpacity
                  key={card.id}
                  style={[
                    styles.promptCard,
                    i % 2 === 0
                      ? styles.promptCardLeft
                      : styles.promptCardRight,
                  ]}
                  onPress={() => {
                    if ("action" in card && card.action === "doctor") {
                      router.toBookAppointments();
                      return;
                    }
                    handleSend(card.label);
                  }}
                  disabled={isSending}
                  activeOpacity={0.75}
                >
                  <Text style={styles.promptEmoji}>{card.emoji}</Text>
                  <Text weight="medium" style={styles.promptLabel}>
                    {card.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : viewState === "intro" && historyLoading ? (
          <View style={styles.center}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : (
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.chatContent}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.role === "user"
                    ? styles.messageRowUser
                    : styles.messageRowAssistant,
                ]}
              >
                {msg.role === "assistant" && (
                  <AIHealthAssistantIcon width={25} height={25} />
                )}
                <View style={styles.bubbleWrapper}>
                  <View
                    style={[
                      styles.bubble,
                      msg.role === "user"
                        ? styles.bubbleUser
                        : styles.bubbleAssistant,
                    ]}
                  >
                    <Text
                      weight="regular"
                      style={[
                        styles.bubbleText,
                        msg.role === "user"
                          ? styles.bubbleTextUser
                          : styles.bubbleTextAssistant,
                      ]}
                    >
                      {msg.text}
                    </Text>
                  </View>
                  {msg.role === "assistant" && (
                    <Pressable style={styles.speakerRow}>
                      <Ionicons
                        name="volume-medium-outline"
                        size={14}
                        color={Colors.neutral400}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
            {isSending && (
              <View style={[styles.messageRow, styles.messageRowAssistant]}>
                <AIHealthAssistantIcon width={25} height={25} />
                <View style={styles.bubbleWrapper}>
                  <View style={[styles.bubble, styles.bubbleAssistant]}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        )}

        {/* Composer */}
        <View style={styles.composer}>
          <TouchableOpacity style={styles.composerIcon}>
            <Ionicons name="add" size={22} color={Colors.neutral400} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type your concern..."
              placeholderTextColor={Colors.neutral400}
              value={inputText}
              onChangeText={setInputText}
              multiline
              editable={!isSending}
              onFocus={() => {
                if (viewState === "intro") return;
                scrollToBottom();
              }}
            />
            <TouchableOpacity style={styles.micButton}>
              <Ionicons
                name="mic-outline"
                size={18}
                color={Colors.neutral400}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
            disabled={!canSend}
            onPress={() => handleSend(inputText)}
          >
            <Ionicons name="paper-plane" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  flex: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Intro
  introContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: "center",
    gap: 12,
  },
  heroWrapper: {
    marginBottom: 8,
    alignItems: "center",
  },
  heroIcon: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  introHeading: {
    fontSize: 22,
    lineHeight: 26.4,
    letterSpacing: -0.8,
    color: Colors.black100,
    textAlign: "center",
    marginTop: 8,
  },
  introDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  promptGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
    width: "100%",
  },
  promptCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.lightBlue2,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 14,
    padding: 14,
    flex: 1,
    minWidth: "45%",
  },
  promptCardLeft: {},
  promptCardRight: {},
  promptEmoji: {
    fontSize: 24,
  },
  promptLabel: {
    fontSize: 13,
    lineHeight: 17,
    color: Colors.black100,
    flex: 1,
  },

  // Chat
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowAssistant: {
    justifyContent: "flex-start",
  },
  avatarBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  bubbleWrapper: {
    maxWidth: "72%",
    gap: 4,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: Colors.lightBlue2,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  bubbleTextUser: {
    color: "white",
  },
  bubbleTextAssistant: {
    color: Colors.black100,
  },
  speakerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 4,
  },

  // Composer
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.homeneutral,
    backgroundColor: "white",
  },
  composerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBlue2,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  input: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Colors.black100,
    maxHeight: 80,
    paddingVertical: 0,
  },
  micButton: {
    padding: 2,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
