import DetailHeader from "@/components/DetailHeader";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import {
  DownloadProgressModal,
  EmptyState,
  LabResultCard,
} from "@/features/medical/components";
import { useLabResults } from "@/features/medical/hooks/useMedical";
import { groupByMonth } from "@/features/medical/utils/formatters";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function LabResultsScreen() {
  const router = useAppRouter();
  const { data: results = [], isLoading } = useLabResults();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const groups = useMemo(
    () => groupByMonth(results, (r) => r.result_date),
    [results],
  );

  const handleComplete = useCallback(() => {
    const id = downloadingId;
    setDownloadingId(null);
    if (id) router.toLabResultDetail({ id });
  }, [downloadingId, router]);

  return (
    <Screen>
      <DetailHeader title="Lab Results" />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          icon="document-text-outline"
          title="No lab result"
          subtitle="You don't have any lab results available."
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {groups.map((group) => (
            <View key={group.label} style={styles.group}>
              <Text weight="medium" style={styles.groupLabel}>
                {group.label}
              </Text>
              <View style={styles.list}>
                {group.items.map((result) => (
                  <LabResultCard
                    key={result.id}
                    result={result}
                    onDownload={() => setDownloadingId(result.id)}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <DownloadProgressModal
        visible={downloadingId !== null}
        onCancel={() => setDownloadingId(null)}
        onComplete={handleComplete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingTop: 24,
    paddingBottom: 40,
    gap: 20,
  },
  group: {
    gap: 12,
  },
  groupLabel: {
    fontSize: 13,
    letterSpacing: -0.2,
    color: Colors.neutral,
  },
  list: {
    gap: 12,
  },
});
