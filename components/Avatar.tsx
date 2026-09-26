import Colors from "@/constants/Colors";
import { Text } from "@/components/Text";
import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

// ── Variant maps ──────────────────────────────────────────────────────────────

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type AvatarRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
  "3xl": 72,
  "4xl": 80,
};

const TEXT_SIZE_MAP: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
};

function getRadius(rounded: AvatarRounded, size: number): number {
  switch (rounded) {
    case "none":
      return 0;
    case "sm":
      return 6;
    case "md":
      return 8;
    case "lg":
      return 12;
    case "xl":
      return 16;
    case "2xl":
      return 20;
    case "full":
      return size / 2;
  }
}

// ── AvatarFallback ────────────────────────────────────────────────────────────

interface AvatarFallbackProps {
  children: React.ReactNode;
  size?: AvatarSize;
  rounded?: AvatarRounded;
  style?: StyleProp<ViewStyle>;
}

export function AvatarFallback({
  children,
  size = "md",
  rounded = "full",
  style,
}: AvatarFallbackProps) {
  const dimension = SIZE_MAP[size];
  const radius = getRadius(rounded, dimension);

  return (
    <View
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: radius,
          backgroundColor: Colors.primary,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        weight="semibold"
        style={{
          fontSize: TEXT_SIZE_MAP[size],
          color: Colors.white,
          lineHeight: TEXT_SIZE_MAP[size] * 1.2,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

interface AvatarProps {
  imageUrl?: string | null;
  size?: AvatarSize;
  rounded?: AvatarRounded;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
}

export function Avatar({
  imageUrl,
  size = "md",
  rounded = "full",
  children,
  style,
  imageStyle,
  accessibilityLabel,
}: AvatarProps) {
  const dimension = SIZE_MAP[size];
  const radius = getRadius(rounded, dimension);
  const [hasError, setHasError] = useState(false);
  const showImage = imageUrl && !hasError;

  return (
    <View
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: radius,
          overflow: "hidden",
        },
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    >
      {showImage ? (
        <Image
          source={{ uri: imageUrl }}
          style={[{ width: "100%", height: "100%" }, imageStyle]}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      ) : (
        children
      )}
    </View>
  );
}

export default Avatar;
