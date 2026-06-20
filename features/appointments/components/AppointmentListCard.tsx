import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { appointmentAssets } from "../assets";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface AppointmentListCardProps {
  image: ImageSourcePropType | { uri: string };
  doctorName: string;
  specialization: string;
  consultationType: "video" | "chat";
  dateTime: string;
  status: AppointmentStatus;
  canJoin?: boolean;
  isExpanded?: boolean;
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
  isExpanded = false,
  onPress,
  onJoinPress,
}: AppointmentListCardProps) {
  const icons = appointmentAssets.icons;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {/* <Image source={image as ImageSourcePropType} style={styles.avatar} /> */}
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
            <View
              style={[
                styles.tag,
                status === "completed" && styles.tagCompleted,
                status === "cancelled" && styles.tagCancelled,
              ]}
            >
              <Text
                weight="regular"
                style={[
                  styles.tagText,
                  status === "completed" && styles.tagTextCompleted,
                  status === "cancelled" && styles.tagTextCancelled,
                ]}
              >
                {status === "upcoming"
                  ? "Upcoming"
                  : status === "cancelled"
                  ? "Cancelled"
                  : "Completed"}
              </Text>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.detailsRow}>
              <Image
                source={consultationType === "video" ? icons.cameraIcon : icons.chatIcon}
                style={styles.icon}
              />
              <Text weight="regular" style={styles.subText}>
                {consultationType === "video" ? "Video" : "Chat"} Consultation
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Image source={icons.calendarIcon} style={styles.icon} />
              <Text weight="regular" style={styles.subText}>{dateTime}</Text>
            </View>
          </View>

          {status === "upcoming" && canJoin && isExpanded && onJoinPress && (
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
    borderRadius: 16,
    padding: 14,
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
    gap: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameBlock: {
    gap: 8,
  },
  name: {
    fontSize: 18,
    lineHeight: 19.8,
    // letterSpacing: -0.8,
    color: Colors.black200,
  },
  specialization: {
    fontSize: 16,
    lineHeight: 19.2,
    // letterSpacing: -0.8,
    color: Colors.neutral,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  tagCompleted: {
    backgroundColor: Colors.homeneutral,
  },
  tagCancelled: {
    backgroundColor: "#FEF2F2",
  },
  tagText: {
    fontSize: 14,
    lineHeight: 16.8,
    // letterSpacing: -0.5,
    color: Colors.primary,
  },
  tagTextCompleted: {
    color: Colors.black200,
  },
  tagTextCancelled: {
    color: "#DC2626",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  joinButton: {
    marginTop: 4,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
  },
  details: {
    flex: 1,
    gap: 6,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  subText: {
    fontSize: 16,
    lineHeight: 19.2,
    // letterSpacing: -0.8,
    color: Colors.neutral,
  },
});
