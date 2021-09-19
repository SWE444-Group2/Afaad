import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';

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
          // rootRef
          // .child('Admin')
          // .orderByChild('email')
          // .equalTo(email)
          // .once('value')
          // .then(snapshot => {
          // if (snapshot.exists()) {
          //   navigation.navigate('Admin')
          // }
          // else if (!inv){
          //   rootRef
          // .child('Entrepreneur')
          // .orderByChild('email')
          // .equalTo(email)
          // .once('value')
          // .then(snapshot => {
          //   if (snapshot.exists()){
          //     navigation.navigate('Entrepreneur')
          //     ent = true;
          //   }
          //   else if (!ent){
          //     rootRef
          //     .child('Investor')
          //     .orderByChild('email')
          //     .equalTo(email)
          //     .once('value')
          //     .then(snapshot => {
          //       if (snapshot.exists()){
          //         navigation.navigate('Investor')
          //       }
          //     })
              
          //     }
          // })
          // }
         
          // }

          // )
          
          navigation.navigate('welcome')
          
      
      })
        .catch(function (error) {
          // Handle Errors here.
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('one or more fields are missing!');
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.titleText}>Log in page</Text>
        <Input
          label="Email Address"
          disabledInputStyle={{ background: "#ddd" }}
          leftIcon={<Icon name="account-outline" size={20} />}
          placeholder="Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          label="Password"
          disabledInputStyle={{ background: "#ddd" }}
          leftIcon={<Icon name="key" size={20} />}
          placeholder="Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <Button style={styles.button}
          onPress={onLogin}
          title="Log in"
          titleStyle={{ marginHorizontal: 5 }}
        />
        <StatusBar style="auto" />
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
