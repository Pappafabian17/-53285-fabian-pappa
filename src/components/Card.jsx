import { StyleSheet, Text, View } from "react-native";
import React, { Children } from "react";

const Card = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: 250,
    shadowColor: "#abb1c3",
    padding: "5px",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
