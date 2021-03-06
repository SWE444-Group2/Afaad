import React from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import SvgUri from "expo-svg-uri";
import TextLogo from "../assets/images/AfaadLogo.jpeg";

const auth = AfaadFirebase.auth();
const rootRef = AfaadFirebase.database().ref();

export default function Login({ navigation }) {
  //fields value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.push("SignupOption");
  };

  //when login button is pressed perform this
  const onLogin = () => {
    if (email !== "" && password !== "") {
      //all fields are not empty
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          //success login
          let user = AfaadFirebase.auth().currentUser;
          let userID, userType;
          if (user) {
            userID = user.uid;
            console.log(userID);
            AfaadFirebase.database()
              .ref("/Admin/" + userID)
              .on("value", (snapshot) => {
                if (snapshot.exists()) {
                  userType = "Admin";
                  navigation.navigate("Admin");
                }
              });
            AfaadFirebase.database()
              .ref("/Entrepreneur/" + userID)
              .on("value", (snapshot) => {
                if (snapshot.exists()) {
                  userType = "Entrepreneur";
                  navigation.navigate("EntrepreneurAndInvestor");
                }
              });
            AfaadFirebase.database()
              .ref("/Investor/" + userID)
              .on("value", (snapshot) => {
                if (snapshot.exists()) {
                  userType = "Investor";
                  if (snapshot.child("Verified").val() == "Pending") {
                    navigation.navigate("PendingPage");
                  }

                  if (snapshot.child("Verified").val() == "Accepted") {
                    if (userType == "Investor")
                      navigation.navigate("EntrepreneurAndInvestor");
                  }

                  if (snapshot.child("Verified").val() == "Rejected") {
                    if (userType == "Investor") {
                      Alert.alert(
                        "??????????!",
                        "?????? ???? ?????? ?????????? ???????? ?????????? ????????????",
                        [{ text: "??????????" }]
                      );
                    }
                  }
                }
              });
          }
        })
        .catch(function (error) {
          switch (error.code) {
            case "auth/invalid-email":
              Alert.alert("??????????", "?????????????? ???????????? ?????? ????????", [
                {
                  text: "??????????",
                  style: "cancel",
                },
              ]);
              break;
            case "auth/network-request-failed":
              Alert.alert("??????????", "???????????? ???????????? ???? ?????????????? ??????????????????", [
                {
                  text: "??????????",
                  style: "cancel",
                },
              ]);
              break;
            case "auth/user-not-found":
              Alert.alert("??????????", "?????????????? ???? ???????? ???????????? ??????????", [
                {
                  text: "??????????",
                  style: "cancel",
                },
              ]);
              break;

            case "auth/user-mismatch":
              Alert.alert("??????????", "?????????????? ???? ???????? ???????????? ??????????", [
                {
                  text: "??????????",
                  style: "cancel",
                },
              ]);
              break;
            case "auth/wrong-password":
              Alert.alert("??????????", "?????????????? ???? ???????? ???????????? ??????????", [
                {
                  text: "??????????",
                  style: "cancel",
                },
              ]);
              break;
          }
        });
    } else {
      Alert.alert("??????????", "???????????? ?????????? ???? ????????????????", [
        {
          text: "??????????",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainView}>
          
          <View style={styles.TopView}>
            <Image source={TextLogo} style={styles.image} />
          </View>


          <View style={styles.BottomView}>

          <View style={styles.SVG}>
    <SvgUri source={require('../assets/images/logIn.svg')} /> 
    </View>

            
            <Text style={styles.Heading}> ?????????? ???????????? </Text>


            <View style={styles.FormView}>
              <TextInput
                style={styles.TextInput}
                placeholder=" ?????????? ?????????? ????????????????????"
                placeholderTextColor={"#fff"}
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                textContentType="emailAddress"
                clearButtonMode="while-editing"
                color="balck"
              />

              <TextInput
                style={styles.TextInput}
                placeholderTextColor={"#fff"}
                placeholder="???????? ????????"
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                textContentType="password"
                clearButtonMode="while-editing"
                color="balck"
              />

              <Text
                onPress={() => navigation.navigate("ResetPass")}
                style={[
                  styles.TextButton,
                  { textAlign: "right" },
                  {
                    paddingRight: 25,
                    color: "#002B3E",
                    textDecorationLine: "underline",
                  },
                ]}
              >
                ???? ???????? ???????? ??????????????
              </Text>

              <TouchableOpacity style={styles.Button} onPress={onLogin}>
                <Text style={styles.ButtonText}>?????????? ????????</Text>
              </TouchableOpacity>

              <View style={styles.TextButton}>
                <Text style={styles.SignUpText}>
                  ?????? ???????? ???????? ??????????{" "}
                  <Text onPress={onFooterLinkPress} style={styles.resetButton}>
                    ?????????? ????????
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7C98B3",
  },
  /*
  button: {
    width: 213,
    height: 52,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#022B3A',
  },
  LabelStyle: {
    fontFamily: 'AJannatLTBold',
    color: '#022B3A',
    fontSize: 20,
  },
  input: {
    height: 48,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 10,
    paddingRight: 15,
    textAlign: 'right',
    fontFamily: 'AJannatLT',
    width: '100%'
  },
  footerText: {
    marginTop: 20,
    alignContent: 'center',
    fontSize: 16,
    color: "#2e2e2d",
    fontFamily: 'AJannatLT',
  },
  footerLink: {
    color: "#7C98B3",
    fontFamily: 'AJannatLTBold',
    fontWeight: "bold",
    fontSize: 16,
  },
  */

  ///////// NEW DESIGN ///////////
  mainView: {
    //marginTop:40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  TopView: {
    width: "100%",
    height: "30%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  BottomView: {
    width: "100%",
    height: "70%",

  },
  image: {
    width: "50%",
    resizeMode: "contain",
  },
  Heading: {
    color: "#fff",
    fontFamily: "AJannatLTBold",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 30,
    margin: 30,
    marginTop: 35,
  },

  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    height: 52,
    borderRadius: 10,
    fontFamily: "AJannatLT",
    fontSize: 18,
    textAlign: "right",
    paddingRight: 5,
    marginTop: 20,
    color: "#fff",
  },

  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -12,
  },

  Button: {
    width: "90%",
    color: "#002B3E",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontFamily: "AJannatLT",
    fontSize: 18,
    fontWeight: "bold",
    color: "#002B3E",
  },

  TextButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    fontWeight: "bold",
  },

  SignUpText: {
    color: "#002B3E",
    fontSize: 14,
    // fontWeight:'bold',
  },
  resetButton: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    marginTop: 10,
    fontWeight: "bold",
    textDecorationLine:'underline'
  },
  SVG: {
    alignItems: "center",
    position: "absolute",
  },
});
