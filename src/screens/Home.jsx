import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import brands from "../data/brands.json";
import BrandsItems from "../components/BrandsItems";
import Counter from "../components/Counter";

const Home = ({ navigation }) => {
  return (
    <View style={styles.flatListContainer}>
      <View>
        <Text style={styles.title}>Seleccione una Marca :</Text>
      </View>
      <Counter />
      <FlatList
        data={brands}
        renderItem={({ item }) => (
          <BrandsItems
            style={styles.brandContainer}
            navigation={navigation}
            item={item}
          />
        )}
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
    backgroundColor: "#c9dbdb",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 23,
  },
});
