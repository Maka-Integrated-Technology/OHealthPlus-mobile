import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { useAddHealthConditions } from "@/features/medical/hooks/useMedical";
import {
  OtherConditionFormValues,
  otherConditionSchema,
} from "@/features/medical/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const SUGGESTIONS = [
  "Psoriasis",
  "Fibromyalgia",
  "PCOS",
  "Anemia",
  "GERD",
  "Thyroid disorder",
];

const initialValues: OtherConditionFormValues = { name: "" };

export default function AddOtherConditionScreen() {
  const router = useAppRouter();
  const { mutateAsync: addConditions } = useAddHealthConditions();

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Add Other Conditions" />

        <Formik
          initialValues={initialValues}
          validate={toFormikValidate(otherConditionSchema)}
          onSubmit={async (values) => {
            try {
              await addConditions({ names: [values.name.trim()] });
              // Pop back to the Health Conditions list (past the picker screen).
              router.back();
              router.back();
            } catch {
              Alert.alert("Couldn't save", "Please try again in a moment.");
            }
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue, setFieldTouched }) => (
            <>
              <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Info card */}
                <View style={styles.infoCard}>
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      color={Colors.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text weight="semibold" style={styles.infoTitle}>
                      Can't find your condition?
                    </Text>
                    <Text weight="regular" style={styles.infoText}>
                      Enter your health condition that is not listed. This helps
                      us personalise your care and recommendations.
                    </Text>
                  </View>
                </View>

                <FormInputField
                  name="name"
                  label="Health Condition"
                  placeholder="e.g. Endometriosis"
                />

                {/* Suggestions */}
                <View style={styles.suggestionsBlock}>
                  <Text weight="medium" style={styles.suggestionsLabel}>
                    Suggestions
                  </Text>
                  <View style={styles.chips}>
                    {SUGGESTIONS.map((suggestion) => (
                      <TouchableOpacity
                        key={suggestion}
                        style={styles.chip}
                        activeOpacity={0.7}
                        onPress={() => {
                          setFieldValue("name", suggestion);
                          setFieldTouched("name", true, false);
                        }}
                      >
                        <Text weight="regular" style={styles.chipText}>
                          {suggestion}
                        </Text>
                        <Ionicons name="add" size={14} color={Colors.primary} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                  {isSubmitting ? "Saving…" : "Save Condition"}
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
    gap: 20,
  },
  infoCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.lightBlue2,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 16,
    padding: 14,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 14,
    letterSpacing: -0.3,
    color: Colors.black300,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.neutral,
  },
  suggestionsBlock: {
    gap: 10,
  },
  suggestionsLabel: {
    fontSize: 13,
    letterSpacing: -0.2,
    color: Colors.black100,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.lightBeige,
    borderWidth: 1,
    borderColor: Colors.homeneutral,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    color: Colors.black300,
  },
  footer: {
    paddingVertical: 16,
  },
});
