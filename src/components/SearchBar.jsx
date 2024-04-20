import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";

const SearchBar = ({ onSearch = () => {}, error = "", goBack = () => {} }) => {
  const [key, setKey] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={key}
        onChangeText={setKey}
      />
      <Pressable onPress={() => onSearch(key)}>
        <FontAwesome6 name="searchengin" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => setKey("")}>
        <FontAwesome5 name="eraser" size={24} color="white" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color="white" />
      </Pressable>
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: "#ffffff",
    color: "#7041df",
    fontWeight: "700",
    borderRadius: 10,
  },
});
