import { Select, SelectOption } from "@/components/Select";
import { FormFieldWrapper } from "@/components/forms/FormFieldWrapper";
import { useField } from "formik";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type FormSelectFieldProps<T extends string = string> = {
  /** Formik field name — must match a key in the form's initialValues */
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  disabled?: boolean;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /** Optional override — Formik's handler is always called first */
  onChange?: (value: T) => void;
};

export function FormSelectField<T extends string = string>({
  name,
  label,
  required,
  helperText,
  placeholder,
  options,
  disabled,
  fieldStyle,
  labelStyle,
  onChange,
}: FormSelectFieldProps<T>) {
  const [field, meta, helpers] = useField<T>(name);

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
      <Select<T>
        value={field.value ?? null}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        error={!!visibleError}
        onChange={(value) => {
          helpers.setValue(value);
          helpers.setTouched(true);
          onChange?.(value);
        }}
      />
    </FormFieldWrapper>
  );
}
