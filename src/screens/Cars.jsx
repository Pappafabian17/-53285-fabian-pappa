import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Cars = ({ categorySelected, setCategorySelected = () => {} }) => {
  const [word, setWord] = useState("");
  const [carFiltered, setCarFiltered] = useState([]);
  const [error, setError] = useState("");

  return (
    <View>
      <Text>Cars</Text>
    </View>
  );
};

export default Cars;

const styles = StyleSheet.create({});
