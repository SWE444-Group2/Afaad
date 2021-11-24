import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import styles from "./styles";
//import { firebase } from './firebaseConfig'
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TipProvider from "react-native-tip";

import { Tip } from "react-native-tip";
//Refrence to Investor object in DB
const InvestorsAccountsRef = AfaadFirebase.database().ref("Entrepreneur");

const auth = AfaadFirebase.auth();

export default function RegistrationScreen({ navigation }) {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Describtion, setDescribtion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const Message =
    "  يجب ان تحتوي كلمة المرور على : \n٨ خانات على الاقل\n حرف كبير و صغير على الاقل\n رمز خاص على الاقل\n رقم على الاقل";

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const IsValidName = (FullName) => {
    const RegxOfNames = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\s]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/;
    return RegxOfNames.test(FullName);
  };
  const IsValidPass = (password) => {
    const strongPass = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongPass.test(password);
  };
  const IsValidPhone = (phone) => {
    const RegxPhone = /^[0-9]*$/;
    return RegxPhone.test(phone);
  };
  const condtions = () => {
    navigation.navigate("conditionsPage");
  };

  const IsValidPhoneStart = (phone) => {
    var regex = new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return regex.test(phone);
  };

  const onRegisterPress = () => {
    if (
      Email == "" || //empty?
      password == "" ||
      confirmPassword == "" ||
      FullName == "" ||
      phone == "" ||
      Describtion == ""
    ) {
      Alert.alert("تنبيه ", "جميع الحقول مطلوبة لإستكمال التسجيل", [
        {
          text: "حسناً",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);

      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("تنبيه ", ".كلمة المرور وتأكيد كلمة المرور يجب أن تتطابق", [
        {
          text: "حسنًا المحاولة",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (IsValidName(FullName) == false||!FullName.replace(/\s/g, '').length) {
      Alert.alert("تنبيه ", "الاسم الكامل يجب ان يحتوي على حروف فقط", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (FullName.replace(/\s+/g, '').length > 30 || FullName.replace(/\s+/g, '').length < 4 ){
      Alert.alert(
        "تنبيه",
        " اسم المستخدم يجب ان لايقل عن ٤ احرف ولا يتجاوز ٣٠ حرف",

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
  
    if (IsValidPhone(phone) == false) {
      Alert.alert(
        "تنبيه",
        "يجب ان تحتوي رقم الهاتف على ارقام إنجليزية فقط",

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
    if (IsValidPhoneStart(phone) == false) {
      Alert.alert(
        "تنبيه",
        " يجب ان يبدأ الرقم بمفتاح الدولة السعودي ",

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
    if (IsValidPass(password) == false) {
      Alert.alert(
        "كلمة السر ضعيفة ",
        "كلمة السر لا تستوفي الشروط المطلوبة",

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
    if (Describtion.replace(/\s+/g, '').length>250 || !Describtion.replace(/\s+/g, '').length || Describtion.replace(/\s+/g, '').length < 10) {
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
    AfaadFirebase.auth()
      .createUserWithEmailAndPassword(Email, password)
      .then((response) => {
        AfaadFirebase.database()
          .ref("Investor/" + response.user.uid)
          .set({
            FullName: FullName,
            phone: phone,
            email: Email,
            Describetion: Describtion,
            Verified: "Pending",
            Token:"not granted",
          }); //Set */
      })
      .then(() => navigation.navigate("PendingPage"))

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
          case "auth/network-request-failed":
            Alert.alert(
              "تنبيه",
              "الرجاء التحقق من الأتصال بالانترنت",

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
            case "auth/phone-number-already-exists":
          Alert.alert(
            "تنبيه",
           "رقم الجوال مسجل من قبل",

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


      
  };
  return (
  

      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >

        <View style={styles.mainView}> 
        {/* 

        <View style={styles.TopView}>
                    <Image source={TextLogo} style={styles.image}/>
        </View>
        
        */}
        
        <Text style={styles.Heading}>  إنشاء حساب مستثمر </Text>
        <ScrollView style={styles.BottomView}>

        
        <Text style={styles.warning}>*جميـع الحقول مطلوبـــة</Text>

        <View style={styles.FormView}>

        
        <TextInput
          style={styles.TextInput}
          placeholder="*الأسم الكامل"
          placeholderTextColor={"#fff"} 
          onChangeText={(text) => setFullName(text)}
          value={FullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          color="black"
        />

        <TextInput
         style={styles.TextInput}
          placeholder="*رقم الجوال : 05xxxxxxxx"
          placeholderTextColor={"#fff"} 
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          color="black"
          keyboardType='numeric'
          
        
        />

        <TextInput
          style={styles.TextInput}
          placeholder="*البريد الالكتروني"
          placeholderTextColor={"#fff"} 
          onChangeText={(text) => setEmail(text)}
          value={Email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          color="black"
        />

<Tip style={{paddingBottom:20,maxWidth:"100%"}}
            title="تنبية"
            body={Message}
        >
          <View style={styles.SectionStyle}>
            <Icon
              style={styles.searchIcon}
              name="alert-circle-outline"
              size={25}
              color={"#fff"}
            />
          
              <TextInput
                style={styles.pass}
                placeholderTextColor={"#fff"} 
                placeholder="*كلمة المرور"
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                secureTextEntry={true}
                color="black"
              />
          
          </View>
        </Tip>

        <TipProvider
          overlayOpacity={0.7}
          titleStyle={{
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 10,
            textAlign: "center",
            flex: 1,
          }}
          bodyStyle={{
            fontSize: 16,
            textAlign: "center",
            fontSize: 13,
          }}
          tipContainerStyle={{
            padding: 12,
            borderRadius: 20,
            maxWidth: 300,
          }}
        />

        <TextInput
         style={styles.TextInput2}
          placeholderTextColor={"#fff"} 
          placeholder="*تأكيد كلمة المرور"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          color="black"
        />
        <TextInput
          style={styles.TextInputDoc}
          placeholder="*وصف المستثمر او وصف الشركة المستثمرة"
          placeholderTextColor={"#fff"} 
          onChangeText={(text) => setDescribtion(text)}
          value={Describtion}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          color="black"
        />



<Text onPress={condtions}  style={styles.condtions}>
          *بالضغط على إنشاء حساب، فإنك توافق {""}
          <Text style={styles.agree}>
            {""}على الشروط {""}وقد قرأت سياسية الإفصاح
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.Button} 
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.ButtonText}>إنشاء حساب </Text>
        </TouchableOpacity>
        <View style={styles.TextButton}>
          <Text style={styles.SignUpText}>
            هل لديك حساب مسبق؟{" "}
            <Text onPress={onFooterLinkPress} style={styles.TextButton}>
              تسجيل دخول
            </Text>
          </Text>
        </View>


                   </View>

               </ScrollView>

        </View>
      </KeyboardAwareScrollView>
     


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#002B3E',

  },

  ///////// NEW DESIGN ///////////
  mainView:{
     //marginTop:100,
     flex:1,
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fff',
     
   },
   TopView:{
     width:"100%",
     height:"20%",
     backgroundColor:'#fff',
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
   
   },
   BottomView:{
     width:"100%",
     height:"70%",
     backgroundColor:'#7C98B3',
     borderTopLeftRadius:30,
     borderTopRightRadius:30,
 
   },
   image:{
       width:"50%",
       resizeMode:'contain',


   },
   Heading:{
    color:"#002B3E",
    fontFamily: 'AJannatLTBold',
    fontSize:20,
    fontWeight:'bold',
    textAlign: 'right',
    marginRight:30,
    margin:15,

   },

   TextInput:{
       width:'90%',
       borderWidth:1,
       borderColor:"#fff",
       height:52,
       borderRadius:10,
       fontFamily: 'AJannatLT',
       fontSize:18,
       textAlign: 'right',
       paddingRight:5,
       marginTop:20,
       color:"#fff",

   },
   TextInput2:{
    width:'90%',
    borderWidth:1,
    borderColor:"#fff",
    height:52,
    borderRadius:10,
    fontFamily: 'AJannatLT',
    fontSize:18,
    textAlign: 'right',
    paddingRight:5,
    marginTop:1,
    color:"#fff",

},

   FormView:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:-10,
     
   },

   Button:{
    width:"90%",
    color:"#002B3E",
    height:52,
    backgroundColor:"#fff",
    borderRadius:10,
    marginTop:-10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
   
 

   },
   ButtonText:{
    fontFamily: 'AJannatLT',
    fontSize:18,
    color:"#002B3E",
    fontWeight:'bold',


   },

   TextButton:{
    width:'100%',
    display:'flex',
   alignItems:'center',
   marginTop:10,
   fontWeight:'bold',
   marginBottom:20,


   },

   SignUpText:{
    color:"#002B3E",
       fontSize:14,
   },

   warning:{
    marginTop:10,
    color:"#7d3d47",
    fontFamily: 'AJannatLTBold',
    fontSize:15,
    fontWeight:'bold',
    textAlign: 'right',
    marginRight: 30,
   },
   TextInputDoc:{
    height: 130,
    overflow: "hidden",
    marginLeft: 30,
    marginRight: 30,
    paddingRight: 10,
    paddingBottom:90, 
    width:'90%',
    borderWidth:1,
    borderColor:"#fff",
    borderRadius:10,
    fontFamily: 'AJannatLT',
    fontSize:18,
    textAlign: 'right',
    paddingRight:5,
    marginTop:20,
    color:"#fff",
   },

   pass:{
      //height: 48,
      //borderRadius: 5,
      // paddingRight: 15,
      //textAlign: 'right',
       flex: 1 ,
      //width:255,
      // width:'90%',
       //borderWidth:1,
       borderColor:"#fff",
       height:52,
       borderRadius:10,
       fontFamily: 'AJannatLT',
       fontSize:18,
       textAlign: 'right',
       paddingRight:5,
      // marginTop:20,
       color:"#fff",
    },

    condtions:{
      height: 48,
      borderRadius: 5,
      overflow: "hidden",
      marginTop: 5,
      marginBottom: 10,
      marginLeft: 30,
      marginRight:10,
      paddingRight: 10,
      textAlign: 'right',
      fontSize: 14,
      color:"#002B3E",
      
    },
    agree:{
      color:"#002B3E",
      fontWeight: "bold",
      fontSize: 12,
      textDecorationLine:'underline',
    },
    searchIcon:{
      
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 30,
      width:"auto"
    },
    SectionStyle: {
      flexDirection: 'row',
      //backgroundColor: '#fff',
      //borderRadius: 5,
      //marginTop: 10,
      //marginBottom: 10,
       marginLeft: 20,
      marginRight:20,

       width:'90%',
       borderWidth:1,
       borderColor:"#fff",
       height:52,
       borderRadius:10,
       fontFamily: 'AJannatLT',
       fontSize:18,
       textAlign: 'right',
       paddingRight:5,
       marginTop:20,
       color:"#fff",

    
    },


});