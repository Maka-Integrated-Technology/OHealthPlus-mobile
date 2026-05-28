import AIHealthAssistantIcon from "@/assets/icons/ai-assistant-icon.svg";
import AIHealthAssistant from "@/assets/images/ai-assistant.png";
import { BackButton } from "@/components/BackButton";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
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
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type ViewState = "intro" | "chat";

const PROMPT_CARDS = [
  { id: "1", emoji: "🤒", label: "I'm not feeling well" },
  { id: "2", emoji: "📋", label: "I have a health concern" },
  { id: "3", emoji: "👨‍⚕️", label: "I want to talk to a doctor" },
  { id: "4", emoji: "❓", label: "I don't know what's wrong" },
];

const INITIAL_CONVERSATIONS: Record<string, Message[]> = {
  "I'm not feeling well": [
    { id: "u1", role: "user", text: "I'm not feeling well" },
    {
      id: "a1",
      role: "assistant",
      text: "Hi, I'm here to help. Tell me what's been going on.",
    },
  ],
  "I have a health concern": [
    { id: "u1", role: "user", text: "I have a health concern" },
    {
      id: "a1",
      role: "assistant",
      text: "I understand. Please tell me more about your concern so I can help.",
    },
  ],
  "I want to talk to a doctor": [
    { id: "u1", role: "user", text: "I want to talk to a doctor" },
    {
      id: "a1",
      role: "assistant",
      text: "I can help with that. Can you tell me a bit about what you'd like to discuss with the doctor?",
    },
  ],
  "I don't know what's wrong": [
    { id: "u1", role: "user", text: "I don't know what's wrong" },
    {
      id: "a1",
      role: "assistant",
      text: "That's okay — let's figure it out together. Can you describe how you're feeling right now?",
    },
  ],
};

const QUICK_REPLIES = ["Today", "A few days", "More than a week"];

export default function AIHealthAssistantScreen() {
  const [viewState, setViewState] = useState<ViewState>("intro");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const startConversation = (prompt: string) => {
    const initial = INITIAL_CONVERSATIONS[prompt] ?? [
      { id: "u1", role: "user" as const, text: prompt },
      {
        id: "a1",
        role: "assistant" as const,
        text: "Thanks for sharing. I'll ask a few questions to better understand your concern.",
      },
    ];

    const withFollowUp: Message[] = [
      ...initial,
      {
        id: "a2",
        role: "assistant",
        text: "How long have you been experiencing this?",
      },
    ];

    setMessages(withFollowUp);
    setShowQuickReplies(true);
    setViewState("chat");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    const assistantMsg: Message = {
      id: `a${Date.now()}`,
      role: "assistant",
      text: "Thanks. I can help you narrow this down. Are you experiencing any other symptoms?",
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputText("");
    setShowQuickReplies(false);
    setViewState("chat");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text weight="semibold" style={styles.headerTitle}>
          {viewState === "intro" ? "AI Health Assistant" : "Health Assistant"}
        </Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.headerDivider} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {viewState === "intro" ? (
          <ScrollView
            contentContainerStyle={styles.introContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Hero */}
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

            {/* Prompt grid */}
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
                  onPress={() => startConversation(card.label)}
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
                  // <View style={styles.avatarBubble}>
                  <AIHealthAssistantIcon width={25} height={25} />
                  // </View>
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
          </ScrollView>
        )}

        {/* Quick replies */}
        {viewState === "chat" && showQuickReplies && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRepliesContent}
            style={styles.quickRepliesRow}
          >
            {QUICK_REPLIES.map((reply) => (
              <TouchableOpacity
                key={reply}
                style={styles.quickReplyChip}
                onPress={() => sendMessage(reply)}
                activeOpacity={0.75}
              >
                <Text weight="medium" style={styles.quickReplyText}>
                  {reply}
                </Text>
              </TouchableOpacity>
            ))}
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
              onFocus={() => {
                if (viewState === "intro") return;
                setTimeout(
                  () => scrollRef.current?.scrollToEnd({ animated: true }),
                  300,
                );
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
            style={styles.sendButton}
            onPress={() => {
              if (viewState === "intro" && inputText.trim()) {
                startConversation(inputText.trim());
              } else {
                sendMessage(inputText);
              }
            }}
          >
            <Ionicons name="paper-plane" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  headerSpacer: {
    width: 40,
  },
  headerDivider: {
    height: 1,
    backgroundColor: Colors.homeneutral,
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

  // Quick replies
  quickRepliesRow: {
    maxHeight: 48,
    borderTopWidth: 1,
    borderTopColor: Colors.homeneutral,
    backgroundColor: "white",
  },
  quickRepliesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    alignItems: "center",
  },
  quickReplyChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.lightBlue2,
    marginRight: 4,
  },
  quickReplyText: {
    fontSize: 13,
    color: Colors.primary,
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
});
