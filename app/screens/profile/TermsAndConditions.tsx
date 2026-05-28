import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { ScrollView, StyleSheet, View } from "react-native";

type Section = {
  number: string;
  title: string;
  body: string;
};

const SECTIONS: Section[] = [
  {
    number: "1.",
    title: "Acceptance of Terms",
    body: "By accessing and using OHealth+, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.",
  },
  {
    number: "2.",
    title: "Use of Services",
    body: "OHealth+ provides a platform to connect patients with healthcare professionals. You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.",
  },
  {
    number: "3.",
    title: "Medical Disclaimer",
    body: "OHealth+ is not a healthcare provider. The platform facilitates connections between patients and licensed healthcare professionals. Any medical advice, diagnosis, or treatment you receive is provided by independent healthcare professionals, not by OHealth+.",
  },
  {
    number: "4.",
    title: "Privacy and Data Protection",
    body: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal and health information. We comply with all applicable healthcare privacy regulations including HIPAA.",
  },
  {
    number: "5.",
    title: "Appointment Booking and Cancellations",
    body: "You may book, reschedule, or cancel appointments through the platform. Cancellation policies may vary by healthcare provider. Late cancellations or no-shows may result in charges as determined by the individual healthcare provider.",
  },
  {
    number: "6.",
    title: "Payment Terms",
    body: "You agree to pay all fees associated with your use of OHealth+ services. Payment is due at the time of service unless otherwise arranged. We accept various payment methods as displayed in the app.",
  },
  {
    number: "7.",
    title: "Limitation of Liability",
    body: "OHealth+ shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, or for the cost of procurement of substitute services.",
  },
  {
    number: "8.",
    title: "Changes to Terms",
    body: 'We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the service constitutes acceptance of the modified terms.',
  },
];

export default function TermsAndConditionsScreen() {
  return (
    <Screen>
      <DetailHeader title="Terms & Conditions" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Text weight="regular" style={styles.infoBannerText}>
            Please read these terms and conditions carefully before using
            OHealth+. Your use of our service constitutes your agreement to
            these terms.
          </Text>
        </View>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <View key={section.number} style={styles.section}>
            <Text weight="semibold" style={styles.sectionTitle}>
              {section.number} {section.title}
            </Text>
            <Text weight="regular" style={styles.sectionBody}>
              {section.body}
            </Text>
          </View>
        ))}

        <View style={{ height: 32 }} />
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
    padding: 16,
  },
  infoBannerText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.primary,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.2,
    color: Colors.black300,
  },
});
