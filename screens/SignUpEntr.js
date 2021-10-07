import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Button,
  Image
} from "react-native";
import TipProvider from "react-native-tip";
import { Tip } from "react-native-tip";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
//import { firebase } from './firebaseConfig'
import AfaadFirebase from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
import DropDownPicker from "react-native-dropdown-picker";
const auth = AfaadFirebase.auth();
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import alert from '../assets/images/alert.png';

//fix VirtualizedLists should never be nested inside plain ScrollViews warnning
DropDownPicker.setListMode("SCROLLVIEW");

import RadioGroup from "react-native-radio-buttons-group";

/*
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
   
}]*/

export default function RegistrationScreen({ navigation }) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const Message = '  يجب ان تحتوي كلمة المرور على : \n٨ خانات على الاقل\n حرف كبير و صغير على الاقل\n رمز خاص على الاقل\n رقم على الاقل';

  const [items, setItems] = useState([
    { label: "أنثـى", value: "انثى" },
    { label: "ذكر", value: "ذكر" },
  ]);
  //const [radioButtons, setRadioButtons] = useState(radioButtonsData)

  /*function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        
        let selectedGender ; 
        for(let radioButton in radioButtons){
          if(radioButtons[radioButton].selected == true){
            selectedGender = radioButtons[radioButton].value ; 
          }
        }
        setGender(selectedGender) ;
    }
*/
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const condtions = () => {
    navigation.navigate("conditionsPage");
  };

  const IsValidName = (FirstName) => {
    const Regx = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\s]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/;
    const RegxOfNames=/^[\u0621-\u064Aa-zA-Z\s]+$/;
    return RegxOfNames.test(FirstName);
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
      FirstName == "" ||
      LastName == "" ||
      phone == "" ||
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
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (IsValidName(FirstName) == false) {
      Alert.alert("تنبيه ", "الاسم يجب ان يحتوي على حروف فقط", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    if (FirstName.length > 20) {
      Alert.alert(
        "تنبيه",
        "حقل الاسم الأول  يجب ان لا يتجاوز ٢٠ حرف",

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
    if (LastName.length > 20) {
      Alert.alert(
        "تنبيه",
        "حقل الاسم الاخير  يجب ان لا يتجاوز ٢٠ حرف",

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
        "يجب ان يحتوي رقم الهاتف على ارقام فقط",

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
    if (IsValidName(LastName) == false) {
      Alert.alert("تنبيه ", "الاسم يجب ان يحتوي على حروف فقط", [
        {
          text: "حسنًا",
          onPress: () => console.log("yes Pressed"),
          style: "cancel",
        },
      ]);
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
            phone: phone,
            email: Email,
          }); //Set */
      })
      .then(() => navigation.navigate("EntrepreneurAndInvestor"))

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
          placeholder="*الاسم الأول"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={FirstName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="*الاسم الأخير"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={LastName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <DropDownPicker
          textStyle={{
            textAlign: "right",
            fontFamily: "AJannatLT",
            fontSize: 14,
            color: "#aaaaaa",
          }}
          containerStyle={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 30,
            marginRight: 30,
            width:"auto"
          }}
          style={{ borderColor: "white", flexDirection: "row-reverse" }}
          open={open}
          value={gender}
          items={items}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setItems}
          placeholder="*الجنـس"
          placeholderTextColor="#aaaaaa"
          onChangeValue={(value) => setGender(value)}
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

        
<Tip 
            title="تنبية"
            body={Message}
        >
          <View style={styles.SectionStyle}>

        <Icon  style={styles.searchIcon} name="alert-circle-outline" size={25} color={"#022B3A"} />
        <View     >
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
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginBottom: 10,
                        textAlign: 'center',
                        flex:1,
                        
                    }}
                    bodyStyle={{
                        fontSize: 16,
                        textAlign: 'center',
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
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <Text onPress={condtions}  style={styles.condtions  }>
          *بالضغط على إنشاء حساب، فإنك توافق {""}
          <Text style={styles.agree}>
            {""}على الشروط {""}وقد قرأت سياسية الإفصاح
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle} >  الحساب</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>

          <Text style={styles.footerText}>
            هل لديك حساب مسبق؟{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              تسجيل الدخول
            </Text>
          </Text>

        </View>
      </KeyboardAwareScrollView>
    
    </View>
  );
}
