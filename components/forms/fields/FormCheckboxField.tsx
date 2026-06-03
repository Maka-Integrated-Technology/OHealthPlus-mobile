import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { authAssets } from "@/features/auth/assets";
import { useField } from "formik";
import { Image, Pressable, StyleSheet, View } from "react-native";

type FormCheckboxFieldProps = {
  /** Formik field name — must match a key in the form's initialValues */
  name: string;
  children: React.ReactNode;
};

export function FormCheckboxField({ name, children }: FormCheckboxFieldProps) {
  const [field, meta, helpers] = useField<boolean>(name);

  const handleToggle = () => {
    helpers.setValue(!field.value);
    helpers.setTouched(true);
  };

  const showError = meta.touched && !!meta.error;

  return (
    <View>
      <View style={styles.row}>
        <Pressable style={styles.checkbox} onPress={handleToggle}>
          {field.value ? (
            <Image
              source={authAssets.icons.check}
              style={{ width: 12, height: 12 }}
              resizeMode="contain"
            />
          ) : null}
        </Pressable>
        <View style={styles.labelWrapper}>{children}</View>
      </View>
      {showError ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5.3,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  labelWrapper: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: Colors.red500,
    marginTop: 6,
  },
});
