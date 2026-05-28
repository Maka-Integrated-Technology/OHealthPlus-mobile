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
    title: "Information We Collect",
    body: "We collect information you provide directly to us, including your name, email address, phone number, date of birth, medical history, and health-related information. We also collect information automatically, such as device information, usage data, and location information when you use our services.",
  },
  {
    number: "2.",
    title: "How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services; to process your appointments and payments; to communicate with you; to monitor and analyze trends and usage; and to protect the security and integrity of our services.",
  },
  {
    number: "3.",
    title: "Information Sharing and Disclosure",
    body: "We share your information with healthcare professionals you choose to consult, with service providers who assist us in operating our platform, and when required by law. We do not sell your personal information to third parties.",
  },
  {
    number: "4.",
    title: "Data Security",
    body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use encryption, secure servers, and regular security assessments to safeguard your data.",
  },
  {
    number: "5.",
    title: "HIPAA Compliance",
    body: "OHealth+ is committed to complying with the Health Insurance Portability and Accountability Act (HIPAA). Your protected health information is handled in accordance with HIPAA privacy and security rules.",
  },
  {
    number: "6.",
    title: "Your Rights and Choices",
    body: "You have the right to access, update, or delete your personal information. You can also control communication preferences and opt-out of certain data collection. Contact us to exercise these rights.",
  },
  {
    number: "7.",
    title: "Data Retention",
    body: "We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Medical records are retained in accordance with applicable healthcare regulations.",
  },
  {
    number: "8.",
    title: "Children's Privacy",
    body: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
  },
  {
    number: "9.",
    title: "Changes to Privacy Policy",
    body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <Screen>
      <DetailHeader title="Privacy Policy" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Text weight="regular" style={styles.infoBannerText}>
            Please read these privacy practices carefully before using OHealth+.
            Your use of our service constitutes your agreement to these
            policies.
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
