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
let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();
import { getAuth, updateEmail,reauthenticateWithCredential } from "firebase/auth";


export default function profileInv({ navigation, route }) {

  const [NewFirstName, setNewFirstName] = useState("");;
  const [NuserEmail, setNUserEmail] = useState("");
  const [NuserPhone, setNUserPhone] = useState("");
  const [NuserDecs, setNuserDecs] = useState("");

  const [userEmailInv, setUserEmailInv] = useState("");
  const [userPhoneInv, setUserPhoneInv] = useState("");
  const [userFullName, setFullName] = useState("");
  const [userDecr, setuserDecr] = useState("");

const userID = route.params.userID;

  
    const UserInfoRef = AfaadFirebase.database().ref("Investor/" + userID);
    UserInfoRef.once("value").then(function (snapshot) {
      setFullName(snapshot.child("FullName").val());
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


  const UpdateEmail = async() => { 


  };


  const onSavePress = ({route}) => {
var flag = true;
  
    const UserInfoRef = AfaadFirebase.database().ref(
      "Investor/" + userID);
        
    if (
      NewFirstName == "" & //empty?
      NuserEmail == "" &
      NuserPhone == "" &
      NuserDecs == ""
  
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
      FullName: NewFirstName,
    }
      );

  }

  if(NuserEmail!=""){

    if (IsValidEmail(NuserEmail) == false) {
      Alert.alert(
        "تنبيه",
        " الإيميل المدخل غير صحيح ",

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
    if (NuserEmail == userEmailInv) {

      Alert.alert(
        "تنبيه",
        "الرجاء ادخال بريد الكتروني مختلف ",
        [
          {
            text: "حسناً",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
     }

    AfaadFirebase.auth().currentUser.updateEmail(NuserEmail).then(()=>{
      console.log("the console reach here")
      UserInfoRef.update({
        email: NuserEmail})
    })
       
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              Alert.alert(
                "تنبيه",
                "الأيميل المدخل غير صالح",
    
                [
                  {
                    text: "حسناً",
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
                 
                  },
                ]
              );
              break;
          
      
        }
       
        });



    
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

  if(NuserDecs!=""){  
  if (NuserDecs.replace(/\s+/g, '').length>250 || !NuserDecs.replace(/\s+/g, '').length || NuserDecs.replace(/\s+/g, '').length < 10) {
    Alert.alert(
      "تنبيه",
      "حقل وصف المستثمر يجب الا يقل عن ١٠ ولا يتجاوز ٢٥٠ حرف",

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
    Describetion: NuserDecs,
  }
    );
  
  }

  Alert.alert(
    "رائع",
    "تم تحديث بياناتك",

    [
      {
        text: " حسنًا",
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

     <View style={{paddingTop:"25%"}} >
     <TouchableOpacity style={styles.Button2} onPress={onSavePress}>
          <Text style={styles.ButtonText2}>تحديث المعلومات الشخصية</Text>
        </TouchableOpacity>
        </View>
     
</View>  

<View style={{ paddingRight:50,paddingLeft:50,marginTop:60}}>

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
        marginLeft:180,
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
         marginLeft:205,
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
       caretHidden={true}
       staticLabel
       hintTextColor={'black'}
       editable={true} 
  
       onChangeText={(text) => setNuserDecs(text)}
    
       multiline={true}
 
       containerStyles={{
         borderWidth: 0.76,
         
         paddingHorizontal: 8,
         bottom:-8,
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
         paddingHorizontal: 0,
         marginLeft:180,
        fontFamily: "AJannatLT",
       }}
       inputStyles={{
         color: 'black',
         margin: 1,
         paddingHorizontal: 10,
    bottom:5,

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
    width: "70%",
    color: "#002B3E",
    height: 39,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop:20,
    justifyContent: "center",
    alignItems: "center",
left:40,
borderColor: "#CCCCCC",

  },
  Button2: {
    width: "42%",
    color: "#002B3E",
    height: 40,
    backgroundColor: "#CADAEA",
    borderRadius: 20,
right:45,
top:100,
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
