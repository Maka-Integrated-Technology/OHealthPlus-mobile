import { BackButton } from "@/components/BackButton";
import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Laboratory() {
  const router = useAppRouter();

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Laboratory
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.locationRow}>
          <Ionicons name="location" size={18} color={Colors.primary} />
          <Text weight="medium" style={styles.locationText}>
            Lagos Island, Lagos
          </Text>
          <Ionicons name="chevron-down" size={16} color={Colors.neutral} />
        </View>

        <View style={styles.intro}>
          <Text weight="bold" style={styles.introTitle}>
            Book Laboratory Tests
          </Text>
          <Text weight="medium" style={styles.introDescription}>
            Find nearby accredited laboratories, upload a doctor&apos;s
            request, or search for tests yourself.
          </Text>
        </View>

        <Pressable
          onPress={() => router.toUploadTestRequest()}
          style={styles.card}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="cloud-upload-outline" size={24} color={Colors.primary} />
          </View>
          <Text weight="semibold" style={styles.cardTitle}>
            Upload Test Request
          </Text>
          <Text weight="regular" style={styles.cardDescription}>
            Upload a doctor&apos;s prescription or laboratory request.
          </Text>
          <View style={styles.cardAction}>
            <Text weight="semibold" style={styles.cardActionText}>
              Upload Request
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.toSearchTests()}
          style={styles.card}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </View>
          <Text weight="semibold" style={styles.cardTitle}>
            Search Tests
          </Text>
          <Text weight="regular" style={styles.cardDescription}>
            Know the test you need? Search and book directly.
          </Text>
          <View style={styles.cardAction}>
            <Text weight="semibold" style={styles.cardActionText}>
              Search Tests
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.toMyTests()}
          style={styles.card}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="flask-outline" size={24} color={Colors.primary} />
          </View>
          <Text weight="semibold" style={styles.cardTitle}>
            My Lab Tests
          </Text>
          <Text weight="regular" style={styles.cardDescription}>
            View your upcoming appointments and completed test results.
          </Text>
          <View style={styles.cardAction}>
            <Text weight="semibold" style={styles.cardActionText}>
              View Tests
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </View>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    paddingTop: 8,
    paddingBottom: 12,
    marginTop: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingBottom: 24,
    gap: 25,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  locationText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.black100,
  },
  intro: {
    gap: 4,
  },
  introTitle: {
    fontSize: 18,
    lineHeight: 27,
    color: Colors.black100,
  },
  introDescription: {
    fontSize: 12,
    lineHeight: 21,
    color: Colors.lightGray2,
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 18,
    gap: 15,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 28,
    color: Colors.black300,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightGray2,
  },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cardActionText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.primary,
  },
});
