import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Cars from "../screens/Cars";
import CarDetail from "../screens/CarDetail";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Cars} name="Cars" />
      <Stack.Screen component={CarDetail} name="CarDetail" />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
