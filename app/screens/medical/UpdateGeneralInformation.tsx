import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField, FormSelectField } from "@/components/forms";
import Screen from "@/components/Screen";
import { useAppRouter } from "@/config/route";
import {
  useGeneralInfo,
  useUpdateGeneralInfo,
} from "@/features/medical/hooks/useMedical";
import {
  BLOOD_GROUPS,
  BloodGroup,
  GENOTYPES,
  Genotype,
} from "@/features/medical/types";
import {
  GeneralInfoFormValues,
  generalInfoSchema,
} from "@/features/medical/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const bloodGroupOptions = BLOOD_GROUPS.map((g) => ({ label: g, value: g }));
const genotypeOptions = GENOTYPES.map((g) => ({ label: g, value: g }));

export default function UpdateGeneralInformationScreen() {
  const router = useAppRouter();
  const { data } = useGeneralInfo();
  const { mutateAsync: update } = useUpdateGeneralInfo();

  const initialValues: GeneralInfoFormValues = {
    height: data?.height_cm ? String(data.height_cm) : "",
    weight: data?.weight_kg ? String(data.weight_kg) : "",
    bloodGroup: data?.blood_group ?? ("" as GeneralInfoFormValues["bloodGroup"]),
    genotype: data?.genotype ?? ("" as GeneralInfoFormValues["genotype"]),
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Update General Information" />

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validate={toFormikValidate(generalInfoSchema)}
          onSubmit={async (values) => {
            try {
              await update({
                height_cm: Number(values.height),
                weight_kg: Number(values.weight),
                blood_group: values.bloodGroup as BloodGroup,
                genotype: values.genotype as Genotype,
              });
              router.back();
            } catch {
              Alert.alert(
                "Couldn't save",
                "We couldn't update your information. Please try again.",
              );
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <>
              <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <FormInputField
                  name="height"
                  label="Height"
                  placeholder="Height (cm)"
                  keyboardType="numeric"
                />
                <FormInputField
                  name="weight"
                  label="Weight"
                  placeholder="Weight (kg)"
                  keyboardType="numeric"
                />
                <FormSelectField
                  name="bloodGroup"
                  label="Blood Group"
                  placeholder="Select blood group"
                  options={bloodGroupOptions}
                />
                <FormSelectField
                  name="genotype"
                  label="Genotype"
                  placeholder="Select genotype"
                  options={genotypeOptions}
                />
              </ScrollView>

              <View style={styles.footer}>
                <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                  {isSubmitting ? "Updating…" : "Update Information"}
                </Button>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 24,
    gap: 16,
  },
  footer: {
    paddingVertical: 16,
  },
});
