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

export default function RegistrationScreen({ navigation }) {
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [Describtion, setDescribtion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const IsValidName = (FullName) => {
    const RegxOfNames = /^[a-zA-Z]+$/;
    return RegxOfNames.test(FullName);
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
        FullName == "" &&
        phone == "" &&
        Describtion == ""
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
    if (IsValidName(FullName) == false) {
      Alert.alert("تنبيه ", "الاسم الكامل يجب ان يحتوي على حروف فقط", [
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
          .ref("Investor/" + response.user.uid)
          .set({
            FullName: FullName,
            Password: password,
            phone: phone,
            email: Email,
            Describetion:Describtion,
            type: "Investor",
            Varified:"Pending",
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
          placeholder="الأسم الكامل"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={FullName}
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
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="تأكيد كلمة المرور"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
        />
           <TextInput
          style={styles.dec}
          placeholder="وصف المستثمر او وصف الشركة المستثمرة"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDescribtion(text)}
          value={Describtion}
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
