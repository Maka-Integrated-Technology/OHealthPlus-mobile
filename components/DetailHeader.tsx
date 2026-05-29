import Colors from "@/constants/Colors";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { BackButton } from "./BackButton";
import { Text } from "./Text";

interface Props {
  title: string;
  style?: {
    header?: StyleProp<ViewStyle>;
    headerTitle?: StyleProp<TextStyle>;
  };
}

export default function DetailHeader({ title, style }: Props) {
  return (
    <View style={[styles.header, style?.header]}>
      <BackButton />
      <Text weight="semibold" style={[styles.headerTitle, style?.headerTitle]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.homeneutral,
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 19.8,
    letterSpacing: -0.8,
    color: Colors.black100,
  },
});
