import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { appointmentAssets } from "../assets";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

export type AppointmentStatus = "upcoming" | "completed";

interface AppointmentListCardProps {
  image: ImageSourcePropType | { uri: string };
  doctorName: string;
  specialization: string;
  consultationType: "video" | "chat";
  dateTime: string;
  status: AppointmentStatus;
  canJoin?: boolean;
  onPress?: () => void;
  onJoinPress?: () => void;
}

export default function AppointmentListCard({
  image,
  doctorName,
  specialization,
  consultationType,
  dateTime,
  status,
  canJoin = false,
  onPress,
  onJoinPress,
}: AppointmentListCardProps) {
  const icons = appointmentAssets.icons;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <Image source={image as ImageSourcePropType} style={styles.avatar} />
        <View style={styles.info}>
          <View style={styles.headerRow}>
            <View style={styles.nameBlock}>
              <Text weight="semibold" style={styles.name}>
                {doctorName}
              </Text>
              <Text weight="regular" style={styles.specialization}>
                {specialization}
              </Text>
            </View>
            <View style={[styles.tag, status === "completed" && styles.tagCompleted]}>
              <Text
                weight="medium"
                style={[styles.tagText, status === "completed" && styles.tagTextCompleted]}
              >
                {status === "upcoming" ? "Upcoming" : "Completed"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Image
              source={consultationType === "video" ? icons.cameraIcon : icons.chatIcon}
              style={styles.icon}
            />
            <Text weight="regular" style={styles.subText}>
              {consultationType === "video" ? "VIDEO" : "CHAT"} CONSULTATION
            </Text>
          </View>

          <View style={styles.row}>
            <Image source={icons.calendarIcon} style={styles.icon} />
            <Text weight="regular" style={styles.subText}>
              {dateTime}
            </Text>
          </View>

          {status === "upcoming" && canJoin && (
            <Button onPress={onJoinPress} style={styles.joinButton}>
              Join consultation
            </Button>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 12,
    padding: 16,
    borderColor: Colors.homeneutral,
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameBlock: {
    gap: 2,
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: Colors.black100,
  },
  specialization: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.neutral,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: Colors.transparentPrimary,
  },
  tagCompleted: {
    backgroundColor: Colors.neutral200,
  },
  tagText: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.2,
    color: Colors.primary,
  },
  tagTextCompleted: {
    color: Colors.neutral,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  subText: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.2,
    color: Colors.neutral,
    textTransform: "uppercase",
  },
  joinButton: {
    marginTop: 4,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
});
