import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Header = ({ route }) => {
  const categorySelected = useSelector(
    (state) => state.shop.value.categorySelected
  );
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.text : styles.textSm}>
        {categorySelected ? categorySelected : route.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontFamily: "Josefin",
    fontSize: 22,
  },
  textSm: {
    color: "#000",
    fontFamily: "Josefin",
    fontSize: 16,
  },
});

export default Header;
