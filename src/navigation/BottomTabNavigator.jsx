import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "../components/Header";
import HomeStackNavigator from "./HomeStackNavigator";
import { FontAwesome5, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import CartStack from "./CartStackNavigator";
import OrderStack from "./OrderStackNavigator";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import MyProfileStack from "./MyProfileStack";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header route={route} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome
                  name="car"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6
                  name="cart-shopping"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons
                  name="receipt-long"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="My profile"
        component={MyProfileStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Ionicons
                  name="person-circle"
                  size={24}
                  color={focused ? "black" : "black"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#486dd1",
    shadowColor: "black",
    elevation: 4,
    borderRadius: 15,
    height: 60,
  },
});
