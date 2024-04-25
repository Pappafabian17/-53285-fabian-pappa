import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import OrderItem from "../components/OrderItem";
import OrderData from "../data/orders.json";

const Order = () => {
  return (
    <View>
      <FlatList
        data={OrderData}
        keyExtractor={(orderItem) => orderItem.id}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
