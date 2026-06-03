import { InputField } from "@/components/InputField";
import { FormFieldWrapper } from "@/components/forms/FormFieldWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useField } from "formik";
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

type FormInputFieldProps = Omit<
  TextInputProps,
  "value" | "onChangeText" | "onBlur"
> & {
  /** Formik field name — must match a key in the form's initialValues */
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  icon?: "email" | "password" | "name";
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /** Optional override — Formik's handler is always called first */
  onChangeText?: (text: string) => void;
  /** Optional override — Formik's touched handler is always called first */
  onBlur?: TextInputProps["onBlur"];
};

export function FormInputField({
  name,
  label,
  required,
  helperText,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  fieldStyle,
  labelStyle,
  onChangeText,
  onBlur,
  ...props
}: FormInputFieldProps) {
  const [field, meta, helpers] = useField<string>(name);

  const visibleError = meta.touched ? meta.error : undefined;

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={visibleError}
      touched={meta.touched}
      helperText={helperText}
      style={fieldStyle}
      labelStyle={labelStyle}
    >
      <InputField
        {...props}
        icon={icon}
        value={field.value ?? ""}
        onChangeText={(text) => {
          helpers.setValue(text);
          onChangeText?.(text);
        }}
        onBlur={(event) => {
          helpers.setTouched(true);
          onBlur?.(event);
        }}
        rightIcon={rightIcon}
        onRightIconPress={onRightIconPress}
        containerStyle={containerStyle}
        error={!!visibleError}
      />
    </FormFieldWrapper>
  );
}
