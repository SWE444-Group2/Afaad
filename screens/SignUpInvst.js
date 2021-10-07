import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
//import { firebase } from './firebaseConfig'
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TipProvider from "react-native-tip";
import { Tip } from "react-native-tip";
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
  const Message =
    "  يجب ان تحتوي كلمة المرور على : \n٨ خانات على الاقل\n حرف كبير و صغير على الاقل\n رمز خاص على الاقل\n رقم على الاقل";

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const IsValidName = (FullName) => {
  const RegxOfNames=/^[\u0621-\u064Aa-zA-Z\s]{30}$/;
    return RegxOfNames.test(FullName);
  };
  const IsValidPass = (password) => {
    const strongPass = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongPass.test(password);
  };
  const IsValidPhone = (phone) => {
    const RegxPhone = /^[0-9\u0660-\u0669]{10}$/;
    return RegxPhone.test(phone);
  };

  const onRegisterPress = () => {
    if (
      Email == "" || //empty?
      password == "" ||
      confirmPassword == "" ||
      FullName == "" ||
      phone == "" ||
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
          text: "حسنًا المحاولة",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (IsValidName(FullName) == false) {
      Alert.alert("تنبيه ", "الاسم الكامل يجب ان يحتوي على حروف فقط", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (FullName.length > 31) {
      Alert.alert(
        "تنبيه",
        "حقل اسم المستخدم يجب ان لا يتجاوز ٣٠ حرف",

        [
          {
            text: " حسنًا",
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
            text: "حسنًا",
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
        "كلمة السر لا تستوفي الشروط المطلوبة",

        [
          {
            text: "حسنًا",
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
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    if (Describtion.length > 250) {
      Alert.alert(
        "تنبيه",
        "حقل وصف المستثمر يجب الا يتجاوز ٢٥٠ حرف",

        [
          {
            text: " حسنًا",
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
            phone: phone,
            email: Email,
            Describetion: Describtion,
            Verified: "Pending",
          }); //Set */
      })
      .then(() => navigation.navigate("PendingPage"))

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
        <Text style={styles.warning}>*جميـع الحقول مطلوبـــة</Text>
        <TextInput
          style={styles.input}
          placeholder="*الأسم الكامل"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={FullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="*رقم الجوال : 05xxxxxxxx"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="*البريد الالكتروني"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={Email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <Tip title="تنبية" body={Message}>
          <View style={styles.SectionStyle}>
            <Icon
              style={styles.searchIcon}
              name="alert-circle-outline"
              size={25}
              color={"#022B3A"}
            />
            <View>
              <TextInput
                style={styles.pass}
                placeholderTextColor="#aaaaaa"
                placeholder="*كلمة المرور"
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>
          </View>
        </Tip>

        <TipProvider
          overlayOpacity={0.7}
          titleStyle={{
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 10,
            textAlign: "center",
            flex: 1,
          }}
          bodyStyle={{
            fontSize: 16,
            textAlign: "center",
            fontSize: 13,
          }}
          tipContainerStyle={{
            padding: 12,
            borderRadius: 20,
            maxWidth: 300,
          }}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="*تأكيد كلمة المرور"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.dec}
          placeholder="*وصف المستثمر او وصف الشركة المستثمرة"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDescribtion(text)}
          value={Describtion}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />


<Text style={styles.condtions}>
          *بالضغط على إنشاء حساب، فإنك توافق {""}
          <Text style={styles.agree}>
            {""}على الشروط {""}وقد قرأت سياسية الإفصاح
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>إنشاء حساب </Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            هل لديك حساب مسبق؟{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              تسجيل دخول
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
