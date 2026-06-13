import { BackButton } from "@/components/BackButton";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import AnimatedBalls from "@/features/appointments/components/AnimatedBalls";
import AvailableProfessionalCardList from "@/features/appointments/components/AvailableProfessionalCardList";
import AvailableProfessionalsSkeleton from "@/features/appointments/components/AvailableProfessionalsSkeleton";
import { useProfessionalsBySpeciality } from "@/features/appointments/hooks/useAppointments";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function AvailableProfessionals() {
  const { specialityId, specialityName } = useLocalSearchParams<{
    specialityId?: string;
    specialityName?: string;
  }>();

  const {
    data: professionals,
    isLoading,
    isError,
    refetch,
  } = useProfessionalsBySpeciality(specialityId ?? "");

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: 0 }} />
        <Text weight="semibold" style={styles.headerTitleText}>
          {specialityName ? `${specialityName} Professionals` : "Available Professionals"}
        </Text>
      </View>

      {!isError && (
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text weight="regular" style={styles.availableText}>
            {isLoading
              ? "Looking for professionals available near you"
              : `${professionals?.length ?? 0} professional${
                  (professionals?.length ?? 0) === 1 ? "" : "s"
                } available`}
          </Text>
          {isLoading && (
            <View style={styles.loadingContainer}>
              {[1, 2, 3].map((item, index) => (
                <AnimatedBalls key={item} delay={index * 150} />
              ))}
            </View>
          )}
        </View>
      )}

      {isLoading && (
        <View>
          {[5, 4, 3, 2, 1].map((item, index) => (
            <AvailableProfessionalsSkeleton
              key={item}
              opacity={Math.pow(1 - index / 5, 3)}
            />
          ))}
        </View>
      )}

      {isError && !isLoading && (
        <View style={styles.errorContainer}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load professionals.
          </Text>
          <Text
            weight="medium"
            style={styles.retryText}
            onPress={() => refetch()}
          >
            Tap to retry
          </Text>
        </View>
      )}

      {!isLoading && !isError && professionals && professionals.length === 0 && (
        <View style={styles.errorContainer}>
          <Text weight="regular" style={styles.errorText}>
            No professionals available for this speciality.
          </Text>
        </View>
      )}

      {!isLoading && !isError && professionals && professionals.length > 0 && (
        <AvailableProfessionalCardList professionals={professionals} />
      )}
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
  headerTitleText: {
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
    flex: 1,
  },
  availableText: {
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: -0.2,
    color: Colors.black200,
    marginBottom: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 14,
    color: Colors.neutral,
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: Colors.primary,
  },
});
