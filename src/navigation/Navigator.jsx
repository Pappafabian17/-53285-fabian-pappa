import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CarDetail from "../screens/CarDetail";
import Cars from "../screens/Cars";
import Header from "../components/Header";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Header title={"SELLCARS"} />
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Cars} name="Cars" />
        <Stack.Screen component={CarDetail} name="CarDetail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
