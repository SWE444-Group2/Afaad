import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';


const auth = AfaadFirebase.auth();
const rootRef = AfaadFirebase.database().ref()
var inv = false;
var ent = false;

//keyboard dismiss when click anywhere on the screen
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Login({ navigation }) {

  //fields value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //when login button is pressed perform this
  const onLogin = () => {
    if (email !== '' && password !== '') { //all fields are not empty
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {//success login
          let user = AfaadFirebase.auth().currentUser ;
          let userID, userType ;
          if(user){
            userID = user.uid ;
            console.log(userID)
            AfaadFirebase.database().ref('/Admin/'+userID).on('value', (snapshot) => {
              if (snapshot.exists()) {
                userType = 'Admin';
                console.log('Found admin')
                navigation.navigate('Admin')
              }})
            AfaadFirebase.database().ref('/Entrepreneur/'+userID).on('value', (snapshot) => {
              if (snapshot.exists()) {
                userType = 'Entrepreneur' ;
                console.log('Found Entrepreneur')
                navigation.navigate('Entrepreneur')
              }
            })
            AfaadFirebase.database().ref('/Investor/'+userID).on('value', (snapshot) => {
              if (snapshot.exists()) {
                userType = 'Investor' ;
                console.log('Found Investor')
                navigation.navigate('Investor')
              }
            })
          }
                    
      
      })
        .catch(function (error) {
          // Handle Errors here.
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      Alert.alert('تنبيه', 'الرجاء تعبئة كل الفراغات', [
        {
          text: "حسنًا",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={TitleStyles.sectionTitle}>صفحة تسجيل الدخول</Text>
        <Input style = {{ textAlign: 'right', fontFamily: 'AJannatLT' }}
          labelStyle={{ textAlign: 'right', fontFamily: 'AJannatLTBold' }}
          label="البريد الإلكتروني"
          rightIcon={<Icon name="account-outline" size={20} />}
          placeholder="ادخل عنوانك الإلكتروني"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input style={{ textAlign: 'right', fontFamily: 'AJannatLT' }}
          labelStyle={{textAlign: 'right', fontFamily: 'AJannatLTBold'}}
          label="كلمة السر"
          rightIcon={<Icon name="key" size={20} />}
          placeholder="ادخل كلمة السر"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <Button style={styles.button}
          onPress={onLogin}
          title="تسجيل الدخول"
          titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT'}}
        />
        <StatusBar style="auto" />
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    margin: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },
});
