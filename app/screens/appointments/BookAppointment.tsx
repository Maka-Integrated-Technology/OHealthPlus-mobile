import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import BookAppointmentCardList from "@/features/appointments/components/BookAppointmentcardListt";
import { StyleSheet, View } from "react-native";

export default function BookAppointment() {
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <BackButton style={{ marginBottom: 0 }} />
          <Text weight="semibold" style={styles.headerTitleText}>
            Choose a specialty
          </Text>
        </View>
        <Text weight="regular" style={styles.headerDescription}>
          Select the type of care you need
        </Text>
      </View>

      <BookAppointmentCardList />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    paddingTop: 8,
    paddingBottom: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitleText: {
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
  headerDescription: {
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.8,
    color: Colors.neutral,
    marginTop: 8,
  },
});
