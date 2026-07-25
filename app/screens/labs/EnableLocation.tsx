import { BackButton } from "@/components/BackButton";
import Button from "@/components/Button";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import {
  ManualAddressFormValues,
  manualAddressSchema,
} from "@/features/labs/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const initialValues: ManualAddressFormValues = { address: "" };

export default function EnableLocation() {
  const router = useAppRouter();
  const { next } = useLocalSearchParams<{ next?: string }>();

  const goToLabs = () =>
    next === "laboratory" ? router.toLaboratory() : router.toChooseLab();

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BackButton style={{ marginBottom: 0, alignSelf: "flex-start" }} />
          <Text weight="bold" style={styles.title}>
            Find Your Labs
          </Text>

          <View style={styles.autoDetectCard}>
            <View style={styles.autoDetectRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="location" size={20} color={Colors.primary} />
              </View>
              <View style={styles.autoDetectTextWrap}>
                <Text weight="semibold" style={styles.autoDetectTitle}>
                  Enable Location Access
                </Text>
                <Text weight="medium" style={styles.autoDetectDescription}>
                  Allow OHealth to find laboratories near you.
                </Text>
              </View>
            </View>
            <Button onPress={goToLabs}>
              Auto-detect My Location
            </Button>
          </View>

          <Text weight="medium" style={styles.orText}>
            OR
          </Text>

          <Formik
            initialValues={initialValues}
            validate={toFormikValidate(manualAddressSchema)}
            onSubmit={goToLabs}
          >
            {({ handleSubmit }) => (
              <View style={styles.manualCard}>
                <FormInputField
                  name="address"
                  placeholder="Enter delivery address manually"
                />
                <Button onPress={() => handleSubmit()} type="secondary">
                  Search
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingTop: 24,
    gap: 18,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black100,
  },
  autoDetectCard: {
    backgroundColor: Colors.homeneutral,
    borderRadius: 10,
    padding: 20,
    gap: 14,
  },
  autoDetectRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(21,93,252,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  autoDetectTextWrap: {
    flex: 1,
    gap: 3,
  },
  autoDetectTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black100,
  },
  autoDetectDescription: {
    fontSize: 12,
    lineHeight: 19.5,
    color: Colors.lightGray2,
  },
  orText: {
    fontSize: 14,
    lineHeight: 19.5,
    color: Colors.lightGray2,
    textAlign: "center",
  },
  manualCard: {
    backgroundColor: Colors.homeneutral,
    borderRadius: 10,
    padding: 20,
    gap: 19,
  },
});
