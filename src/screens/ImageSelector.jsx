import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import AddButton from "../components/AddButton";
import {
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} from "../services/service";

const ImageSelector = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);
  const [image, setImage] = useState(null);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const [triggerPostImage, result] = usePostProfileImageMutation();

  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    return granted;
  };

  const pickImage = async () => {
    try {
      const permissionCamera = await verifyCameraPermissions();

      if (permissionCamera) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });

        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
          setImage(image);
        }
      }
    } catch (error) {}
  };

  const verifyGalleryPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return granted;
  };

  const pickGalleryImage = async () => {
    try {
      const permissionGallery = await verifyGalleryPermissions();
      if (permissionGallery) {
        const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          aspect: [1, 1],
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2,
        });
        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
          setImage(image);
        }
      }
    } catch (error) {}
  };

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {image || imageFromBase ? (
        <>
          <Image
            source={{ uri: image || imageFromBase?.image }}
            style={styles.image}
          />
          <AddButton title="Take another photo" onPress={pickImage} />
          <AddButton
            title="Pick photo from gallery"
            onPress={pickGalleryImage}
          />
          <AddButton title="Confirm photo" onPress={confirmImage} />
        </>
      ) : (
        <>
          <View style={styles.noPhotoContainer}>
            <Text>No photo to show...</Text>
          </View>
          <AddButton title="Take a photo" onPress={pickImage} />
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  noPhotoContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
