import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { labsData } from "@/features/labs/constants/labs";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";

export default function LabOverview() {
  const router = useAppRouter();
  const { labId } = useLocalSearchParams<{ labId?: string }>();
  const lab = labsData.find((l) => l.id === labId) ?? labsData[0];

  return (
    <Screen style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroWrap}>
          <Image source={lab.image} style={styles.hero} resizeMode="cover" />
          <View style={styles.heroBackButton}>
            <BackButton style={{ marginBottom: 0 }} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text weight="bold" style={styles.name}>
              {lab.name}
            </Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#F79009" />
              <Text weight="bold" style={styles.ratingText}>
                {lab.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text weight="regular" style={styles.about}>
            {lab.about}
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color={Colors.black300} />
              <View>
                <Text weight="medium" style={styles.infoPrimary}>
                  {lab.address}
                </Text>
                <Text weight="regular" style={styles.infoSecondary}>
                  {lab.distanceKm} km away
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={Colors.black300} />
              <View style={styles.hoursRow}>
                <Text
                  weight="medium"
                  style={[
                    styles.hoursStatus,
                    { color: lab.isOpenNow ? "#00A63E" : Colors.red500 },
                  ]}
                >
                  {lab.isOpenNow ? "Open Now" : "Closed"}
                </Text>
                {lab.closesAtLabel && (
                  <Text weight="regular" style={styles.infoSecondary}>
                    {" "}
                    · {lab.closesAtLabel}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <Text weight="semibold" style={styles.servicesTitle}>
            Available Services
          </Text>
          <View style={styles.servicesRow}>
            {lab.services.map((service) => (
              <View key={service} style={styles.serviceTag}>
                <Text weight="medium" style={styles.serviceTagText}>
                  {service}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => Alert.alert("Contact", "Calling laboratories is coming soon.")}
          style={styles.contactButton}
        >
          <Ionicons name="call-outline" size={24} color={Colors.black100} />
          <Text weight="semibold" style={styles.contactText}>
            Contact
          </Text>
        </Pressable>
        <Button
          onPress={() => router.toSelectLabDateTime({ labId: lab.id })}
          style={styles.bookButton}
        >
          Book now
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0 },
  scrollContent: { paddingBottom: 24 },
  heroWrap: {
    height: 188,
    width: "100%",
  },
  hero: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  heroBackButton: {
    position: "absolute",
    top: 37,
    left: 16,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.homeneutral,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black300,
  },
  about: {
    fontSize: 14,
    lineHeight: 22.75,
    color: "#64748B",
  },
  infoCard: {
    borderWidth: 1,
    borderColor: Colors.neutral200,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoPrimary: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black300,
  },
  infoSecondary: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },
  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hoursStatus: {
    fontSize: 14,
    lineHeight: 20,
  },
  servicesTitle: {
    fontSize: 16,
    lineHeight: 28,
    color: Colors.black100,
  },
  servicesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  serviceTag: {
    backgroundColor: Colors.homeneutral,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  serviceTagText: {
    fontSize: 11,
    lineHeight: 18,
    color: Colors.black100,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 21,
    paddingTop: 11,
    paddingBottom: 21,
    borderTopWidth: 1,
    borderTopColor: Colors.homeneutral,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    width: 122,
    height: 56,
    borderRadius: 20,
    backgroundColor: Colors.homeneutral,
  },
  contactText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black100,
  },
  bookButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
  },
});
