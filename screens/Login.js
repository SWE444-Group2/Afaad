import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';


const auth = AfaadFirebase.auth();
const rootRef = AfaadFirebase.database().ref()

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
                navigation.navigate('Admin')
              }})
            AfaadFirebase.database().ref('/Entrepreneur/'+userID).on('value', (snapshot) => {
              if (snapshot.exists()) {
                userType = 'Entrepreneur' ;
                navigation.navigate('EntrepreneurAndInvestor')
              }
            })
            AfaadFirebase.database().ref('/Investor/'+userID).on('value', (snapshot) => {
              if (snapshot.exists()) {
                userType = 'Investor' ;
                if(snapshot.child("Verified").val()=='Pending'){
                  navigation.navigate('PendingPage')}

                if(snapshot.child("Verified").val()=='Accepted'){
                  if(userType=='Investor')
                     navigation.navigate('EntrepreneurAndInvestor');}
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
    <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView> 
        <View style={TitleStyles.containerDetails}>
        <View style={[TitleStyles.square, { padding: 10, alignItems: 'center', marginTop:'30%' }]}>
        <Input style={styles.InputStyle}
          labelStyle={styles.LabelStyle}
          label="عنوان البريد الإلكتروني"
          rightIcon={<Icon name="account-outline" size={20} />}
          clearButtonMode="always"
          placeholder="ادخل عنوان بريدك الإلكتروني"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input style={styles.InputStyle}
          labelStyle={styles.LabelStyle}
          label="كلمة السر"
          rightIcon={<Icon name="key" size={20} />}
          clearButtonMode="always"
          placeholder="ادخل كلمة السر"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        </View>
        <Button buttonStyle={styles.button}
          onPress={onLogin}
          title="تسجيل دخول"
          titleStyle={{fontFamily: 'AJannatLTBold', fontSize: 18}}
        />

      </View>
      </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 213,
    height: 52,
    borderRadius: 6,
    marginHorizontal: 'auto',
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#022B3A',
  },
  InputStyle: {
    textAlign: 'right',
    fontFamily: 'AJannatLT',
  },
  LabelStyle: {
    textAlign: 'right',
    fontFamily: 'AJannatLTBold',
    color: '#022B3A',
    fontSize: 20,
  }
});
