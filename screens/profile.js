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
import { NavigationBar } from "./NavigationBar";
//import  {shape}  from '../assets/images/shape.svg';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadImage from "./UploadImage";
import { Keyboard } from 'react-native'
import { FloatingLabelInput } from 'react-native-floating-label-input';
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
const full = userFirstName+" "+userLastName;
  const userType = route.params.userType;
  const userID = route.params.userID;

  if (userType == "Investor") {
    const UserInfoRef = AfaadFirebase.database().ref("Investor/" + userID);
    UserInfoRef.once("value").then(function (snapshot) {
      setFullName(snapshot.child("FullName").val());
      setLastName(snapshot.child("Lastname").val());
      setUserEmailInv(snapshot.child("email").val());
      setUserPhoneInv(snapshot.child("phone").val());
      setuserDecr(snapshot.child("Describetion").val());
    });
  } else {
    const UserInfoRefEntr = AfaadFirebase.database().ref(
      "Entrepreneur/" + userID
    );
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
    });
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

<View style={{ padding: 50,marginTop:150}}>

      <FloatingLabelInput 
        label="الاسم"
        value={full}
        staticLabel
        hintTextColor={'#aaa'}
        caretHidden={true}
        editable={false} 
         selectTextOnFocus={false} 
        
        containerStyles={{
          borderWidth: 0.76,
          paddingHorizontal: 8,
          bottom:-3,
          textAlign:"right",
          borderColor: 'gray',
          borderRadius: 8,
          height:50
        }}
        customLabelStyles={{
          colorFocused: 'black',
          fontSizeFocused: 12,

        }}
        labelStyles={{
          backgroundColor: '#f2f2f2',
          paddingHorizontal: 5,
         marginLeft:225,
         fontFamily: "AJannatLT",
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
          fontFamily: "AJannatLT",
          fontSize: 14,
       color: "#002B3E",
       textAlign:"right",
       fontWeight: "bold",
        }}
        
      
      />
      <View style={{marginTop:25}} >
<FloatingLabelInput 
        label="البريد الالكتروني"
        value={userEmail}
        staticLabel
        hintTextColor={'#aaa'}
        caretHidden={true}
        editable={false} 
        selectTextOnFocus={false} 
  
        containerStyles={{
          borderWidth: 0.76,
          paddingHorizontal: 8,
          bottom:-3,
          textAlign:"right",
          borderColor: 'gray',
          borderRadius: 8,
          height:50
        }}
        customLabelStyles={{
          colorFocused: 'black',
          fontSizeFocused: 12,

        }}
        labelStyles={{
          backgroundColor: '#f2f2f2',
          paddingHorizontal: 5,
         marginLeft:190,
         fontFamily: "AJannatLT",
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
          fontFamily: "AJannatLT",
          fontSize: 14,
       color: "#002B3E",
       textAlign:"right",
       fontWeight: "bold",
        }}
        
      
      />
         </View>{/* second field*/}

      
         <View style={{marginTop:25}} >
<FloatingLabelInput 
        label="الجنس"
        value={gennder}
        staticLabel
        hintTextColor={'#aaa'}
        caretHidden={true}
        editable={false} 
        selectTextOnFocus={false} 
  
        containerStyles={{
          borderWidth: 0.76,
          paddingHorizontal: 8,
          bottom:-3,
          textAlign:"right",
          borderColor: 'gray',
          borderRadius: 8,
          height:50
        }}
        customLabelStyles={{
          colorFocused: 'black',
          fontSizeFocused: 12,

        }}
        labelStyles={{
          backgroundColor: '#f2f2f2',
          paddingHorizontal: 5,
         marginLeft:235,
         fontFamily: "AJannatLT",
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
          fontFamily: "AJannatLT",
          fontSize: 14,
       color: "#002B3E",
       textAlign:"right",
       fontWeight: "bold",
        }}
        
      
      />
         </View>{/* fourth field*/}
         <View style={{marginTop:25}} >
<FloatingLabelInput 
        label="رقم الجوال"
        value={userPhone}
        staticLabel
        hintTextColor={'#aaa'}
        caretHidden={true}
        editable={false} 
        selectTextOnFocus={false} 
  
        containerStyles={{
          borderWidth: 0.76,
          paddingHorizontal: 8,
          bottom:-3,
          textAlign:"right",
          borderColor: 'gray',
          borderRadius: 8,
          height:50
        }}
        customLabelStyles={{
          colorFocused: 'black',
          fontSizeFocused: 12,

        }}
        labelStyles={{
          backgroundColor: '#f2f2f2',
          paddingHorizontal: 5,
          marginLeft:215,
         fontFamily: "AJannatLT",
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
          fontFamily: "AJannatLT",
          fontSize: 14,
       color: "#002B3E",
       textAlign:"right",
       fontWeight: "bold",
        }}
        
      
      />
         </View>{/* fifth field*/}


         <TouchableOpacity style={styles.Button} onPress={onSignout}>
          <Text style={styles.ButtonText}>تسجيل الخروج</Text>
        </TouchableOpacity>
     </View>{/* Gather all floating */}
     {NavigationBar({navigation, ScreenName:'profile'})}
      <StatusBar style="auto" />

    </View>//First View


  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#002B3E',
  },
  fields: {

    borderRadius: 39,
    borderColor: "#CCCCCC",
    width: 300,
    height:50,
    position: "absolute",
    justifyContent: "center",
    borderWidth:0.5,
    borderColor:"#6F7C88",


  


  },

  TopView: {

    width: "90%",
    marginLeft: "5%",
    marginTop: "60%",
  },
  Button: {
    width: "100%",
    color: "#002B3E",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop:370,
left:50,

    justifyContent: "center",
    alignItems: "center",
        position: "absolute",
  },
  ButtonText: {
    fontFamily: "AJannatLT",
    fontSize: 18,
    fontWeight: "bold",
    color: "#002B3E",
  },
 
  SVG: {
    alignItems: "center",
    position: "absolute",
  },
 
  containers: {
    alignItems: "flex-start",
    marginTop: "25%",
    marginLeft: "4%",
  },
  roundButton1: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#AEC3D7",
    position: "absolute",
    marginTop: 135,
    marginLeft: 285,
    shadowColor: "rgba(1,0,0, .4)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
});
