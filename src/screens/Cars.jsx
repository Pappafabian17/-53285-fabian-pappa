import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import carsData from "../data/cars.json";
import SearchBar from "../components/SearchBar";
import CarItem from "../components/CarItem";

const Cars = ({ categorySelected = "", setCategorySelected = () => {} }) => {
  const [word, setWord] = useState("");
  const [carFiltered, setCarFiltered] = useState([]);
  const [error, setError] = useState("");

  console.log("categorySelected", categorySelected);

  useEffect(() => {
    //filtrado de productos por categoria
    regex = /\d/;
    const hasDigits = regex.test(word);
    // console.log("Tiene digito? ", hasDigits);

    if (hasDigits) {
      setError("Don't use digits");
      return;
    }
    const carsPreFiltered = carsData.filter(
      (car) => car.category === categorySelected.category
    );
    console.log("preFiltro", carsPreFiltered);
    const carFilteredByUser = carsPreFiltered.filter((car) =>
      car.title.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    );
    console.log("filtro de usuario", carFilteredByUser);
    setCarFiltered(carFilteredByUser);
    setError("");
  }, [word, categorySelected]);

  return (
    <View style={styles.flatListContainer}>
      <SearchBar
        error={error}
        onSearch={setWord}
        goBack={() => setCategorySelected("")}
      />
      <FlatList
        data={carFiltered}
        renderItem={({ item }) => <CarItem car={item} />}
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
