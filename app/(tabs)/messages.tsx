// import AIHealthAssistantIcon from "@/assets/icons/AI-Health-Assistant.png";
import AIHealthAssistantIcon from "@/assets/images/ai-assistant.png";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, View } from "react-native";

type Thread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread?: number;
  avatarUri?: string;
  isSupport?: boolean;
};

const THREADS: Thread[] = [
  {
    id: "1",
    name: "Dr. Aisha Bello",
    role: "General Doctor",
    preview: "Your lab result is ready for review.",
    time: "10:24 AM",
    unread: 2,
    avatarUri: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Emeka Okafor",
    role: "Cardiologist",
    preview: "Please keep tracking your blood pressure.",
    time: "Yesterday",
    avatarUri: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Care Coordination",
    role: "Support",
    preview: "Your medication delivery has been scheduled.",
    time: "Mon",
    isSupport: true,
  },
];

export default function MessagesScreen() {
  const router = useAppRouter();

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
        {/* AI Assistant card */}
        <Pressable
          onPress={() => router.toAIHealthAssistant()}
          style={styles.aiCard}
        >
          <View style={styles.aiCardLeft}>
            <View style={styles.aiIconWrapper}>
              <Image source={AIHealthAssistantIcon} style={styles.aiIcon} />
            </View>
            <View style={styles.aiCardText}>
              <Text weight="semibold" style={styles.aiCardTitle}>
                AI Health Assistant
              </Text>
              <Text weight="regular" style={styles.aiCardSubtitle}>
                Get symptom guidance and care direction
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
        </Pressable>

        {/* Provider threads */}
        <View style={styles.sectionHeader}>
          <Text weight="semibold" style={styles.sectionTitle}>
            Care team
          </Text>
        </View>

        <View style={styles.threadList}>
          {THREADS.map((thread, index) => (
            <Pressable
              key={thread.id}
              style={styles.threadRow}
              onPress={() => {}}
            >
              {thread.isSupport ? (
                <View style={styles.supportAvatar}>
                  <Ionicons name="medical" size={20} color={Colors.primary} />
                </View>
              ) : (
                <Image
                  source={{ uri: thread.avatarUri }}
                  style={styles.avatar}
                />
              )}

              <View style={styles.threadContent}>
                <View style={styles.threadTopRow}>
                  <Text weight="semibold" style={styles.threadName}>
                    {thread.name}
                  </Text>
                  <Text weight="regular" style={styles.threadTime}>
                    {thread.time}
                  </Text>
                </View>
                <View style={styles.threadBottomRow}>
                  <View style={styles.threadTextBlock}>
                    <Text weight="regular" style={styles.threadRole}>
                      {thread.role}
                    </Text>
                    <Text
                      weight="regular"
                      style={styles.threadPreview}
                      numberOfLines={1}
                    >
                      {thread.preview}
                    </Text>
                  </View>
                  {thread.unread ? (
                    <View style={styles.unreadBadge}>
                      <Text weight="semibold" style={styles.unreadText}>
                        {thread.unread}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>

              {index < THREADS.length - 1 && (
                <View style={styles.threadDivider} />
              )}
            </Pressable>
          ))}
        </View>
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
  aiIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  aiIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    tintColor: "white",
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

  // Section
  sectionHeader: {
    marginBottom: -8,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.4,
    color: Colors.black100,
  },

  // Thread list
  threadList: {
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 16,
    overflow: "hidden",
  },
  threadRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    position: "relative",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.homeneutral,
  },
  supportAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.lightBlue2,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    alignItems: "center",
    justifyContent: "center",
  },
  threadContent: {
    flex: 1,
    gap: 3,
  },
  threadTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  threadName: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.3,
    color: Colors.black100,
  },
  threadTime: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.neutral400,
  },
  threadBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  threadTextBlock: {
    flex: 1,
    gap: 1,
  },
  threadRole: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.neutral400,
  },
  threadPreview: {
    fontSize: 13,
    lineHeight: 17,
    color: Colors.neutral,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    fontSize: 11,
    color: "white",
  },
  threadDivider: {
    position: "absolute",
    bottom: 0,
    left: 72,
    right: 0,
    height: 1,
    backgroundColor: Colors.homeneutral,
  },
});
