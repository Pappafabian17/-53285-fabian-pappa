import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CarDetail from "../screens/CarDetail";
import Cars from "../screens/Cars";
import Header from "../components/Header";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";
import HomeStackNavigator from "./HomeStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
