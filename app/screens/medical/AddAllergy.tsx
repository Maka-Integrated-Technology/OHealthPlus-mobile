import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField, FormSelectField } from "@/components/forms";
import Screen from "@/components/Screen";
import { useAppRouter } from "@/config/route";
import { useAddAllergy } from "@/features/medical/hooks/useMedical";
import {
  AllergyFormValues,
  allergySchema,
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

const typeOptions = [
  { label: "Food Allergy", value: "food" as const },
  { label: "Drug Allergy", value: "drug" as const },
];

const severityOptions = [
  { label: "Mild", value: "mild" as const },
  { label: "Life Threatening", value: "life_threatening" as const },
];

const initialValues: AllergyFormValues = {
  type: "food",
  name: "",
  severity: "mild",
};

export default function AddAllergyScreen() {
  const router = useAppRouter();
  const { mutateAsync: addAllergy } = useAddAllergy();

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Add Allergies" />

        <Formik
          initialValues={initialValues}
          validate={toFormikValidate(allergySchema)}
          onSubmit={async (values) => {
            try {
              await addAllergy({
                name: values.name.trim(),
                type: values.type,
                severity: values.severity,
              });
              router.back();
            } catch {
              Alert.alert(
                "Couldn't add allergy",
                "Please try again in a moment.",
              );
            }
          }}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <>
              <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <FormSelectField
                  name="type"
                  label="Allergy Type"
                  placeholder="Select allergy type"
                  options={typeOptions}
                />
                <FormInputField
                  name="name"
                  label={values.type === "drug" ? "Add Drug" : "Add Food"}
                  placeholder={
                    values.type === "drug"
                      ? "e.g. Diclofenac"
                      : "e.g. Beans"
                  }
                />
                <FormSelectField
                  name="severity"
                  label="Select Allergy Severity"
                  placeholder="Select severity"
                  options={severityOptions}
                />
              </ScrollView>

              <View style={styles.footer}>
                <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                  {isSubmitting ? "Adding…" : "Add Allergy"}
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
