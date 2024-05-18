import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../features/Cart/cartSlice";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeCartItem({ id: cartItem.id }));
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: cartItem.url }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {cartItem.title} ({cartItem.quantity})
        </Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>Price: ${cartItem.price}</Text>
      </View>
      <TouchableOpacity onPress={handleRemoveItem}>
        <Entypo name="trash" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: "#b2b3f3",
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    flex: 1,
    objectFit: "contain",
  },
  textContainer: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 19,
    color: "#000",
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 14,
    color: "#000",
  },
});
