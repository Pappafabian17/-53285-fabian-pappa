import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BrandsItems from "../components/BrandsItems";
import { useGetCategoriesQuery } from "../services/service";

const Home = ({ navigation }) => {
  const { data: brands, error, isLoading } = useGetCategoriesQuery();
  return (
    <View style={styles.flatListContainer}>
      <View>
        <Text style={styles.title}>Seleccione una Marca :</Text>
      </View>
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
    backgroundColor: "#b2b3f3",
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
