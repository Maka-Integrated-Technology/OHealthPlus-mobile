import { ImageSourcePropType } from "react-native";
import { authAssets } from "../assets";


interface OnboardingSlide {
    id: string;
    image: ImageSourcePropType;
    header: string;
    description: string | DescriptionObj[];
}

interface DescriptionObj {
    icon: ImageSourcePropType,
    description: string
}

export const onboardingData: OnboardingSlide[] = [
    {
        id: "1",
        image: authAssets.onboarding.slide1,
        header: "Healthcare, Made Simple ",
        description: "Connect with verified healthcare professionals and get the care you need, without the stress of long waits or travel",
    },
    {
        id: "2",
        image: authAssets.onboarding.slide2,
        header: "What You Can Do",
        description: [
            { icon: authAssets.onboarding.icon1, description: 'Book video or chat consultations' },
            { icon: authAssets.onboarding.icon2, description: "Manage your care in one place" },
            { icon: authAssets.onboarding.icon3, description: "Get instant AI health guidance" },
        ],

    },
    {
        id: "3",
        image: authAssets.onboarding.slide3,
        header: "Your Health, Your Control",
        description: "Your data is private and secure. \nEvery healthcare professional is verified, so you can feel confident about the care you receive.",
    },
];
