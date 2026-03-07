import { Text as RNText, TextProps } from "react-native";

interface Props extends TextProps {
    weight?: "semibold" | "bold" | "regular" | "medium";
    color?: string;
}

const fontFamilies = {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
} as const;

export const Text = ({ children, style, weight = "regular", ...props }: Props) => {
    return (
        <RNText style={[style, { fontFamily: fontFamilies[weight] }]} {...props}>
            {children}
        </RNText>
    );
};

