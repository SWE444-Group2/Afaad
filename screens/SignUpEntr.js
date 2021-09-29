import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert,StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
//import { firebase } from './firebaseConfig'
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
//Refrence to Investor object in DB
const InvestorsAccountsRef = AfaadFirebase.database().ref("Entrepreneur");

const auth = AfaadFirebase.auth();

import RadioGroup from 'react-native-radio-buttons-group';


const radioButtonsData = [{
    id: 'F', // acts as primary key, should be unique and non-empty string
    label: 'أنثــى',
    value: 'Female',
    color: "#536B78",
}
, {
    id: 'Male',
    label: 'ذكــر',
    value: 'Male',
    color: "#536B78",
   
}]

export default function RegistrationScreen({ navigation }) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

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
    if (age > 120) {
      Alert.alert("تنبيه ", "العمر يجب ان يكون أقل من ١٢٠ سنة ", [
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
    }

    AfaadFirebase.auth()
      .createUserWithEmailAndPassword(Email, password)
      .then((response) => {
        AfaadFirebase.database()
          .ref("Entrepreneur/" + response.user.uid)
          .set({
            
            FirstName: FirstName,
            Lastname: LastName,
            Gender: gender,
            Age: age,
            phone: phone,
            email: Email,
            Password: password,
            type: "Entrepreneur",
          }); //Set */
      })
      .then(() => navigation.navigate("welcome"))

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
                "الرجاد التحقق من الأتصال بالانترنت",
  
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
        }
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          placeholder="الاسم الأول"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={FirstName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="الاسم الأخير"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={LastName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="العمر"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAge(text)}
          value={age}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="رقم الجوال"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

         
        <TextInput
          style={styles.input}
          placeholder="البريد الالكتروني"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={Email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="كلمة المرور"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="تأكيد كلمة المرور"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          secureTextEntry={true}

        />
        <View style={styles.input}>

      <Text style={styles.RadioBtnsTitle}
      
      >الجنـــس</Text>
      
          <RadioGroup  style={styles.RadioBtns}
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            layout='row'
            value={gender}
            onChangeText={(text) => setGender(radioButtonsData)}
        />

        
          

      
    </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>إنشاء الحساب</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            لديك بالفعل حساب مسجل ؟{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              تسجيل الدخول
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
