import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

type ToggleItem = {
  id: string;
  label: string;
  value: boolean;
  setter: (v: boolean) => void;
};

type NavItem = {
  id: string;
  label: string;
  subLabel: string;
};

function SectionLabel({ title }: { title: string }) {
  return (
    <Text weight="regular" style={styles.sectionLabel}>
      {title}
    </Text>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
  noBorder,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  noBorder?: boolean;
}) {
  return (
    <View style={[styles.row, noBorder && styles.rowNoBorder]}>
      <Text weight="regular" style={styles.rowLabel}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: Colors.neutral200, true: Colors.primary }}
        thumbColor="white"
        ios_backgroundColor={Colors.neutral200}
      />
    </View>
  );
}

function NavRow({
  label,
  subLabel,
  noBorder,
}: {
  label: string;
  subLabel: string;
  noBorder?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.row, noBorder && styles.rowNoBorder]}
      activeOpacity={0.7}
    >
      <Text weight="regular" style={styles.rowLabel}>
        {label}
      </Text>
      <View style={styles.navRight}>
        <Text weight="regular" style={styles.navSubLabel}>
          {subLabel}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.neutral400} />
      </View>
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  // Message notifications
  const [showNotification, setShowNotification] = useState(true);
  const [aiNotifications, setAiNotifications] = useState(true);

  // Reminders
  const [medicationReminder, setMedicationReminder] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);

  // Updates
  const [labResult, setLabResult] = useState(true);
  const [healthTips, setHealthTips] = useState(true);
  const [personalInformation, setPersonalInformation] = useState(true);

  return (
    <Screen>
      <DetailHeader title="Notifications" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Text weight="regular" style={styles.infoBannerText}>
            Manage how you receive notifications from OHealth+
          </Text>
          <Text weight="regular" style={styles.localNoteText}>
            These preferences are saved on this device only and won't sync
            across devices.
          </Text>
        </View>

        {/* Message notifications section */}
        <View style={styles.section}>
          <SectionLabel title="Message notifications" />
          <View style={styles.card}>
            <ToggleRow
              label="Show Notification"
              value={showNotification}
              onChange={setShowNotification}
            />
            <NavRow label="Sound" subLabel="Notes" />
            <ToggleRow
              label="AI Notifications"
              value={aiNotifications}
              onChange={setAiNotifications}
              noBorder
            />
          </View>
        </View>

        {/* Reminders section */}
        <View style={styles.section}>
          <SectionLabel title="Reminders" />
          <View style={styles.card}>
            <ToggleRow
              label="Medication Reminder"
              value={medicationReminder}
              onChange={setMedicationReminder}
            />
            <ToggleRow
              label="Appointment Reminders"
              value={appointmentReminders}
              onChange={setAppointmentReminders}
              noBorder
            />
          </View>
        </View>

        {/* Updates section */}
        <View style={styles.section}>
          <SectionLabel title="Reminders" />
          <View style={styles.card}>
            <ToggleRow
              label="Lab Result"
              value={labResult}
              onChange={setLabResult}
            />
            <ToggleRow
              label="Health Tips"
              value={healthTips}
              onChange={setHealthTips}
            />
            <ToggleRow
              label="Personal Information"
              value={personalInformation}
              onChange={setPersonalInformation}
              noBorder
            />
          </View>
        </View>

        {/* Note */}
        <View style={styles.noteWrapper}>
          <Text weight="regular" style={styles.noteText}>
            <Text weight="semibold" style={styles.noteText}>
              Note:{" "}
            </Text>
            Some notifications are required for the proper functioning of your
            healthcare services and cannot be disabled.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
    gap: 20,
  },
  infoBanner: {
    backgroundColor: Colors.lightBlue2,
    borderRadius: 12,
    padding: 14,
  },
  infoBannerText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral,
  },
  localNoteText: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.neutral400,
    marginTop: 6,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 13,
    lineHeight: 15.6,
    color: Colors.neutral400,
    letterSpacing: -0.2,
  },
  card: {
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 14,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.homeneutral,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.black100,
    flex: 1,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  navSubLabel: {
    fontSize: 14,
    color: Colors.neutral400,
  },
  noteWrapper: {
    paddingTop: 4,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.neutral,
  },
});
