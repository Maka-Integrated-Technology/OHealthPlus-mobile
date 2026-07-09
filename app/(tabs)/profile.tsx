import avatar from "@/assets/images/avatar-full.jpg";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useGetMe, useLogout } from "@/features/auth/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  badge?: string;
  destructive?: boolean;
};

export default function ProfileScreen() {
  const router = useAppRouter();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const { data: user, isLoading, isError, refetch } = useGetMe();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch {
            // Even if the server call fails, local storage is cleared by
            // useLogout's onSettled — so navigation is always safe.
          } finally {
            router.toSignIn();
          }
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      id: "personal",
      label: "Personal Information",
      icon: "person-outline",
      onPress: () => router.toPersonalInformation(),
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: "star-outline",
      onPress: () => router.toSubscription(),
    },
    {
      id: "medical",
      label: "Medical Records",
      icon: "fitness-outline",
      onPress: () => router.toMedicalRecords(),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "notifications-outline",
      onPress: () => router.toNotifications(),
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: "lock-closed-outline",
      onPress: () => router.toChangePassword(),
    },
    {
      id: "language",
      label: "Language",
      icon: "language-outline",
    },
    {
      id: "privacy",
      label: "Privacy Policy",
      icon: "lock-closed-outline",
      onPress: () => router.toPrivacyPolicy(),
    },
    {
      id: "terms",
      label: "Terms & Conditions",
      icon: "document-text-outline",
      onPress: () => router.toTermsAndConditions(),
    },
    {
      id: "help",
      label: "Help & Support",
      icon: "help-circle-outline",
    },
  ];

  const destructiveItems: MenuItem[] = [
    {
      id: "logout",
      label: isLoggingOut ? "Logging out…" : "Log out",
      icon: "log-out-outline",
      onPress: handleLogout,
      destructive: true,
    },
    {
      id: "delete",
      label: "Delete Account",
      icon: "trash-outline",
      destructive: true,
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.menuRow,
        item.disabled && styles.menuRowDisabled,
        item.destructive && styles.menuRowDestructive,
      ]}
      onPress={item.onPress}
      activeOpacity={item.disabled ? 1 : 0.7}
      disabled={!item.onPress && !item.destructive}
    >
      <Ionicons
        name={item.icon}
        size={22}
        color={
          item.disabled
            ? Colors.neutral300
            : item.destructive
              ? Colors.red500
              : Colors.black300
        }
        style={styles.menuIcon}
      />
      <Text
        weight="regular"
        style={[
          styles.menuLabel,
          item.disabled && styles.menuLabelDisabled,
          item.destructive && styles.menuLabelDestructive,
        ]}
      >
        {item.label}
      </Text>
      <View style={styles.menuRight}>
        {item.badge ? (
          <Text weight="regular" style={styles.comingSoon}>
            {item.badge}
          </Text>
        ) : (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={item.destructive ? Colors.red500 : Colors.neutral300}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue header */}
        <View style={styles.blueHeader} />

        {/* Avatar overlapping header.
            TODO: backend does not currently return a user avatar/profile image.
            Keeping local fallback asset until such a field exists. */}
        <View style={styles.avatarWrapper}>
          <Image source={avatar} style={styles.avatar} />
        </View>

        <View style={{ paddingHorizontal: 16, gap: 20 }}>
          {/* Name + email */}
          <View style={styles.userInfo}>
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} />
            ) : isError ? (
              <>
                <Text weight="semibold" style={styles.userName}>
                  —
                </Text>
                <Text
                  weight="medium"
                  style={styles.retryText}
                  onPress={() => refetch()}
                >
                  Failed to load profile. Tap to retry.
                </Text>
              </>
            ) : (
              <>
                <Text weight="semibold" style={styles.userName}>
                  {user
                    ? `${user.first_name} ${user.last_name}`.trim()
                    : "—"}
                </Text>
                <Text weight="regular" style={styles.userEmail}>
                  {user?.email ?? ""}
                </Text>
              </>
            )}
          </View>

          {/* Main menu */}
          <View style={styles.menuGroup}>{menuItems.map(renderMenuItem)}</View>

          {/* Destructive actions */}
          <View style={styles.menuGroup}>
            {destructiveItems.map(renderMenuItem)}
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  blueHeader: {
    height: 120,
    backgroundColor: Colors.primary,
    width: "100%",
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: -52,
    zIndex: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
    gap: 20,
  },
  userInfo: {
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontSize: 18,
    lineHeight: 21.6,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  userEmail: {
    fontSize: 14,
    lineHeight: 16.8,
    color: Colors.neutral,
  },
  retryText: {
    fontSize: 13,
    color: Colors.primary,
    textAlign: "center",
  },
  menuGroup: {
    gap: 8,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  menuRowDisabled: {
    opacity: 0.6,
  },
  menuRowDestructive: {
    backgroundColor: "#FFF1F0",
    borderColor: "#FECACA",
  },
  menuIcon: {},
  menuLabel: {
    flex: 1,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  menuLabelDisabled: {
    color: Colors.neutral300,
  },
  menuLabelDestructive: {
    color: Colors.red500,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  comingSoon: {
    fontSize: 13,
    color: Colors.neutral400,
  },
});
