import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { useFonts } from "expo-font";
import Header from "./src/components/Header";
import Home from "./src/screens/Home";
import { useState } from "react";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  const [categorySelected, setCategorySelected] = useState("");

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={"Bienvenidos!"} />
        {!categorySelected ? (
          <Home setCategorySelected={setCategorySelected} />
        ) : (
          <Cars />
        )}
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    // alignItems: "center",
    backgroundColor: "red",
  },
});

export default App;
