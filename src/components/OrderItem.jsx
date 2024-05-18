import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

const OrderItem = ({ order, onPress }) => {
  const total = order.items.reduce(
    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
    0
  );

  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {new Date(order?.createdAt || null).toLocaleString()}
        </Text>
        <Text style={styles.text2}>${total}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Feather name="search" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: "#ddddd",
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 17,
    color: "black",
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 19,
    color: "gray",
  },
});
