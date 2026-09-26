import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface SelectOption<T extends string = string> {
  label: string;
  value: T;
}

interface SelectProps<T extends string = string> {
  value: T | null;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Inline-expanding select. Pressing the field reveals the option list directly
 * beneath it (matching the OHealth medical-records designs), with a check on the
 * selected option. Styled to align with {@link InputField}.
 */
export function Select<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = "Select",
  error,
  disabled,
  containerStyle,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  const toggle = () => {
    if (disabled) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => !prev);
  };

  const handleSelect = (option: SelectOption<T>) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange(option.value);
    setOpen(false);
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggle}
        disabled={disabled}
        style={[
          styles.field,
          error && styles.fieldError,
          open && styles.fieldOpen,
        ]}
      >
        <Text
          weight="regular"
          style={[styles.valueText, !selected && styles.placeholderText]}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.neutral}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.options}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.7}
                onPress={() => handleSelect(option)}
                style={styles.optionRow}
              >
                <Text
                  weight={isSelected ? "medium" : "regular"}
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.neutral50,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 0.5,
    borderColor: Colors.neutral200,
  },
  fieldOpen: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  fieldError: {
    borderColor: Colors.red500,
  },
  valueText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.4,
    color: "black",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  options: {
    marginTop: 6,
    backgroundColor: Colors.neutral50,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: Colors.neutral200,
    overflow: "hidden",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral200,
  },
  optionText: {
    fontSize: 15,
    letterSpacing: -0.3,
    color: Colors.neutral,
  },
  optionTextSelected: {
    color: Colors.black300,
  },
});
