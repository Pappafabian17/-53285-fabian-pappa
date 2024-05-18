import { Image, StyleSheet, View } from "react-native";
import React from "react";
import AddButton from "../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/service";
import { clearUser } from "../features/User/userSlice";
import { truncateSessionsTable } from "../persistence";
const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const launchCamera = async () => {
    navigation.navigate("ImageSelector");
  };

  const signOut = async () => {
    try {
      const response = await truncateSessionsTable();
      dispatch(clearUser());
    } catch (error) {
      console.error({ errorSignOutDB: error });
    }
  };

  const defaultImageRoute = "../../assets/images/defaultProfile.png";

  return (
    <View style={styles.container}>
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require(defaultImageRoute)}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <AddButton
        onPress={launchCamera}
        title={
          imageFromBase || imageCamera
            ? "Edit profile picture"
            : "Add profile picture"
        }
      />
      <AddButton onPress={signOut} title="Sign out" />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
