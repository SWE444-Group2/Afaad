import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';

//fix VirtualizedLists should never be nested inside plain ScrollViews warnning
DropDownPicker.setListMode("SCROLLVIEW");

export default function PublishIdea({ navigation }) {

  const user = AfaadFirebase.auth().currentUser ;

    //fields value
    const [Title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'اعلام ونشر وتوزيع', value: 'اعلام ونشر وتوزيع'},
      {label: 'تجارة', value: 'تجارة'},
      {label: 'ترفيه وفنون', value: 'ترفيه وفنون'},
      {label: 'تعليم', value: 'تعليم'},
      {label: 'تقنية معلومات', value: 'تقنية معلومات'},
      {label: 'زراعة', value: 'زراعة'},
      {label: 'صناعة', value: 'صناعة'},
      {label: 'عقار ومقاولات', value: 'عقار ومقاولات'},
      {label: 'مطاعم ومقاهي', value: 'مطاعم ومقاهي'},
      {label: 'آخرى', value: 'آخرى'}
    ]);
    const [ProductDescription, setProductDescription] = useState('');
    const [costEstimation, setCostEstimation] = useState('');
    const radioButtonsData = [{
      id: '1', 
      label: '١ ألف - ١٠ آلاف',
      value: '١ ألف - ١٠ آلاف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    }, {
      id: '2',
      label: '١٠ آلاف - ٥٠ ألف',
      value: '١٠ آلاف - ٥٠ ألف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    },{
      id: '3',
      label: '٥٠ ألف - ١٠٠ ألف',
      value: '٥٠ ألف - ١٠٠ ألف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    },{
      id: '4',
      label: '١٠٠ ألف - ٥٠٠ ألف',
      value: '١٠٠ ألف - ٥٠٠ ألف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    },{
      id: '5',
      label: '٥٠٠ ألف - ١ مليون',
      value: '٥٠٠ ألف - ١ مليون',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    }]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [investorsSpec, setInvestorsSpec] = useState('');

    function onPressRadioButton(radioButtonsArray) {
      setRadioButtons(radioButtonsArray) ;
      let selectedCost ; 
      for(let radioButton in radioButtons){
        if(radioButtons[radioButton].selected == true){
          selectedCost = radioButtons[radioButton].value ; 
        }
      }
         setCostEstimation(selectedCost) ;
    }

    const IsValidfield= (field) => {
      const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
      return RegxOfNames.test(field);
    };

  
    //when submit button is pressed perform this
    const submit = () => {

      setCategory(categoryValue) ;
      // Checking for empty fields
      if (
        Title == "" || 
        ProductDescription == "" ||
        investorsSpec == "" ||
        costEstimation == '' ||
        categoryValue == null
      ) {
        Alert.alert("تنبيه ", "جميع الحقول مطلوبة", [
          {
            text: "حسناً",
            style: "cancel",
          },
        ]);
  
        return
      } 
      if (IsValidfield(Title) == false) {
        Alert.alert("تنبيه", "حقل \"العنوان\" يجب ان يحتوي على حروف فقط", [
          {
            text: "حسنًا",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]);
        return
      }
      if(ProductDescription.length > 250){
        Alert.alert("تنبيه", "حقل وصف المشروع يجب ألا يتجاوز ٢٥٠ حرف ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
      if(investorsSpec.length > 250){
        Alert.alert("تنبيه", "حقل وصف المستثمرين يجب ألا يتجاوز ٢٥٠ حرف ", [
          {
            text: "حسنًا ",
            style: "cancel",
          },
        ]);
        return
      }



    const ProductsRef = AfaadFirebase.database().ref('ProductIdea');
    let createDate = new Date().toLocaleDateString() ;

    if (user){
    const productData = {
        Title,
        category,
        ProductDescription,
        costEstimation,
        investorsSpec,
        status: 'Pending',
        userID: user.uid,
        date: createDate,
    };
    ProductsRef.push(productData).then((dataRef) => {
      if (dataRef) {
        Alert.alert("نجاح", "تمت إضافة فكرتك بنجاح، سيتم تحويلك إلى قائمة أفكارك", [
          {
            text: "حسنًا",
            onPress: () => {
              navigation.pop()
              navigation.push('EntrepreneurAndInvestor');
            },
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("تنبيه", "حدث خطأ ما، حاول مرة أخرى", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
      }

    });
  }
    };
  
    return (
      <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Text style={styles.warning}>
              *جميـع الحقول مطلوبـــة
            </Text>

            <Text style={styles.labelText}>عنوان المشروع<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="ادخل عنوان المشروع"
              onChangeText={(text) => setTitle(text)}
              value={Title}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.labelText}>فئة المشروع<Text style={styles.warning}>*</Text></Text>
            <DropDownPicker
              style={styles.dropDownStyle}
              textStyle={styles.categoryText}
              containerStyle={{ marginBottom: 15 }}
              open={open}
              value={categoryValue}
              items={items}
              setOpen={setOpen}
              setValue={setCategoryValue}
              setItems={setItems}
              placeholder='اختر فئة المشروع'
              onChangeValue={value => setCategory(value)}
            />

            <Text style={styles.labelText}>وصف المشروع<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={[styles.input, { height: 150 }]}
              placeholder="(حد أقصى:٢٥٠ حرف)"
              onChangeText={(text) => setProductDescription(text)}
              value={ProductDescription}
              underlineColorAndroid="transparent"
              multiline={true}
            />

            <Text style={styles.labelText}>تقدير تكلفة المنتج (بالريال السعودي)<Text style={styles.warning}>*</Text></Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              containerStyle={{ alignItems: 'flex-end', marginBottom: 10 }}
              layout='col'
            />

            <Text style={styles.labelText}>ما الذي تبحث عنه في المستثمرين؟<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={[styles.input, { height: 150 }]}
              placeholder="(حد أقصى:٢٥٠ حرف)"
              onChangeText={(text) => setInvestorsSpec(text)}
              value={investorsSpec}
              underlineColorAndroid="transparent"
              multiline={true}
            />

            <Button buttonStyle={styles.button}
              onPress={submit}
              title="إرسال"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />

            <StatusBar style="auto" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    inner: {
        padding: 24,
        justifyContent: "space-around",

    },
    button: {
      width: 150,
      margin: 10,
      marginLeft:'auto',
      marginRight:'auto',

    },
    labelText: {
      fontSize: 16,
      fontFamily: 'AJannatLTBold',
      fontWeight: 'bold',
      textAlign: 'right',
      color: '#86939e',
      marginTop: 10,
    },
    warning:{
      fontSize: 14,
      textAlign: 'right',
      color:"#9a2222",    
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
    },
    button: {
      width: 213,
      height: 52,
      borderRadius: 6,
      marginVertical: 50,
      alignSelf: 'center',
      backgroundColor: '#022B3A',
    },
    radioLabel: {
      marginHorizontal:10,
      fontFamily: 'AJannatLT',
      fontSize: 16,
      color: '#022B3A'
    },
    dropDownStyle: {
      borderColor: "white", flexDirection: 'row-reverse'
    },
    categoryText: {
      textAlign: 'right',
      fontFamily: 'AJannatLT',
      fontSize: 14,
    }
  });