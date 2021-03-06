import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Alert,Image,TouchableOpacity} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';

import TextLogo from '../assets/images/AfaadLogo.jpeg';


const auth = AfaadFirebase.auth();

export default function ResetPass({ navigation }) {

  //fields value
  const [email, setEmail] = useState('');

  //when submit button is pressed perform this
  const onSubmit = () => {
    if (email !== ""){
      AfaadFirebase
          .auth()
  
          .sendPasswordResetEmail(email)
  
          .then(function () {
            Alert.alert('تنبيه', 'تم إرسال رابط إعادة تعيين كلمة المرور، يرجى التحقق من بريدك الإلكتروني', [
              {
                text: "حسنًا",
                style: "cancel",
              },
            ])
          })
  
          .catch(function(error) {
            // Error occurred. Inspect error.code.
            if(error.code == 'auth/invalid-email'){
              Alert.alert('تنبيه', 'الرجاء إدخال البريد الإلكتروني بالشكل الصحيح ', [
                {
                  text: "حسنًا",
                  style: "cancel",
                },
              ])
            }

            if(error.code == 'auth/user-not-found'){
              Alert.alert('تنبيه', 'لا يوجد مستخدم بهذا البريد الإلكتروني', [
                {
                  text: "حسنًا",
                  style: "cancel",
                },
              ])
            }
          });

    } else {
        Alert.alert('تنبيه', 'الرجاء تعبئة البريد الإلكتروني', [
            {
              text: "حسنًا",
              style: "cancel",
            },
          ])
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.mainView}>

          <View style={styles.TopView}>
                    <Image source={TextLogo} style={styles.image}/>
          </View>

            <View style={styles.BottomView}>

            <Text style={styles.Heading}>  إعادة تعيين كلمة المرور </Text>
            <Text style={styles.inform}>يرجى إعادة تعيين كلمة المرور عن طريق إدخال بريدك الإلكتروني أدناه. سيتم إرسال رسالة إلى بريدك الإلكتروني تحتوي على رابط إعادة تعيين كلمة المرور.</Text>

            <View style={styles.FormView}>
   
              <TextInput
                style={styles.TextInput}
                placeholder=" عنوان بريدك الإلكتروني"
                placeholderTextColor={"#fff"} 
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                textContentType='emailAddress'
                clearButtonMode='while-editing'
                color="balck"
              />

    
            <TouchableOpacity  style={styles.Button} onPress={onSubmit}>
                     <Text style={styles.ButtonText} >إرسال</Text>
            </TouchableOpacity>

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
    backgroundColor: '#7C98B3',

  },
  ///////// NEW DESIGN ///////////
  mainView:{
     //marginTop:40,
     flex:1,
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fff',
     
   },
   TopView:{
     width:"100%",
     height:"30%",
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
      color:"#fff",
      fontFamily: 'AJannatLTBold',
      fontSize:33,
      fontWeight:'bold',
      textAlign: 'center',
      marginRight:30,
      margin:30,
      marginTop:30

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

   FormView:{
       width:'100%',
       display:'flex',
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center',
       marginTop:-12,
     
   },

   Button:{
     width:"90%",
     color:"#002B3E",
     height:52,
     backgroundColor:"#fff",
     borderRadius:10,
     marginTop:20,
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
 

   },
   ButtonText:{
     fontFamily: 'AJannatLT',
     fontSize:18,
     fontWeight:'bold',
     color:"#002B3E",


   },

   TextButton:{
       width:'100%',
       display:'flex',
      alignItems:'center',
      marginTop:10,
      fontWeight:'bold',


   },

   SignUpText:{
       color:"#002B3E",
       fontSize:14,
      // fontWeight:'bold',
   },

   inform:{
    color:"#002B3E",
    fontSize:12.5,
   fontWeight:'100',
   marginTop:-30,
   paddingRight:10,
   marginBottom:20,
   textAlign:'right'
   }
});

