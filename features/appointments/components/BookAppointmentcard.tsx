import { Text } from "@/components/Text";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native";

export interface Personnel {
    image: ImageSourcePropType;
    text: string;
}

export function BookAppointmentCard({ personnel }: { personnel: Personnel }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={personnel.image} style={styles.image}>

                <MaskedView
                    style={StyleSheet.absoluteFill}
                    maskElement={
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.65)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFill}
                        />
                    }
                >
                    <BlurView
                        intensity={50}
                        tint="default"
                        style={StyleSheet.absoluteFill}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.55)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                    />
                </MaskedView>

                <View style={styles.textContainer}>
                    <Text weight="bold" style={styles.personnelText}>{personnel.text}</Text>
                </View>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 16 / 8,
        width: "100%",
        borderRadius: 24,
        borderWidth: 3,
        borderColor: "white",
        overflow: "hidden",
    },
    image: {
        flex: 1,
    },
    personnelText: {
        // position: "absolute",
        // width: "50%",
        padding: 12,
        color: "white",
        textAlign: "left",
        fontSize: 24,
    },
    textContainer: {
        position: "absolute",
        height: '100%',
        width: "50%",
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
