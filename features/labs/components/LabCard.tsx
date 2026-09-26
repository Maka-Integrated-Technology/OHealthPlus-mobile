import Pressable from "@/components/Pressable";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import type { Lab } from "../types";

interface LabCardProps {
  lab: Lab;
  onPress: () => void;
}

export default function LabCard({ lab, onPress }: LabCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={lab.image} style={styles.image} resizeMode="cover" />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#F79009" />
          <Text weight="bold" style={styles.ratingText}>
            {lab.rating.toFixed(1)}
          </Text>
        </View>
        {lab.offersHomeCollection && (
          <View style={styles.homeCollectionBadge}>
            <Ionicons name="car-outline" size={14} color="white" />
            <Text weight="bold" style={styles.homeCollectionText}>
              Home Collection
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text weight="semibold" style={styles.name}>
            {lab.name}
          </Text>
          <Text weight="bold" style={styles.price}>
            ₦{lab.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color={Colors.neutral} />
            <Text weight="medium" style={styles.metaText}>
              {lab.distanceKm} km
            </Text>
          </View>
          <View style={styles.dot} />
          <Text
            weight="medium"
            style={[
              styles.statusText,
              { color: lab.isOpenNow ? "#00A63E" : Colors.red500 },
            ]}
          >
            {lab.isOpenNow ? "Open Now" : "Closed"}
          </Text>
        </View>

        <View style={styles.waitBadge}>
          <Ionicons name="time-outline" size={13} color={Colors.black300} />
          <Text weight="medium" style={styles.waitText}>
            {lab.waitTimeLabel}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "white",
  },
  imageContainer: {
    height: 128,
    width: "100%",
    backgroundColor: Colors.homeneutral,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(248,250,252,0.9)",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black300,
  },
  homeCollectionBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,201,80,0.9)",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  homeCollectionText: {
    fontSize: 12,
    lineHeight: 16,
    color: "white",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.black100,
  },
  price: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.black100,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  metaText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.neutral600,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 20,
  },
  waitBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: Colors.homeneutral,
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  waitText: {
    fontSize: 11,
    lineHeight: 16,
    color: Colors.black300,
  },
});
