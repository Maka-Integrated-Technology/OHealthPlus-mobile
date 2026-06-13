import { FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import type { ApiProfessional } from "../types";
import AvailableProfessionalCard from "./AvailableProfessionalCard";

interface Props {
  professionals: ApiProfessional[];
}

export default function AvailableProfessionalCardList({ professionals }: Props) {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<
    string | null
  >(null);

  return (
    <FlatList
      data={professionals}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <AvailableProfessionalCard
          professional={item}
          isSelected={selectedProfessionalId === item.id}
          onSelect={() => setSelectedProfessionalId(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: "10%",
  },
});
