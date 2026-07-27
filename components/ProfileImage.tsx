import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getProfile, saveProfile } from "../utils/profileStorage";

export default function ProfileImage() {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
  const loadImage = async () => {
    const profile = await getProfile();

    if (profile?.image) {
      setImage(profile.image);
    }
  };

  loadImage();
}, []);


  const pickImage = () => {
  Alert.alert(
    "Profile Picture",
    "Choose an option",
    [
      {
        text: "Camera",
        onPress: openCamera,
      },
      {
        text: "Gallery",
        onPress: openGallery,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
};
const openGallery = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow gallery access."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    console.log("Selected URI:", uri);

    setImage(uri);

    const profile = await getProfile();

    await saveProfile({
      ...profile,
      image: uri,
    });
  }
};

const openCamera = async () => {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow camera access."
    );
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    console.log("Selected URI:", uri);

    setImage(uri);

 const profile = (await getProfile()) || {};

await saveProfile({
  ...profile,
  image: uri,
});


setImage(uri);   
    const saved = await getProfile();
console.log("Saved profile:", saved);
  }
};
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={pickImage}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={styles.image}
        />
      )}

      <View style={styles.camera}>
        <Feather name="camera" size={18} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginTop: 20,
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },

  camera: {
    position: "absolute",
    right: 0,
    bottom: 5,
    backgroundColor: "#006A61",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});