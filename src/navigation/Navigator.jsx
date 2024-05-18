import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../persistence";
import { setUser } from "../features/User/userSlice";

const Stack = createNativeStackNavigator();
const Navigator = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();
        if (response.rows._array.length) {
          const user = response.rows._array[0];
          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token,
            })
          );
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
