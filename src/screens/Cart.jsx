import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/service";
import { clearCart } from "../features/Cart/cartSlice";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const { localId } = useSelector((state) => state.auth.value);
  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const [triggerPostOrder, result] = usePostOrderMutation();

  const onConfirmOrder = () => {
    triggerPostOrder({ items: CartData, user: localId, total })
      .unwrap()
      .then(() => {
        dispatch(clearCart()); // vaciamos el carrito
        navigation.navigate("Orders");
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
      />
      {CartData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Carrito vacio</Text>
        </View>
      ) : (
        <Pressable style={styles.confirmButton} onPress={onConfirmOrder}>
          <View style={styles.totalContainer}>
            <Text style={styles.confirmText}>Confirm</Text>
            <Text style={styles.totalText}>Total: ${total}</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  confirmButton: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
