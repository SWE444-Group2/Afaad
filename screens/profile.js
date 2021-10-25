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

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function Profile({ navigation, route }) {

 
  const [userLastName, setLastName] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [gennder, setgennder] = useState("");
  
 

  const userType = route.params.userType;

  const userID = route.params.userID;
  
  const UserInfoRef = AfaadFirebase.database().ref("Entrepreneur/" +userID);
  UserInfoRef.once("value").then(function (snapshot) {
    setFirstName(snapshot.child("FirstName").val());
    setLastName(snapshot.child("Lastname").val());
    setUserEmail(snapshot.child("email").val());
    setUserPhone(snapshot.child("phone").val());
    setgennder(snapshot.child("Gender").val());
  });

  //signout function
  const onSignout = () => {
    auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainScreen" }],
    });
  };

  
console.log("here type >>>> "+userType);
console.log("here ID"+userID);


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
            {userFirstName}{" "}{userLastName}
      
            
          </Text>
          <Icon
              name="pencil"
              style={{ marginRight: "55%", marginTop: -30}}
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

  <TouchableOpacity style={styles.Button} onPress={onSignout}>
                <Text style={styles.ButtonText}>تسجيل الخروج</Text>
              </TouchableOpacity>

      </View>

      <View style={styles.BottomBar}>
        {userType == "Entrepreneur" && (
          <TouchableOpacity>
            <Icon
              name="account-box"
              style={{ marginLeft: "5%", marginTop: 10 }}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Entrepreneur" && (
          <TouchableOpacity>
            <Icon
              name="bell"
              style={{ marginLeft: "25%", marginTop: -38 }}
              size={35}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Entrepreneur" && (
          <TouchableOpacity onPress={() => navigation.navigate("PublishIdea")}>
            <Icon
              name="plus-circle-outline"
              style={{ marginLeft: "45%", marginTop: -40 }}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Entrepreneur" && (
          <TouchableOpacity>
            <Icon
              name="feature-search-outline"
              style={{ marginLeft: "65%", marginTop: -43 }}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}
        {userType == "Entrepreneur" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("EntrepreneurAndInvestor")}
          >
            <Icon
              name="home-circle-outline"
              style={{ marginLeft: "83%", marginTop: -43 }}
              size={43}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Investor" && (
          <TouchableOpacity>
            <Icon
              name="account-box"
              style={{ marginLeft: "5%", marginTop: 10 }}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Investor" && (
          <TouchableOpacity>
            <Icon
              name="bell-outline"
              style={{ marginLeft: "25%", marginTop: -40 }}
              size={37}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Investor" && (
          <TouchableOpacity>
            <Icon
              name="lightbulb-on-outline"
              style={{ marginLeft: "45%", marginTop: -43 }}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Investor" && (
          <TouchableOpacity>
            <Icon
              name="feature-search-outline"
              style={{ marginLeft: "65%", marginTop: -43 }}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {userType == "Investor" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("EntrepreneurAndInvestor")}
          >
            <Icon
              name="home-circle-outline"
              style={{ marginLeft: "83%", marginTop: -43 }}
              size={43}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}
      </View>
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
  fields:{
width:"90%",
height:"12%",

      borderWidth:1,
      borderColor:"#CCCCCC",
      borderRadius:8,
     
      backgroundColor:"white",
 
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems:'flex-end',
      borderStyle: 'solid',
      paddingRight:10,
      paddingTop:6,
      marginTop:20,

  },

  UserName:{
  
alignItems:"center",
    marginTop:"15%",

  },
Tex:{
  fontSize:18,
  fontFamily: 'AJannatLT',
},
  TopView:{
 

    alignItems:'flex-end',
    paddingRight:25,
paddingBottom:70,


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

});
