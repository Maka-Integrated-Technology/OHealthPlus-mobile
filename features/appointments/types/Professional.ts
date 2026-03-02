import { ImageSourcePropType } from "react-native";

export interface Professional {
    id: string,
    image: ImageSourcePropType,
    name: string,
    role: string,
    reviews: number;
    consultationfee: number
    rating: number

}
