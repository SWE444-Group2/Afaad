import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AfaadFirebase from "./firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import "firebase/auth";
import "firebase/database";
import SvgUri from "expo-svg-uri";
import { NavigationBar } from "./NavigationBar";
//import  {shape}  from '../assets/images/shape.svg';
import UploadImage from "./UploadImage";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Icon from 'react-native-vector-icons/MaterialIcons' ;
let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function Profile({ navigation, route }) {
  const [userLastName, setLastName] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");



  const [NewFirstName, setNewFirstName] = useState("");
  const [NewLastName, setNewLastName] = useState("");
  const [NuserEmail, setNUserEmail] = useState("");
  const [NuserPhone, setNUserPhone] = useState("");
 

  const userType = route.params.userType;
  const userID = route.params.userID;

    
    const UserInfoRefEntr = AfaadFirebase.database().ref(
      "Entrepreneur/" + userID
    );
    UserInfoRefEntr.once("value").then(function (snapshot) {
      setFirstName(snapshot.child("FirstName").val());
      setLastName(snapshot.child("Lastname").val());
      setUserEmail(snapshot.child("email").val());
      setUserPhone(snapshot.child("phone").val());
    });
  

  //signout function
  const onSignout = () => {
    auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainScreen" }],
    });
  };



 
  const IsValidName = (NewName) => {
  const RegxOfNames = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\s]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/;
  return RegxOfNames.test(NewName);
  };
  const IsValidEmail = (newmail) =>{
    let regOfEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return regOfEmail.test(newmail);
  }

  const IsValidPhone = (NuserPhone) => {
    const RegxPhone = /^[0-9]*$/;
    return RegxPhone.test(NuserPhone);
  };

  const IsValidPhoneStart = (NuserPhone) => {
    var regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return regex.test(NuserPhone);
  };

  const onSavePress = () => {

    const UserInfoRefEntr = AfaadFirebase.database().ref(
      "Entrepreneur/" + userID);
      
    if (
      NewFirstName == "" & //empty?
      NewLastName == "" &
      NuserEmail == "" &
      NuserPhone == "" 
     
    ) {
      Alert.alert("?????????? ", "?????????? ???? ?????? ?????????? ?????????????? ??????????    ", [
        {
          text: "??????????",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);

      return;
    }    
  if(NewFirstName!=""){
 
    if (IsValidName(NewFirstName) == false ||!NewFirstName.replace(/\s/g, '').length) {
      Alert.alert("?????????? ", "?????????? ?????? ?????? ???? ?????????? ?????? ???????? ??????", [
        {
          text: "??????????",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    
    if (NewFirstName.replace(/\s+/g, '').length > 20 || NewFirstName.replace(/\s+/g, '').length < 2) {
      Alert.alert(
        "??????????",
        "?????? ?????????? ?????????? ?????? ???? ?????????? ???? ?????????? ?????? ?????????? ?????? ???? ?????? ",

        [
          {
            text: " ??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    UserInfoRefEntr.update({
      FirstName: NewFirstName,
    }
      ).then(() => navigation.navigate('profile',{userType: userType,userID:userID}));

  }
    if(NewLastName!=""){
    if (NewLastName.replace(/\s+/g, '').length > 20 || NewLastName.replace(/\s+/g, '').length < 2 ) {
      Alert.alert(
        "??????????",
        "?????? ?????????? ???????????? ?????? ???? ?????????? ???? ?????????? ?????? ?????????? ?????? ???? ?????? ",

        [
          {
            text: " ??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (IsValidName(NewLastName) == false ||!NewLastName.replace(/\s/g, '').length) {
      Alert.alert("?????????? ", "?????????? ?????? ???? ?????????? ?????? ???????? ??????", [
        {
          text: "??????????",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    UserInfoRefEntr.update({
      Lastname: NewLastName,
    }
      ).then(() => navigation.navigate('profile',{userType: userType,userID:userID}));

  }


  if(NuserPhone!=""){
    if (IsValidPhone(NuserPhone) == false) {
      Alert.alert(
        "??????????",
        " ?????? ???? ???????? ?????? ???????????? ???? ?????????? ???????????????? ?????? ",

        [
          {
            text: "??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (IsValidPhoneStart(NuserPhone) == false) {
      Alert.alert(
        "??????????",
        " ?????? ???? ???????? ?????????? ???? 05 ???????????? 8 ?????????? ??????",

        [
          {
            text: "??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
  

  UserInfoRefEntr.update({
    phone: NuserPhone,
  }
    ).then(() => navigation.navigate('profile',{userType: userType,userID:userID}));
  }


  if(NuserEmail!=""){

    if (IsValidEmail(NuserEmail) == false) {
      Alert.alert(
        "??????????",
        " ?????????????? ???????????? ?????? ???????? ",

        [
          {
            text: "??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
  
    if (NuserEmail == userEmail) {

      Alert.alert(
        "??????????",
        "???????????? ?????????? ???????? ???????????????? ?????????? ",
        [
          {
            text: "??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
     }

    AfaadFirebase.auth().currentUser.updateEmail(NuserEmail).then(()=>{
      console.log("the console reach here")
      UserInfoRefEntr.update({
        email: NuserEmail}).then(() => navigation.navigate('profile',{userType: userType,userID:userID}))
    })
       
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              Alert.alert(
                "??????????",
                "?????????????? ???????????? ?????? ????????",
    
                [
                  {
                    text: "??????????",
                  },
                ]
              );
              break;
           
            case "auth/email-already-in-use":
              Alert.alert(
                "??????????",
                "???????????? ???????????????????? ???????? ???? ??????",
    
      
                [
                  {
                    text: "??????????",
                 
                  },
                ]
              );
              break;
          
      
        }
       
        });
      }
      Alert.alert(
        "????????",
        "???? ?????????? ??????????????",
    
        [
          {
            text: " ??????????",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );

}
  return (
    
    <View style={{flex:1, paddingBottom:70}}>

    <KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View>
    
    <View style={styles.SVG}>
    <SvgUri source={require('../assets/images/shapes.svg')} /> 
    </View>
    
    <View style={styles.containers}>
      <UploadImage/>
    </View>



{/*
    <TouchableOpacity
   style={styles.roundButton1}>
     <Icon name="pencil" style={{ marginLeft:'25%' , marginTop:16} } size={30} color={"#fff"}/> 
 </TouchableOpacity>  */}

 

<View>

<View style={{marginTop:"23%"}} >

<TouchableOpacity style={styles.Button2} onPress={onSavePress}>
          <Text style={styles.ButtonText2}>?????????? ?????????????????? ??????????????</Text>
        </TouchableOpacity>
        </View>
</View>

<View style={{ padding: 50, marginTop:40, paddingBottom: 0}}>
    
<FloatingLabelInput 
       label="?????????? ??????????"
       staticLabel
       value={NewFirstName}
       hintTextColor={'black'}
       editable={true} 
        selectTextOnFocus={true} 
        hint={userFirstName}
        onChangeText={(text) => setNewFirstName(text)}
        caretHidden={false}




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
         paddingHorizontal:8,
        marginLeft:200,
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
       label="?????????? ????????????"
       value={NewLastName}
       staticLabel
       hintTextColor={'black'}
       onChangeText={(text) => setNewLastName(text)}
       hint={userLastName}

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
        marginLeft:200,
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
       label="???????????? ????????????????????"
       hint={userEmail}
       staticLabel
       hintTextColor={'black'}
       onChangeText={(text) => setNUserEmail(text)}
       value={NuserEmail}

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

<FloatingLabelInput style={{zIndex:0}}
       label="?????? ????????????"
       hint={userPhone}
       value={NuserPhone}
       staticLabel
       hintTextColor={'black'}
       editable={true} 
       selectTextOnFocus={true} 
       onChangeText={(text) => setNUserPhone(text)}
  
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
         marginLeft:213,
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
          <Text style={styles.ButtonText}>?????????? ????????????</Text>
        </TouchableOpacity>
        <View style={{ marginTop:20, marginBottom: 30, alignItems: 'center' }}>
              <Text style={styles.contactText}>
                <View>
                  <Icon name='help-outline' size={30} color={"#002B3E"} style={{ marginLeft: 10 }} />
                </View>
                ???? ?????????? ?????? ?????????????? <Text style={[styles.contactText, { fontFamily: 'AJannatLTBold', textDecorationLine: "underline" }]} onPress={() => navigation.navigate('contactForm')}>
                  ?????????? ????????
                </Text>
              </Text>
            </View>
</View>
  


</View>

</TouchableWithoutFeedback>
</KeyboardAwareScrollView>

{NavigationBar({navigation, ScreenName:'profile'})}
<StatusBar style="auto" />

</View>
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
    marginTop:30,
    justifyContent: "center",
    alignItems: "center",
  },
  Button2: {
    width: "40%",
    color: "#002B3E",
    height: 40,
    backgroundColor: "#CADAEA",
    borderRadius: 10,

right:50,

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
  ButtonText2: {
    fontFamily: "AJannatLT",
    fontSize: 13.5,
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
    marginLeft: "5%",
  },
  roundButton1: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#AEC3D7",
    position: "absolute",
    marginTop: 135,
    marginLeft: 280,
    shadowColor: "rgba(1,0,0, .4)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
  contactText: {
    color: "#002B3E",
    fontFamily: "AJannatLT",
    fontSize: 16,   
    marginBottom: 6
  },
});