import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import carData from "../data/cars.json";

const CarDetail = ({ navigation, route }) => {
  const [carDet, setCarDet] = useState(null);
  const [orientation, setOrientation] = useState("portrait");
  const { width, height } = useWindowDimensions();
  const { carId: idSelected } = route.params;
  //Landscape = horizontal
  //Portrait = vertical

  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  console.log(orientation);

  useEffect(() => {
    const carSelected = carData.find((car) => car.id === idSelected);
    setCarDet(carSelected);
  }, [idSelected]);

  return (
    <View style={styles.mainDetailContainer}>
      <Button onPress={() => navigation.goBack()} title="Volver" />
      {carDet ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: carDet.url }}
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
            resizeMode="cover"
          />
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text>{carDet.title}</Text>
            <Text>{carDet.description}sss</Text>
            <Text style={styles.price}>${carDet.price}</Text>
            <Button title="Add cart"></Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  mainDetailContainer: {
    width: "100%",
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },
  textContainer: {
    flexDirection: "column",
    width: "100%",
  },

  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: {
    textAlign: "right",
    width: "100%",
  },
});
