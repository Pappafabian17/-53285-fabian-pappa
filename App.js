import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { useFonts } from "expo-font";
import Navigator from "./src/navigation/Navigator";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

export default App;
