import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import brands from "../data/brands.json";

const Home = ({ setCategorySelected }) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={brands}
        renderItem={({ item }) => <Text>{item.category}</Text>}
        keyExtractor={(element) => element.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: "blue",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
