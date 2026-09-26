import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import {
  LabParameterTable,
  ShareMethod,
  ShareResultSheet,
} from "@/features/medical/components";
import { useLabResult } from "@/features/medical/hooks/useMedical";
import { formatLongDate } from "@/features/medical/utils/formatters";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const SHARE_LABELS: Record<ShareMethod, string> = {
  copy: "Link copied",
  whatsapp: "Shared via WhatsApp",
  email: "Shared via Email",
  message: "Shared via Message",
};

export default function LabResultDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data, isLoading } = useLabResult(id ?? "");
  const [shareOpen, setShareOpen] = useState(false);

  const handleShare = (method: ShareMethod) => {
    setShareOpen(false);
    // Simulated — a real implementation would build a share link / payload.
    Alert.alert("Share Lab Result", SHARE_LABELS[method]);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton />
        <Text weight="semibold" style={styles.headerTitle}>
          {data?.name ?? "Lab Result"}
        </Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => setShareOpen(true)}
          disabled={!data}
          hitSlop={8}
        >
          <Ionicons name="share-social-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : !data ? (
        <View style={styles.loader}>
          <Text weight="regular" style={styles.emptyText}>
            This lab result is unavailable.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
              <Text weight="medium" style={styles.successText}>
                Download Successful
              </Text>
            </View>

            {/* Lab header */}
            <View style={styles.labHeader}>
              <View style={styles.labIcon}>
                <Ionicons name="business-outline" size={18} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text weight="semibold" style={styles.labName}>
                  {data.lab_name}
                </Text>
                <Text weight="regular" style={styles.labMeta}>
                  {data.reference_no} · Generated {formatLongDate(data.generated_at)}
                </Text>
              </View>
            </View>

            {/* Patient information */}
            <View style={styles.section}>
              <Text weight="medium" style={styles.sectionTitle}>
                PATIENT INFORMATION
              </Text>
              <InfoRow label="PATIENT NAME" value={data.patient_name} />
              <InfoRow label="PATIENT ID" value={data.patient_id} />
              <InfoRow
                label="ORDERING PHYSICIAN"
                value={data.ordering_physician}
              />
            </View>

            {/* Parameters */}
            <View style={styles.section}>
              <LabParameterTable parameters={data.parameters} />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button onPress={() => Alert.alert("View Full Report", "Coming soon")}>
              View Full Report
            </Button>
          </View>
        </>
      )}

      <ShareResultSheet
        visible={shareOpen}
        onClose={() => setShareOpen(false)}
        onShare={handleShare}
      />
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text weight="regular" style={styles.infoLabel}>
        {label}
      </Text>
      <Text weight="medium" style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.beige,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: Colors.neutral,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  successText: {
    fontSize: 14,
    color: "#15803D",
  },
  labHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.lightBlue2,
    alignItems: "center",
    justifyContent: "center",
  },
  labName: {
    fontSize: 15,
    letterSpacing: -0.3,
    color: Colors.black300,
  },
  labMeta: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.neutral,
    marginTop: 2,
  },
  section: {
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 0.4,
    color: Colors.neutral600,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.neutral,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.black300,
  },
  footer: {
    paddingVertical: 16,
  },
});
