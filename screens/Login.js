import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';


const auth = AfaadFirebase.auth();
const rootRef = AfaadFirebase.database().ref()

export default function Login({ navigation }) {

  //fields value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.push('SignupOption');
    };

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

                     if(snapshot.child("Verified").val()=='Rejected'){
                      if(userType=='Investor'){
                        Alert.alert(
                          "تنبيه!",
                          "لقد تم رفض حسابك لعدم توافي الشروط",
                          [
                            { text: "إلغاء"}
                          ]
                        );
                      }                 
                    }

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
            <View style={[TitleStyles.square, { padding: 15, alignItems: 'center', marginTop: '20%', height: 300, alignItems:'flex-end' }]}>

              <Text style={[styles.LabelStyle, {}]}>عنوان البريد الإلكتروني</Text>
              <TextInput
                style={styles.input}
                placeholder="ادخل عنوان بريدك الإلكتروني"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                textContentType='emailAddress'
                clearButtonMode='while-editing'
              />

              <Text style={[styles.LabelStyle, {}]}>كلمة السر</Text>
              <TextInput
                style={styles.input}
                placeholder="ادخل كلمة السر"
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                textContentType='password'
                clearButtonMode='while-editing'
              />

              <Text style={styles.footerText}>
                هل أنت مستخدم جديد؟{" "}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  إنشاء حساب
                </Text>
              </Text>

            </View>
            <Button buttonStyle={styles.button}
              onPress={onLogin}
              title="تسجيل دخول"
              titleStyle={{ fontFamily: 'AJannatLTBold', fontSize: 18 }}
            />

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#022B3A',
  },
  LabelStyle: {
    fontFamily: 'AJannatLTBold',
    color: '#022B3A',
    fontSize: 20,
  },
  input: {
    height: 48,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 10,
    paddingRight: 15,
    textAlign: 'right',
    fontFamily: 'AJannatLT',
    width: '100%'
  },
  footerText: {
    marginTop: 20,
    alignContent: 'center',
    fontSize: 16,
    color: "#2e2e2d",
    fontFamily: 'AJannatLT',
  },
  footerLink: {
    color: "#7C98B3",
    fontFamily: 'AJannatLTBold',
    fontWeight: "bold",
    fontSize: 16,
  },
});
