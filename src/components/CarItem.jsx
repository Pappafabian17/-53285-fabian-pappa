import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";

const CarItem = ({ car }) => {
  console.log("CAR DE ITEM", car);
  return (
    <Card style={styles.carCard}>
      <Text style={styles.textCar}>{car.title}</Text>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: car.url }}
      />
    </Card>
  );
};

export default CarItem;

const styles = StyleSheet.create({
  carCard: {
    paddingLeft: 10,
    flexDirection: "row",
    height: 120,
    width: 300,
    justifyContent: "space-between",
    margin: 10,
  },
  image: {
    height: 120,
    width: "65%",
    borderRadius: 8,
    // padding: 5,
  },
  textCar: {
    width: "35%",
    color: "black",
  },
});
