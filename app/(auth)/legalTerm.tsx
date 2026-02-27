import { BackButton } from "@/components/BackButton";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import LegalTermsList from "@/features/auth/components/legalTermsList";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Legalterms() {

    const passedData = useLocalSearchParams();
    const param = passedData.param as unknown as "terms" | 'privacy';

    console.log(param)

    const terms = [
        {
            title: "Acceptance of Terms",
            description: "By accessing and using Health Bridge, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.",
        },
        {
            title: "Use of Services",
            description: "Health Bridge provides a platform to connect patients with healthcare professionals. You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.",
        },
        {
            title: "Medical Disclaimer",
            description: "Health Bridge is not a healthcare provider. The platform facilitates connections between patients and licensed healthcare professionals. Any medical advice, diagnosis, or treatment you receive is provided by independent healthcare professionals, not by Health Bridge.",
        },
        {
            title: "Privacy and Data Protection",
            description: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal and health information. We comply with all applicable healthcare privacy regulations including HIPAA.",
        },
        {
            title: "Appointment Booking and Cancellations",
            description: "You may book, reschedule, or cancel appointments through the platform. Cancellation policies may vary by healthcare provider. Late cancellations or no-shows may result in charges as determined by the individual healthcare provider.",
        },
        {
            title: "Payment Terms",
            description: "You agree to pay all fees associated with your use of Health Bridge services. Payment is due at the time of service unless otherwise arranged. We accept various payment methods as displayed in the app.",
        },
        {
            title: "Limitation of Liability",
            description: "Health Bridge shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, or for the cost of procurement of substitute services.",
        },
        {
            title: "Changes to Terms",
            description: "We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the \"Last Updated\" date. Your continued use of the service constitutes acceptance of the modified terms.",
        },
    ];

    const privacy = [
        {
            title: "Information We Collect",
            description: "We collect information you provide directly to us, including your name, email address, phone number, date of birth, medical history, and health-related information. We also collect information automatically, such as device information, usage data, and location information when you use our services.",
        },
        {
            title: "How We Use Your Information",
            description: "We use the information we collect to provide, maintain, and improve our services; to process your appointments and payments; to communicate with you; to monitor and analyze trends and usage; and to protect the security and integrity of our services.",
        },
        {
            title: "Information Sharing and Disclosure",
            description: "We share your information with healthcare professionals you choose to consult, with service providers who assist us in operating our platform, and when required by law. We do not sell your personal information to third parties.",
        },
        {
            title: "Data Security",
            description: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use encryption, secure servers, and regular security assessments to safeguard your data.",
        },
        {
            title: "HIPAA Compliance",
            description: "Health Bridge is committed to complying with the Health Insurance Portability and Accountability Act (HIPAA). Your protected health information is handled in accordance with HIPAA privacy and security rules.",
        },
        {
            title: "Your Rights and Choices",
            description: "You have the right to access, update, or delete your personal information. You can also control communication preferences and opt-out of certain data collection. Contact us to exercise these rights.",
        },
        {
            title: "Data Retention",
            description: "We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Medical records are retained in accordance with applicable healthcare regulations.",
        },
        {
            title: "Children's Privacy",
            description: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
        },
        {
            title: "Changes to Privacy Policy",
            description: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date.",
        },
    ];

    const PageData = {
        Header: {
            "terms": "Terms & Conditions",
            "privacy": "Privacy Plicy",

        },
        Description: {
            'terms': "Please read these terms and conditions carefully before using HealthBridge. Your use of our service constitutes your agreement to these terms.",
            "privacy": "Please read these privacy practices carefully before using HealthBridge. Your use of our service constitutes your agreement to these policies."
        },

        content: {
            terms, privacy
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, }}>
                <BackButton />
                <Text style={styles.header} weight="bold">{PageData.Header[param]}</Text>
            </View>

            <Text style={styles.description}>
                {PageData.Description[param]}
            </Text>

            <LegalTermsList list={PageData.content[param]} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    description: {
        backgroundColor: Colors.transparentPrimary,
        borderRadius: 12,
        padding: 12,
        marginVertical: 12,
    },
    header: {
        fontSize: 20,

    }
})
