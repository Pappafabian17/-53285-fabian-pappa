import { Image, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setIdSelected } from "../features/Shop/shopSlice";

const CarItem = ({ car, navigation }) => {
  // console.log("CAR DE ITEM", car);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setIdSelected(car.id));
    navigation.navigate("CarDetail", { carId: car.id });
  };
  return (
    <Card style={styles.carCard}>
      <Pressable style={styles.pressable} onPress={handleNavigate}>
        <Text style={styles.textCar}>{car.title}</Text>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: car.url }}
        />
      </Pressable>
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
  pressable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
});
