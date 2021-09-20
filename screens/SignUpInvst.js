import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
//import { firebase } from './firebaseConfig'
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';

const auth = AfaadFirebase.auth();

export default function RegistrationScreen({navigation}) {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setdescription] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
   const [passwordVisibility, setPasswordVisibility] = useState(true);

   //Refrence to Investor object in DB
   const InvestorsAccountsRef= AfaadFirebase.database().ref('Investor');

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
       
    }
   
  const onRegisterPress = () => {
         {
           
            if (email !== '' && password !== '') {
                   
                 auth.createUserWithEmailAndPassword(email, password)
                  .then((userCredential) => {//success login
                    navigation.navigate('welcome')

                    const addData={
                      FirstName,
                      LastName,
                        email,
                        password,
                        description,
                        Verified: "Pending",
                        type:"investor",
                    }
                    InvestorsAccountsRef.push(addData);
                  })
                  .catch(function (error) {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    alert(errorMessage);
                  });
              } else {
                alert('one or more fields are missing!');
              }
     
         }
          /*firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    FirstName,
                    LastName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('splash', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });*/
    }
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
               
               <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setFirstName(text)}
                  value={FirstName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
        
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setLastName(text)}
                  value={LastName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />

                <TextInput
                  style={styles.input}
                  placeholder="phone number"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                 
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                  <TextInput
                  style={styles.input}
                  placeholder="description"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setdescription(text)}
                  value={description}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
             
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
};

