import { ImageSourcePropType } from "react-native";

export interface OnboardingSlide {
    id: string;
    image: ImageSourcePropType;
    header: string;
    description: string | DescriptionObj[];
}

export interface DescriptionObj {
    icon: ImageSourcePropType,
    description: string
}
