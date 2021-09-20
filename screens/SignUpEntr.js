import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
//import { firebase } from './firebaseConfig'
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";

 //Refrence to Investor object in DB
 const InvestorsAccountsRef= AfaadFirebase.database().ref('Entrepreneur');
 
const auth = AfaadFirebase.auth();

export default function RegistrationScreen({ navigation }) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const IsValidName = (FirstName) => {
    const RegxOfNames = /^[a-zA-Z]+$/;
    return RegxOfNames.test(FirstName);
  };
  const IsValidPass = (password) => {
    const strongPass = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongPass.test(password);
  };
  const IsValidPhone = (phone) => {
    const RegxPhone = /^[0-9]+$/;
    return RegxPhone.test(phone);
  };

  const onRegisterPress = () => {
    if (
      Email == "" && //empty?
      password == "" &&
      confirmPassword == "" &&
      FirstName == "" &&
      LastName == "" &&
      phone == "" &&
      gender == ""
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
          text: "سأعيد المحاولة",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (IsValidName(FirstName) == false) {
      Alert.alert("تنبيه ", "الاسم يجب ان يحتوي على حروف فقط", [
        {
          text: "سإعيد المحاولة",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (IsValidPhone(phone) == false) {
      Alert.alert(
        "تنبيه",
        "يجب ان تحتوي رقم الهاتف على ارقام فقط",

        [
          {
            text: "سأعيد المحاولة",
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
        " يجب ان تحتوي كلمة السر على ٨ حروف على الاقل وارقام ورموز",

        [
          {
            text: "سأعيد المحاولة",
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
        "يجب ان تحتوي رقم الهاتف على ارقام فقط",

        [
          {
            text: "سأعيد المحاولة",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    } else {
      auth.createUserWithEmailAndPassword(Email, password).then(() => {
        //Redirect
        navigation.navigate("welcome");
      }); // Close of then fun

      /*AfaadFirebase.auth()
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
            }); //Set
        }); //then;*/
        auth.createUserWithEmailAndPassword(Email, password)
        .then(() => {//success login
          navigation.navigate('welcome')
          const addData={
            FirstName,
            LastName,
            age,
            gender,
             phone,
              email,
              password,
              type:"Entrepreneur",
          }
          InvestorsAccountsRef.push(addData);
        })
        .catch(function (error) {
          // Handle Errors here.

        });
    }

  };
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
          
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          
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
}
