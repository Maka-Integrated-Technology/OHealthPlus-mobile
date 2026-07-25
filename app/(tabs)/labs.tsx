import Pressable from "@/components/Pressable";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function TestsAndMeds() {
  const router = useAppRouter();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.intro}>
          <Text weight="bold" style={styles.title}>
            Your Health, Made Simpler
          </Text>
          <Text weight="medium" style={styles.description}>
            Access trusted laboratory services and pharmacy delivery, all in
            one place.
          </Text>
        </View>

        <Pressable
          onPress={() => router.toLabEnableLocation({ next: "laboratory" })}
        >
          <LinearGradient
            colors={["#3B5FE3", "#7CA0FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="flask-outline" size={22} color="#fff" />
            </View>
            <Text weight="bold" style={styles.cardTitle}>
              Laboratory
            </Text>
            <Text weight="regular" style={styles.cardDescription}>
              Book medical tests, schedule home sample collection, and
              receive accurate results from trusted diagnostic partners.
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={() =>
            Alert.alert("Coming soon", "Pharmacy delivery is coming soon.")
          }
        >
          <LinearGradient
            colors={["#059669", "#4ADE80"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="bandage-outline" size={22} color="#fff" />
            </View>
            <Text weight="bold" style={styles.cardTitle}>
              Pharmacy
            </Text>
            <Text weight="regular" style={styles.cardDescription}>
              Browse medications, redeem prescriptions, refill treatments,
              and get your medicines delivered safely to your doorstep.
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingBottom: 24,
    gap: 20,
  },
  intro: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    color: Colors.black100,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.lightGray2,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 12,
    overflow: "hidden",
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#fff",
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255,255,255,0.9)",
  },
});
