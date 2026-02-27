import { PressableProps, Pressable as RNPressable, StyleProp, ViewStyle } from "react-native"

interface Props extends Omit<PressableProps, "style"> {
    style?: StyleProp<ViewStyle>
}

export default function Pressable({ children, style, ...props }: Props) {
    return (
        <RNPressable
            style={({ pressed }) => [
                pressed && { transform: [{ scale: 0.87 }], opacity: 0.6 },
                style,
            ]}
            {...props}
        >

            {children}
        </RNPressable>
    )
}
