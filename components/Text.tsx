import type { StyleProp, TextStyle } from "react-native";
import { Text as RNText, StyleSheet } from "react-native";

interface TextProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;

    weight?: "semibold" | "bold" | "regular";
    color?: string;
}
const fontFamilies = {
    regular: 'OpenSans-Regular',
    semibold: 'OpenSans-SemiBold',
    bold: 'OpenSans-Bold',
};

export const Text = ({ children, style, weight = "regular" }: TextProps) => {
    return (
        <RNText style={[style, { fontFamily: fontFamilies[weight] }]}>
            {children}
        </RNText>
    );
};


