import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { useFonts } from "expo-font";
import Header from "./src/components/Header";
import Home from "./src/screens/Home";
import { useState } from "react";
import Cars from "./src/screens/Cars";
import CarDetail from "./src/screens/CarDetail";
import Navigator from "./src/navigation/Navigator";

const App = () => {
  const [categorySelected, setCategorySelected] = useState("");
  const [carIdSelected, setCarIdSelected] = useState("");

  console.log("CarIdSelected", carIdSelected);
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Navigator /> */}
        <Header title={"Bienvenidos!"} />
        {!categorySelected ? (
          <Home setCategorySelected={setCategorySelected} />
        ) : !carIdSelected ? (
          <Cars
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            setCarIdSelected={setCarIdSelected}
          />
        ) : (
          <CarDetail
            idSelected={carIdSelected}
            setCarIdSelected={setCarIdSelected}
          />
        )}
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: "center",
  },
});

export default App;
