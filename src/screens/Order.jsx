import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import OrderItem from "../components/OrderItem";
import { useGetOrdersQuery } from "../services/service";
import { useSelector } from "react-redux";

const Order = () => {
  const { localId } = useSelector((state) => state.auth.value);

  const { data: orders, isSuccess } = useGetOrdersQuery(localId);
  const [ordersFiltered, setOrdersFiltered] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      const responseTransformed = Object.values(orders);
      const ordersFiltered = responseTransformed.filter(
        (order) => order.user === localId
      );
      setOrdersFiltered(ordersFiltered);
    }
  }, [orders, isSuccess, localId]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <View>
      <FlatList
        data={ordersFiltered}
        renderItem={({ item }) => {
          return <OrderItem order={item} onPress={() => openModal(item)} />;
        }}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details</Text>
            {selectedOrder && (
              <>
                {selectedOrder.items.map((item) => (
                  <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemText}>Title: {item.title}</Text>
                    <Text style={styles.itemText}>
                      Category: {item.category}
                    </Text>
                    <Text style={styles.itemText}>
                      Description: {item.description}
                    </Text>
                    <Text style={styles.itemText}>Price: ${item.price}</Text>
                    <Text style={styles.itemText}>
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                ))}
                <Text style={styles.totalText}>
                  Total: ${selectedOrder.total}
                </Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#b2b3f3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
