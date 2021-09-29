import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import { Button, Input } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';
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
      label: '١٠٠٠-١٠،٠٠٠',
      value: '١٠٠٠-١٠،٠٠٠'
    }, {
      id: '2',
      label: '١٠،٠٠٠-٥٠،٠٠٠',
      value: '١٠،٠٠٠-٥٠،٠٠٠'
    },{
      id: '3',
      label: '٥٠،٠٠٠-١٠٠،٠٠٠',
      value: '٥٠،٠٠٠-١٠٠،٠٠٠'
    },{
      id: '4',
      label: '١٠٠،٠٠٠-٥٠٠،٠٠٠',
      value: '١٠٠،٠٠٠-٥٠٠،٠٠٠'
    },{
      id: '5',
      label: '٥٠٠،٠٠٠-١،٠٠٠،٠٠٠',
      value: '٥٠٠،٠٠٠-١،٠٠٠،٠٠٠'
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
            text: "سأعيد المحاولة",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]);
        return
      }
      if(ProductDescription.length > 250){
        Alert.alert("تنبيه", "حقل وصف المشروع يجب ألا يتجاوز ٢٥٠ حرف ", [
          {
            text: "سأعيد المحاولة",
            style: "cancel",
          },
        ]);
        return
      }
      if(investorsSpec.length > 250){
        Alert.alert("تنبيه", "حقل وصف المستثمرين يجب ألا يتجاوز ٢٥٠ حرف ", [
          {
            text: "سأعيد المحاولة",
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
              navigation.push('ViewIdea');
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
    <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} extraScrollHeight={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
        <Text style={TitleStyles.sectionTitle}>نشر المشروع</Text>
          <Input style = {{ textAlign: 'right', fontFamily: 'AJannatLT' }}
            labelStyle={{ textAlign: 'right', fontFamily: 'AJannatLTBold' }}
            label="عنوان المشروع"
            placeholder="ادخل عنوان المشروع"
            value={Title}
            onChangeText={text => setTitle(text)}
          />
          <Text style={styles.labelText}>فئة المشروع</Text>
          <DropDownPicker
              textStyle={{
                textAlign: 'right',
                fontFamily: 'AJannatLT',
                fontSize: 18,
                color: '#536b78'
              }}
              containerStyle={{
                marginBottom: 15
              }}
              open={open}
              value={categoryValue}
              items={items}
              setOpen={setOpen}
              setValue={setCategoryValue}
              setItems={setItems}
              placeholder='اختر فئة المشروع'
              onChangeValue={value => setCategory(value)}
          />

          {/* 
          *********Uploading Input***********
          <Input
            label=""
            placeholder=""
            value={}
            onChangeText={text => (text)}
          /> */}

          <Input style = {{ textAlign: 'right', fontFamily: 'AJannatLT', height: 100 }}
            labelStyle={{ textAlign: 'right', fontFamily: 'AJannatLTBold' }}
            label="وصف المشروع"
            placeholder="(حد أقصى:٢٥٠ حرف)"
            multiline={true}
            numberOfLines={4}
            value={ProductDescription}
            onChangeText={text => setProductDescription(text)}
          />
          <Text style={styles.labelText}>تقدير تكلفة المنتج (ريال سعودي)</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            containerStyle={{ flexDirection: 'row-reverse', flexWrap: 'wrap', marginBottom: 15}}
            layout= 'row'
          />
          <Input style = {{ textAlign: 'right', fontFamily: 'AJannatLT', height: 100 }}
            labelStyle={{ textAlign: 'right', fontFamily: 'AJannatLTBold' }}
            label="ما الذي تبحث عنه في المستثمرين؟"
            placeholder="(حد أقصى:٢٥٠ حرف)"
            multiline={true}
            value={investorsSpec}
            onChangeText={text => setInvestorsSpec(text)}
          />

          <Button style={styles.button}
            onPress={submit}
            title="ارسال"
            titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT'}}
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
      color: '#86939e'
    },
  });