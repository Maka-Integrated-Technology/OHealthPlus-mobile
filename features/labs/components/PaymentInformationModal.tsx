import Button from "@/components/Button";
import { FormInputField } from "@/components/forms";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import {
  CardPaymentFormValues,
  cardPaymentSchema,
} from "@/features/labs/validationSchema";
import { toFormikValidate } from "@/utils/formikZod";
import { Formik } from "formik";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface PaymentInformationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const initialValues: CardPaymentFormValues = {
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

export default function PaymentInformationModal({
  visible,
  onClose,
  onSubmit,
}: PaymentInformationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <Text weight="semibold" style={styles.title}>
            Payment Information
          </Text>

          <Formik
            initialValues={initialValues}
            validate={toFormikValidate(cardPaymentSchema)}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <View style={styles.form}>
                <FormInputField
                  name="cardholderName"
                  label="Cardholder Name"
                  placeholder="Alice Bob"
                />
                <FormInputField
                  name="cardNumber"
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  keyboardType="number-pad"
                />
                <View style={styles.row}>
                  <View style={styles.rowField}>
                    <FormInputField
                      name="expiryDate"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={styles.rowField}>
                    <FormInputField
                      name="cvv"
                      label="CVV"
                      placeholder="123"
                      keyboardType="number-pad"
                      secureTextEntry
                    />
                  </View>
                </View>

                <Button onPress={() => handleSubmit()} style={styles.submitButton}>
                  Proceed to payment
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(51,51,51,0.35)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 32,
    gap: 20,
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.8,
    color: Colors.black100,
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowField: {
    flex: 1,
  },
  submitButton: {
    marginTop: 4,
  },
});
