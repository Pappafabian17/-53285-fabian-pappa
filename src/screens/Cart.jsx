import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/service";
// import CartData from "../data/cart.json";

const Cart = () => {
  // console.log(CartData);

  const { items: CartData, total } = useSelector((state) => state.cart.value);

  const [triggerPostOrder, result] = usePostOrderMutation();

  console.log("CAAAAART=====", CartData);

  /* const total = CartData.reduce(
    (acumulador, currentItem) =>
      (acumulador += currentItem.price * currentItem.quantity),
    0
  ); */
  const onConfirmOrder = () => {
    triggerPostOrder({ items: CartData, user: "Fabian", total });
  };

  console.log("result", result);

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        keyExtractor={(pepe) => pepe.id}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable onPress={onConfirmOrder}>
          <Text>Confirm</Text>
        </Pressable>
        <Text>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 120,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
