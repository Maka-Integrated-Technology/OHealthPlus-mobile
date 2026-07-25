import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import BookingSummaryCard from "@/features/labs/components/BookingSummaryCard";
import PaymentInformationModal from "@/features/labs/components/PaymentInformationModal";
import PaymentMethodRow from "@/features/labs/components/PaymentMethodRow";
import { extractedTestsData } from "@/features/labs/constants/extractedTests";
import { labsData } from "@/features/labs/constants/labs";
import { paymentMethodOptions } from "@/features/labs/constants/paymentMethods";
import type { PaymentMethodId } from "@/features/labs/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const SERVICE_FEE = 1000;

export default function ReviewBooking() {
  const router = useAppRouter();
  const { labId, date, time } = useLocalSearchParams<{
    labId?: string;
    date?: string;
    time?: string;
  }>();
  const lab = labsData.find((l) => l.id === labId) ?? labsData[0];

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(
    null
  );
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const handleSelectMethod = (id: PaymentMethodId) => {
    setSelectedMethod(id);
    if (id === "card") {
      setPaymentModalVisible(true);
    }
  };

  const handlePaymentSubmit = () => {
    setPaymentModalVisible(false);
    router.toLabBookingConfirmed({ labId: lab.id });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="bold" style={styles.headerTitle}>
          Review Booking
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text weight="semibold" style={styles.sectionTitle}>
            Booking Details
          </Text>
          {(date || time) && (
            <Text weight="regular" style={styles.dateTimeText}>
              {date}
              {time ? ` · ${time}` : ""}
            </Text>
          )}
          <BookingSummaryCard tests={extractedTestsData} serviceFee={SERVICE_FEE} />
        </View>

        <View style={styles.section}>
          <Text weight="semibold" style={styles.sectionTitle}>
            Select payment method
          </Text>
          <View style={styles.paymentList}>
            {paymentMethodOptions.map((method) => (
              <PaymentMethodRow
                key={method.id}
                method={method}
                isSelected={selectedMethod === method.id}
                onPress={() => handleSelectMethod(method.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <PaymentInformationModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onSubmit={handlePaymentSubmit}
      />
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
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  content: {
    gap: 39,
    paddingBottom: 24,
  },
  section: {
    gap: 13,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.black100,
  },
  dateTimeText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral,
  },
  paymentList: {
    gap: 20,
  },
});
