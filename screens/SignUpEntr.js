import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AfaadFirebase from "./firebaseConfig";
import styles from "./styles";
import "firebase/auth";
import "firebase/database";

const auth = AfaadFirebase.auth();
const ENletter = /^[a-zA-Z ]{2,40}$/;

export default function RegistrationScreen({ navigation }) {

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [Email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [passwordVisibility, setPasswordVisibility] = useState(true);

    const onFooterLinkPress = () => {
        navigation.navigate("Login");
      };
    
      const onRegisterPress = () => {

        if (Email == "" && //empty?
        password == "" &&
        confirmPassword ==""&&
        FirstName == ""&&
        LastName =="" &&
        phone == "" &&
        gender == "" ){
        
          Alert.alert(
            "Alert ",
             "miising fileds",
            [
              {
                text: "canel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "ok", onPress: () => console.log("OK Pressed") }
            ]
          );

       return
      } if (password!==confirmPassword){
     Alert.alert(
            "Alert ",
            "كلمة المرور مو متطابقه",
            [
              {
                text: "خلاص",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "اوكي", onPress: () => console.log("OK Pressed") }
            ]
          );
          return

       }
       if (password!==confirmPassword){
        Alert.alert(
               "Alert تنبيه",
               "كلمة المرور مو متطابقه",
               [
                 {
                   text: "خلاص",
                   onPress: () => console.log("Cancel Pressed"),
                   style: "cancel"
                 },
                 { text: "اوكي", onPress: () => console.log("OK Pressed") }
               ]
             );
             return
   
          }

          else {
           auth
            .createUserWithEmailAndPassword(Email, password)
              .then(() => {
                //Redirect
                navigation.navigate("welcome"); } )// Close of then fun
           
          }
 AfaadFirebase.auth()
      .createUserWithEmailAndPassword(Email, password)
      .then((response) => {
        AfaadFirebase.database()
          .ref("Entrepreneur/" + response.user.uid)
          .set({
            Age: age,
            FirstName: FirstName,
            Gender: gender,
            Lastname: LastName,
            Password: password,
            PhoneNum: phone,
            email: Email,
          })//Set
        })//then;


        return (
            <View style={styles.container}>
              <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
              >
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
                  placeholder="Age"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setAge(text)}
                  value={age}
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
                  placeholder="Gender"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setGender(text)}
                  value={gender}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setEmail(text)}
                  value={Email}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                
                  pattern={[
                    '^.{8,}$', // min 8 chars
                    '(?=.*\\d)', // number required
                    '(?=.*[A-Z])', // uppercase letter
                  ]}
                  onValidation={isValid => this.setState({ isValid })}
                />
                <View>
                  <Text style={{ color: isValid && isValid[0] ? 'green' : 'red' }}>
                    Rule 1: min 8 chars
                  </Text>
                  <Text style={{ color: isValid && isValid[1] ? 'green' : 'red' }}>
                    Rule 2: number required
                  </Text>
                  <Text style={{ color: isValid && isValid[2] ? 'green' : 'red' }}>
                    Rule 3: uppercase letter
                  </Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder="Confirm Password"
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onRegisterPress()}
                >
                  <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                  <Text style={styles.footerText}>
                    Already got an account?{" "}
                    <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                      Log in
                    </Text>
                  </Text>
                </View>
              </KeyboardAwareScrollView>
            </View>
          );


      };


};