import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput,View , Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' ;
import SvgUri from "expo-svg-uri";




export default function contactForm({ navigation }) {

  const [messageTitle, setMessageTitle] = useState('') ;
  const [contactEmail, setContactEmail] = useState('') ;
  const [message, setMessage] = useState('') ;

  const IsValidEmail = (newmail) =>{
    let regOfEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return regOfEmail.test(newmail);
  }
  
  const submit = () => {

    if (contactEmail == "" ||  message == "") {
      Alert.alert("تنبيه ", "جميع الحقول مطلوبة", [
        {
          text: "حسناً",
          style: "cancel",
        },
      ]);

      return
    } 
    if (!IsValidEmail(contactEmail)) {
      Alert.alert(
        "تنبيه",
        " الإيميل المدخل غير صحيح ",
        [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]
      );
      return;
    }

    if(messageTitle.replace(/\s+/g,'').length > 30 || messageTitle.replace(/\s+/g,'').length < 3){
      Alert.alert("تنبيه", "عنوان الرسالة يجب ألا يقل عن ٣ أحرف وألا يتجاوز ٣٠ حرف ", [
        {
          text: "حسنًا",
          style: "cancel",
        },
      ]);
      return
    }
    if(message.replace(/\s+/g,'').length > 250){
      Alert.alert("تنبيه", "حقل وصف المشروع يجب ألا يتجاوز ٢٥٠ حرف ", [
        {
          text: "حسنًا",
          style: "cancel",
        },
      ]);
      return
    }

    const messagesReference = AfaadFirebase.database().ref('ContactMessages');

    const messageDetails = {
      messageTitle,
      contactEmail,
      message
  };
  messagesReference.push(messageDetails).then((dataRef) => {
    if (dataRef) {
      Alert.alert("نجاح", "تمت إرسال رسالتك بنجاح، سنتواصل معك فورًا لمساعدتك ", [
        {
          text: "حسنًا",
          onPress: () => {
            navigation.pop()
          },
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("تنبيه", "حدث خطأ ما، حاول مرة أخرى", [
        {
          text: "حسنًا",
          style: "cancel",
        },
      ]);
    }

  });


  }
    return(
<KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>

          <View style={styles.SVG}>
            <SvgUri  source={require('../assets/images/Frame.svg')} /> 
          </View>
            <Text style={styles.title}>
              استمارة التواصل
            </Text>
            
            <View style={{backgroundColor:"white", paddingHorizontal: 24, marginTop: 60}}>

            <Text style={styles.warning}>
              *جميـع الحقول مطلوبـــة
            </Text>

            <Text style={styles.labelText}>عنوان رسالتك<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={messageTitle}
              onChangeText={(text) => setMessageTitle(text)}
            />

            <Text style={styles.labelText}>البريد الإلكتروني للتواصل<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={contactEmail}
              onChangeText={(text) => setContactEmail(text)}
            />

            <Text style={styles.labelText}>رسالتك<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={[styles.input, { height: 150 }]}
              placeholder="(حد أقصى:٢٥٠ حرف)"
              underlineColorAndroid="transparent"
              multiline={true}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />

            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
            <Button buttonStyle={[styles.button, {backgroundColor: 'grey'}]}
              onPress={() => navigation.pop()}
              title="إلغاء"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />
            <Button buttonStyle={styles.button}
              onPress={submit}
              title="إرسال"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />
            </View>

</View>
            <StatusBar style="auto" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
      },
    inner: {
        justifyContent: "space-around",
        paddingBottom: 40
    },
    button: {
      width: 150,
      margin: 10,
      marginLeft:'auto',
      marginRight:'auto',

    },
    labelText: {
      fontSize: 16,
      fontFamily: 'AJannatLTBold',
      fontWeight: 'bold',
      textAlign: 'right',
      color: '#86939e',
      marginTop: 10,
    },
    warning:{
      fontSize: 14,
      textAlign: 'right',
      color:"#9a2222",    
    },
    input: {
      height: 48,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "rgba(124, 152, 179, 0.1)",
      marginBottom: 10,
      paddingRight: 15,
      textAlign: 'right',
      fontFamily: 'AJannatLT',
    },
    button: {
      width: 150,
      height: 52,
      borderRadius: 6,
      marginVertical: 10,
      alignSelf: 'center',
      backgroundColor: '#022B3A',
    },
    title: {
      fontFamily: 'AJannatLTBold',
      fontSize:40,
      fontWeight:'bold',
      textAlign: 'right',
      color:'white' ,
      paddingTop: 55,
      paddingRight:20,
    },
    SVG:{
      alignItems: "center",
      position: 'absolute',
    
    },
    
  });