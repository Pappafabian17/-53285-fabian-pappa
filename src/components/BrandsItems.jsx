import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import React from "react";
import Card from "./Card";

const BrandsItems = ({ item, setCategorySelected = () => {} }) => {
  console.log("item ", item);
  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Pressable onPress={() => setCategorySelected(item)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </Pressable>
    </Card>
  );
};

export default BrandsItems;

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "30px",
  },
  image: {
    width: 220,
    height: 200,
    objectFit: "contain",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
