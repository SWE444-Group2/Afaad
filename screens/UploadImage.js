import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
import DropDownPicker from "react-native-dropdown-picker";

export default function UploadImage() {
  let user = AfaadFirebase.auth().currentUser;
  let userID, userType;

  const [Retimage, setRetimage] = useState("here");

  if (user) {
    userID = user.uid;

    AfaadFirebase.database()
      .ref("/Entrepreneur/" + userID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          userType = "Entrepreneur";
        }
      });
    AfaadFirebase.database()
      .ref("/Investor/" + userID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          userType = "Investor";
        }
      });
  }
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(JSON.stringify(_image));
    if (!_image.cancelled) {
      uploadImage(_image.uri);
      setImage(_image.uri);
      
    }
  };
  const uploadImage = async (uri) => {
    let filename = uri;
    if (Platform.OS === "ios") {
      filename = uri.replace("file:", "");
    }

    const ext = filename.split(".").pop();
    const path = `images/${userID}/`;
    //console.log("the paath is >>>>> "+path);
    const ref = AfaadFirebase.storage().ref(path); //correct
    //console.log("the REF is >>>>> "+ref);
    //console.log("afaad ref is "+ref)
    //console.log("THE IMAGE "+Retimage)

    const response = await fetch(filename);
    const blob = await response.blob();
    await ref.put(blob);

    global.downloadURL = await ref.getDownloadURL();
    //console.log("URL  "+downloadURL);

    DataRef.update({
      pic: downloadURL,
    });
    setImage(DataRef.pic.val);
    console.log(image);
  };

  useEffect(() => {
    if (userType == "Investor") {
      console.log("inside inv if use effect");
      global.DataRef = AfaadFirebase.database().ref("Investor/" + userID);
      DataRef.once("value").then(function (snapshot) {
        setImage(snapshot.child("pic").val());
      });
      console.log("inside inv if use effect");
    } else {
      global.DataRef = AfaadFirebase.database().ref("Entrepreneur/" + userID);
      console.log("inside ent if use effect");

      DataRef.once("value").then(function (snapshot) {
        setImage(snapshot.child("pic").val());
      });
    }

  }, []);

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,

    position: "absolute",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 0.4,
    borderColor: "#768FA7",
  },
  uploadBtnContainer: {
    opacity: 0.6,
    position: "absolute",
    right: 0,
    bottom: -6,
    backgroundColor: "#768FA7",
    width: "100%",
    height: "30%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
