import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
// import carsData from "../data/cars.json";
import SearchBar from "../components/SearchBar";
import CarItem from "../components/CarItem";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/Shop/shopSlice";
import { useGetCarsByCategoryQuery } from "../services/service";

const Cars = ({ navigation, route }) => {
  const [word, setWord] = useState("");
  const [carFiltered, setCarFiltered] = useState([]);
  const [error, setError] = useState("");

  const { category: categorySelected } = route.params;
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch(setCategorySelected(""));
    navigation.goBack();
  };

  const {
    data: carsFetched,
    error: errorFromFetch,
    isLoading,
  } = useGetCarsByCategoryQuery(categorySelected);

  useEffect(() => {
    regex = /\d/;
    const hasDigits = regex.test(word);
    if (hasDigits) {
      setError("Don't use digits");
      return;
    }
    // const carsPreFiltered = carsData.filter(
    //   //antes tenia car.category === categorySelected.categoy porque categorySelected es un objeto
    //   (car) => car.category === categorySelected
    // );
    if (!isLoading) {
      const carFilteredByUser = carsFetched?.filter((car) =>
        car.title.toLocaleLowerCase().includes(word.toLocaleLowerCase())
      );
      setCarFiltered(carFilteredByUser);
      setError("");
    }
  }, [word, categorySelected, carsFetched, isLoading]);

  return (
    <View style={styles.flatListContainer}>
      <SearchBar error={error} onSearch={setWord} goBack={goBack} />
      <FlatList
        data={carFiltered}
        renderItem={({ item }) => (
          <CarItem car={item} navigation={navigation} />
        )}
        keyExtractor={(car) => car.id}
      />
    </View>
  );
};

export default Cars;

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
});
