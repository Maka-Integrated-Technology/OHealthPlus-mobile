import notificationIcon from "@/assets/icons/notification.png";
import avatar from "@/assets/images/avatar.png";
import { Text } from "@/components/Text";
import { useAppRouter } from "@/config/route";
import Colors from "@/constants/Colors";
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  const router = useAppRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeHeader}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => router.toProfile()} style={({ pressed }) => pressed && { transform: [{ scale: 0.97 }], opacity: 0.6 }}>
            <Image source={avatar} style={{ height: 48, resizeMode: 'contain' }} />
          </Pressable>
          <View>
            <Text weight="bold">Hello, Olivia Jane</Text>
            <Text style={{ color: Colors.neutral }}>Welcome back</Text>
          </View>
        </View>

        <Pressable style={{ alignItems: 'center' }}>
          <Image style={{ height: 24, resizeMode: 'contain' }} source={notificationIcon} />
        </Pressable>
      </View>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
