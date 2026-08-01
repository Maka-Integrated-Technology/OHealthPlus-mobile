import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useSpecialities } from "@/features/appointments/hooks/useAppointments";
import type { ApiSpeciality } from "@/features/appointments/types";
import {
  ActivityIndicator,
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { appointmentAssets } from "../assets";
import { BookAppointmentCard, Personnel } from "./BookAppointmentcard";

/** Map backend speciality names to local fallback images. */
const SPECIALITY_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  "General Doctor": appointmentAssets.images.doctor,
  Nurse: appointmentAssets.images.nurse,
  Nutritionist: appointmentAssets.images.nutritionist,
  Counselor: appointmentAssets.images.counsellor,
  Counsellor: appointmentAssets.images.counsellor,
};

function getSpecialityImage(name: string): ImageSourcePropType {
  return SPECIALITY_IMAGE_MAP[name] ?? appointmentAssets.images.doctor;
}

/**
 * Desired display order (per Figma). Names are matched case-insensitively,
 * and both US ("Counselor") and UK ("Counsellor") spellings are accepted.
 * Unknown specialties keep their backend order and appear after these.
 */
const SPECIALITY_ORDER = [
  "General Doctor",
  "Nurse",
  "Nutritionist",
  "Counselor",
  "Counsellor",
];

function specialityOrderIndex(name: string): number {
  const idx = SPECIALITY_ORDER.findIndex(
    (n) => n.toLowerCase() === name.trim().toLowerCase()
  );
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

export default function BookAppointmentCardList() {
  const router = useAppRouter();
  const { data: specialities, isLoading, isError, refetch } = useSpecialities();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text weight="regular" style={styles.errorText}>
          Failed to load specialities.
        </Text>
        <Text
          weight="medium"
          style={styles.retryText}
          onPress={() => refetch()}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  if (!specialities || specialities.length === 0) {
    return (
      <View style={styles.center}>
        <Text weight="regular" style={styles.errorText}>
          No specialities available.
        </Text>
      </View>
    );
  }

  const personnels: Personnel[] = specialities
    .filter((s) => s.is_active)
    .slice()
    .sort(
      (a, b) =>
        specialityOrderIndex(a.name) - specialityOrderIndex(b.name) ||
        a.name.localeCompare(b.name)
    )
    .map((s) => ({
      image: getSpecialityImage(s.name),
      text: s.name,
      onPress: () =>
        router.toAvailabeleProfessionals({
          specialityId: s.id,
          specialityName: s.name,
        }),
    }));

  return (
    <FlatList
      data={personnels}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.text}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <BookAppointmentCard personnel={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
    paddingBottom: "10%",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 12,
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
