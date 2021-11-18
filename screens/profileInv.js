import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
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
let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();
import { getAuth, updateEmail,reauthenticateWithCredential } from "firebase/auth";


export default function Profile({ navigation, route }) {

  const [NewFirstName, setNewFirstName] = useState("");
  const [NewLastName, setNewLastName] = useState("");
  const [NuserEmail, setNUserEmail] = useState("");
  const [NuserPhone, setNUserPhone] = useState("");
  const [NuserDecs, setNuserDecs] = useState("");

  const [userEmailInv, setUserEmailInv] = useState("");
  const [userPhoneInv, setUserPhoneInv] = useState("");
  const [userFullName, setFullName] = useState("");
  const [userDecr, setuserDecr] = useState("");

  const userType = route.params.userType;
  const userID = route.params.userID;

  
    const UserInfoRef = AfaadFirebase.database().ref("Investor/" + userID);
    UserInfoRef.once("value").then(function (snapshot) {
      setFullName(snapshot.child("FullName").val());
      setLastName(snapshot.child("Lastname").val());
      setUserEmailInv(snapshot.child("email").val());
      setUserPhoneInv(snapshot.child("phone").val());
      setuserDecr(snapshot.child("Describetion").val());
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

  const IsValidPhone = (NuserPhone) => {
    const RegxPhone = /^[0-9]*$/;
    return RegxPhone.test(NuserPhone);
  };

  const IsValidPhoneStart = (NuserPhone) => {
    var regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return regex.test(NuserPhone);
  };

  const onSavePress = () => {

    const UserInfoRef = AfaadFirebase.database().ref(
      "Entrepreneur/" + userID);

      if(NuserEmail!=""){
        UserInfoRef.update({
          email: NuserEmail
        }
          );
        AfaadFirebase.auth().currentUser.updateEmail(NuserEmail)
          .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert(
            "تنبيه",
            "الأيميل المدخل غير صالح",

            [
              {
                text: "حسناً",
                onPress: () => console.log("yes Pressed"),
                style: "cancel",
              },
            ]
          );
          break;
       
        case "auth/email-already-in-use":
          Alert.alert(
            "تنبيه",
            "البريد الألكتروني مسجل من قبل",

  
            [
              {
                text: "حسناً",
                onPress: () => console.log("yes Pressed"),
                style: "cancel",
              },
            ]
          );
          break;
      
  
    }
   
    });
}
      
    if (
      NewFirstName == "" & //empty?
      NewLastName == "" &
      NuserEmail == "" &
      NuserPhone == "" &
      Ngennder == "" 
    ) {
      Alert.alert("تنبيه ", "لطفاً لم يتم اضافة معلومات جديدة    ", [
        {
          text: "حسناً",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);

      return;
    }    
  if(NewFirstName!=""){
 
    if (IsValidName(NewFirstName) == false ||!NewFirstName.replace(/\s/g, '').length) {
      Alert.alert("تنبيه ", "الاسم هنا يجب ان يحتوي على حروف فقط", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    
    if (NewFirstName.replace(/\s+/g, '').length > 20 || NewFirstName.replace(/\s+/g, '').length < 2) {
      Alert.alert(
        "تنبيه",
        "حقل الاسم الاول يجب ان يتكون من حرفين على الاقل حتى ٢٠ حرف ",

        [
          {
            text: " حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    UserInfoRef.update({
      FirstName: NewFirstName,
    }
      );

  }
    if(NewLastName!=""){
    if (NewLastName.replace(/\s+/g, '').length > 20 || NewLastName.replace(/\s+/g, '').length < 2 ) {
      Alert.alert(
        "تنبيه",
        "حقل الاسم الاخير يجب ان يتكون من حرفين على الاقل حتى ٢٠ حرف ",

        [
          {
            text: " حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (IsValidName(NewLastName) == false ||!NewLastName.replace(/\s/g, '').length) {
      Alert.alert("تنبيه ", "الاسم يجب ان يحتوي على حروف فقط", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    UserInfoRef.update({
      Lastname: NewLastName,
    }
      );

  }


  if(NuserPhone!=""){
    if (IsValidPhone(NuserPhone) == false) {
      Alert.alert(
        "تنبيه",
        " يجب ان يكون رقم الهاتف من أرقام إنجليزية فقط ",

        [
          {
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (IsValidPhoneStart(NuserPhone) == false) {
      Alert.alert(
        "تنبيه",
        " يجب أن يبدأ الرقم بـ 05 ويتبعه 8 خانات فقط",

        [
          {
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
  

  UserInfoRef.update({
    phone: NuserPhone,
  }
    );
  }


  Alert.alert("تنبيه ","تم تحديث البيانات بنجاح", [
    {
      text: "حسنًا",
      onPress: () => console.log("yes Pressed"),
      style: "cancel",
    },
  ]);
}


  return (

    
    <View style={{ height:"100%"}}>
      
    <View style={styles.SVG}>
  <SvgUri  source={require('../assets/images/shapes.svg')} /> 
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
          <Text style={styles.ButtonText2}>تحديث المعلومات الشخصية</Text>
        </TouchableOpacity>
        </View>
        </View>


<View style={{ padding: 50,marginTop:40}}>

<FloatingLabelInput 
       label="الاسم"
       staticLabel
       value={NewFirstName}
       hintTextColor={'black'}
       editable={true} 
        selectTextOnFocus={true} 
        hint={userFullName}
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
         paddingHorizontal: 8,
        marginLeft:230,
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
    hint={userEmailInv}
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

<FloatingLabelInput 
        label="رقم الجوال"
        hint={userPhoneInv}
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
        <View style={{marginTop:25}} >

<FloatingLabelInput 
       label="وصف المستثمر"
       value={NuserDecs}
       hint={userDecr}
       staticLabel
       hintTextColor={'black'}
       editable={true} 
       selectTextOnFocus={true} 
       onChangeText={(text) => setNuserDecs(text)}
  
       multiline={true}
 
       containerStyles={{
         borderWidth: 0.76,
         paddingHorizontal: 8,
         bottom:-11,
         textAlign:"right",
         borderColor: 'gray',
         borderRadius: 8,
         height:120
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
    bottom:35,
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
        



  </View>

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
    marginTop:420,
left:50,

    justifyContent: "center",
    alignItems: "center",
        position: "absolute",
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
});
