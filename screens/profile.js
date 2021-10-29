import Constants from "expo-constants";
import ViewIdea from "./ViewIdea";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, setState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  TextInput
} from "react-native";
import AfaadFirebase from "../screens/firebaseConfig";
import "firebase/auth";
import Titlestyles from "./TitleStyles";
import SignOut from "../assets/images/SignOut.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from "../assets/images/plusIcon.png";
import Background from "../assets/images/Background.jpg";
import ClickedHomeIcon from "../assets/images/ClickedHomeIcon.png";
import SearchIcon from "../assets/images/SearchIcon.png";
import NotificationIcon from "../assets/images/NotificationIcon.png";
import ProfileIcon from "../assets/images/ProfileIcon.png";
import { Notfication } from "./Notfication";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import { NavigationBar } from './NavigationBar';

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function Profile({ navigation, route }) {
  const [userLastName, setLastName] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [gennder, setgennder] = useState("");


  const [userEmailInv, setUserEmailInv] = useState("");
  const [userPhoneInv, setUserPhoneInv] = useState("");
  const [userFullName, setFullName] = useState("");
  const [userDecr, setuserDecr] = useState("");

  const userType = route.params.userType;
  const userID = route.params.userID;

if (userType=="Investor"){

  const UserInfoRef = AfaadFirebase.database().ref("Investor/" + userID);
  UserInfoRef.once("value").then(function (snapshot) {
    setFullName(snapshot.child("FullName").val());
    setLastName(snapshot.child("Lastname").val());
    setUserEmailInv(snapshot.child("email").val());
    setUserPhoneInv(snapshot.child("phone").val());
    setuserDecr(snapshot.child("Describetion").val());


  });

}else{
  const UserInfoRefEntr = AfaadFirebase.database().ref("Entrepreneur/" + userID);
  UserInfoRefEntr.once("value").then(function (snapshot) {
    setFirstName(snapshot.child("FirstName").val());
    setLastName(snapshot.child("Lastname").val());
    setUserEmail(snapshot.child("email").val());
    setUserPhone(snapshot.child("phone").val());
    setgennder(snapshot.child("Gender").val());
  });

}

  //signout function
  const onSignout = () => {
    auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainScreen" }],
    })
  };

  console.log("here type >>>> " + userType);
  console.log("here ID" + userID);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{
          uri: "http://stcollegekatihar.com/sites/default/files/default_images/User_ring.png",
        }}
      />

      {userType == "Entrepreneur" && (
        <View style={styles.UserName}>
          <Text
            style={{
              fontFamily: "AJannatLT",
              fontSize: 30,
              textAlign: "center",
              color: "#2e4963",
              fontWeight: "bold",
            }}
          >
            {userFirstName} {userLastName}
          </Text>
          
          <Icon
            name="pencil"
            style={{ marginLeft:"13%",marginTop: -30 }}
            size={25}
            color={"#9ca1a6"}
          />
        </View>
      )}

      <View style={styles.TopView}>
        
        {userType == "Entrepreneur" && (
          <View style={styles.fields}>
            <Text style={styles.Tex}>{userEmail}</Text>
            <Icon
              name="pencil"
              style={{ marginRight: "90%", marginTop: -25 }}
              size={20}
              color={"#9ca1a6"}
            />
          </View>
        )}

        {userType == "Entrepreneur" && (
          <View style={styles.fields}>
            <Text style={styles.Tex}>{userPhone}</Text>
            <Icon
              name="pencil"
              style={{ marginRight: "90%", marginTop: -25 }}
              size={20}
              color={"#9ca1a6"}
             
            />
          </View>
        )}

        {userType == "Entrepreneur" && (
          <View style={styles.fields}>
            <Text style={styles.Tex}>{gennder}</Text>
            <Icon
              name="pencil"
              style={{ marginRight: "90%", marginTop: -25 }}
              size={20}
              color={"#9ca1a6"}
            />
          </View>
        )}


{userType == "Investor" && (
        <View style={styles.UserName}>
          <Text
            style={{
              fontFamily: "AJannatLT",
              fontSize: 30,
              textAlign: "center",
              color: "#2e4963",
              fontWeight: "bold",
            }}
          >
            {userFullName}
          </Text>
          
          <Icon
            name="pencil"
            style={{ paddingRight: "80%", marginTop: -30 }}
            size={25}
            color={"#9ca1a6"}
          />
        </View>
      )}
{userType == "Investor" && (
          <View style={styles.fieldsInv}>
            <Text style={styles.Tex}>{userPhoneInv}</Text>

            <Icon
              name="pencil"
              style={{ marginRight: "90%", marginTop: -30 }}
              size={20}
              color={"#9ca1a6"}
           
            />
          </View>
        )}
{userType == "Investor" && (
          <View style={styles.fieldsInv}>
            <Text style={styles.Tex}>{userEmailInv}</Text>
            <Icon
              name="pencil"
              style={{ marginRight: "90%", marginTop: -30 }}
              size={20}
              color={"#9ca1a6"}
            />
          </View>
        )}
       {userType == "Investor" && (
          <View style={styles.decfield}>
            <View style={styles.inside}>
            <Text style={styles.Tex}>{userDecr}</Text>
          
          </View>
          <Icon
              name="pencil"
              style={{ marginRight: "90%", marginTop:-70 }}
              size={20}
              color={"#9ca1a6"}
              position='absolute'
            />
          </View>
        )}












        <TouchableOpacity style={styles.Button} onPress={onSignout}>
          <Text style={styles.ButtonText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>

      {NavigationBar({navigation, ScreenName: 'profile'})}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#002B3E',
  },
  header: {
    backgroundColor: "#aec2d6",
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,

    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 70,
  },

  BottomBar: {
    position: "absolute",
    height: 80,
    bottom: 0,
    width: "100%",
    backgroundColor: "#7c98b3",
  },
  fields: {
    width: "90%",
    height: "12%",

    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,

    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "flex-end",
    borderStyle: "solid",
    paddingRight: 10,
    paddingTop: 6,
    marginTop: 20,
  },
  fieldsInv: {
    width: "90%",
    height: "8%",

    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,

    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "flex-end",
    borderStyle: "solid",
    paddingRight: 10,
    paddingTop: 6,
    marginTop: 20,
  },

  UserName: {
 overflow:"hidden",
    marginTop: "15%",
  },
  Tex: {
    fontSize: 18,
    fontFamily: "AJannatLT",
    textAlign:"right"
  },
  TopView: {
    alignItems: "flex-end",
    paddingRight: 25,
    paddingBottom: 70,
  },
  Button: {
    width: "90%",
    color: "#002B3E",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 100,
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
  decfield:{
    width: "90%",
    height: "20%",

    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,

    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "flex-end",
    borderStyle: "solid",
    paddingRight: 10,
    paddingTop: 6,
    marginTop: 20,
    
  },
  inside:{
height:"70%",
width:"90%"
  }
});
