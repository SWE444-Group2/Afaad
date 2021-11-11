import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, setState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from "react-native";
import AfaadFirebase from "../screens/firebaseConfig";
import "firebase/auth";
import SvgUri from "expo-svg-uri";
import { NavigationBar } from './NavigationBar';
//import  {shape}  from '../assets/images/shape.svg';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadImage from './UploadImage';
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
  <View style={{ height:"100%"}}>
    <View style={styles.SVG}>
  <SvgUri  source={require('../assets/images/shapes.svg')} /> 
  </View>

    <View style={styles.containers}>
      <UploadImage/>
    </View>
    <TouchableOpacity
   style={styles.roundButton1}>
     <Icon name="pencil" style={{ marginLeft:'25%' , marginTop:16} } size={30} color={"#fff"}/> 
 </TouchableOpacity> 
 <View style={styles.TopView}>

{/* 
 {userType == "Entrepreneur" && (
       <View style={{flexDirection:"row"}}>
                    <View style={{textAlign:"Right"}}  style={styles.fields}>
                    <Text style={styles.TextProps} > {userEmail}</Text>
                    </View>
                    <View>
                        <Text style={styles.TextProps}> البريد الإلكتروني :</Text>
                    </View>
                </View>
        
        )}
        */}

<TouchableOpacity style={styles.Button} onPress={onSignout}>
          <Text style={styles.ButtonText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    
      {NavigationBar({navigation, ScreenName:'profile'})}
      <StatusBar style="auto" />

      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#002B3E',
  },
  fields: {
    backgroundColor:"#D8DDE1",
borderRadius: 9,
    marginRight:10,
    borderColor: "#CCCCCC",

  },

  UserName: {
 overflow:"hidden",
    marginTop: "50%",
  },
  Tex: {
    fontSize: 18,
    fontFamily: "AJannatLT",
    textAlign:"right"
  },
  TopView: {
    alignItems: "center",
    width:"90%",
    marginLeft:"5%",
    marginTop:"60%",
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
  inside:{
height:"70%",
width:"90%"
  },

SVG:{
  alignItems: "center",
  position: 'absolute',

},
bar:{
  marginTop:"133.7%"
},
containers: {

  alignItems: 'flex-start',
  marginTop:"25%",
  marginLeft:"4%"

},
TextProps:{
  fontFamily: "AJannatLT",
  fontSize: 18,
  fontWeight: "bold",
  color: "#002B3E",
},
roundButton1: {
  width: 60,
  height: 60,
  borderRadius: 100,
  backgroundColor: '#AEC3D7',
  position: 'absolute',
  marginTop:135,
  marginLeft:285,
  shadowColor: 'rgba(1,0,0, .4)', // IOS
  shadowOffset: { height: 2, width: 2}, // IOS
  shadowOpacity: 2, // IOS
  shadowRadius:2, //IOS
  elevation: 2, // Android

},
});
