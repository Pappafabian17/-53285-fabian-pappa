import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useGetCarByIdQuery } from "../services/service";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/cartSlice";

const CarDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState("portrait");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { width, height } = useWindowDimensions();
  const { carId: idSelected } = route.params;

  const { data: carDet, error, isLoading } = useGetCarByIdQuery(idSelected);
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const handleAddCart = () => {
    dispatch(addCartItem({ ...carDet, quantity: 1 }));
    setShowSuccessMessage(true);
    Animated.timing(successAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowSuccessMessage(false));
      }, 2000);
    });
  };

  return (
    <View style={styles.mainDetailContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
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
            <Text style={styles.title}>{carDet.title}</Text>
            <Text style={styles.description}>{carDet.description}</Text>
            <Text style={styles.price}>${carDet.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddCart}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {showSuccessMessage && (
        <Animated.View
          style={[
            styles.successMessageContainer,
            {
              opacity: successAnim,
              transform: [
                {
                  translateY: successAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.successMessage}>Item added to cart!</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  mainDetailContainer: {
    flex: 1,
    backgroundColor: "#b2b3f3",
    padding: 10,
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 10,
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  addButton: {
    backgroundColor: "#b2b3f3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#f32821",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  successMessageContainer: {
    position: "absolute",
    top: "70%",
    left: "10%",
    right: "10%",
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  successMessage: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
