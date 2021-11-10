import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert, View,TouchableOpacity, Platform} from 'react-native';
import { Button, normalize } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { mdiSignatureImage } from '@mdi/js';
import { getStorage, ref, uploadBytes } from "firebase/storage";

//import storage from '@react-native-firebase/storage';
//import storage from '@react-native-firebase/storage';
//import RNFetchBlob from 'rn-fetch-blob';

//fix VirtualizedLists should never be nested inside plain ScrollViews warnning

DropDownPicker.setListMode("SCROLLVIEW");

export default function PublishIdea({ navigation }) {

  //const storage = AfaadFirebase.storage();
  //const storageRef = ref(storage, 'PDF');
 

  const[uploading,setUploading]= useState(false);


  const user = AfaadFirebase.auth().currentUser ;

    //fields value
    const [Title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);

    //const[File,setfile]=useState(null);
    //const[FileName,setfileName]=useState(null);
    //const[uri,seturi]=useState(null);
    const [image,setImage]=useState(null);

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
    const [donation , setDonation]=useState('');
    const radioButtonsData = [{
      id: '1', 
      label: '١ ألف - أقل من ١٠ آلاف',
      value: '١ ألف - أقل من ١٠ آلاف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    }, {
      id: '2',
      label: '١٠ آلاف - أقل من ٥٠ ألف',
      value: '١٠ آلاف - أقل من ٥٠ ألف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    },{
      id: '3',
      label: '٥٠ ألف - أقل من ١٠٠ ألف',
      value: '٥٠ ألف -  أقل من ١٠٠ ألف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    },{
      id: '4',
      label: '١٠٠ ألف - أقل من ٥٠٠ ألف',
      value: '١٠٠ ألف - أقل من ٥٠٠ ألف',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    },{
      id: '5',
      label: '٥٠٠ ألف - أقل من ١ مليون',
      value: '٥٠٠ ألف - أقل من ١ مليون',
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    }]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [investorsSpec, setInvestorsSpec] = useState('');

    // Donation 
    const DonationradioButtonsData = [{
      id: '1', 
      label: 'نعم',
      value: true,
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    }, {
      id: '2',
      label: 'لا',
      value: false,
      containerStyle: {flexDirection: 'row-reverse', marginTop:5},
      labelStyle: styles.radioLabel,
      size: 20,
      color: '#7c98b3'
    }]

    const [DonationradioButtons, setDonationradioButtons] = useState(DonationradioButtonsData)

    function onPressDonationRadioButton(radioButtonsArray) {
      setDonationradioButtons(radioButtonsArray) ;
      let selectedOption ; 
      for(let radioButton in DonationradioButtons){
        if(DonationradioButtons[radioButton].selected == true){
          selectedOption = DonationradioButtons[radioButton].value ; 
          DonationradioButtons[radioButton].containerStyle = [DonationradioButtons[radioButton].containerStyle, {backgroundColor: '#fafafa',borderRadius: 10}] ;
        }else{
          DonationradioButtons[radioButton].containerStyle = {flexDirection: 'row-reverse', marginTop:5}
        }
      }
         setDonation(selectedOption) ;
    }
    //end 
    function onPressRadioButton(radioButtonsArray) {
      setRadioButtons(radioButtonsArray) ;
      let selectedCost ; 
      for(let radioButton in radioButtons){
        if(radioButtons[radioButton].selected == true){
          selectedCost = radioButtons[radioButton].value ; 
          radioButtons[radioButton].containerStyle = [radioButtons[radioButton].containerStyle, {backgroundColor: '#fafafa',borderRadius: 10}] ;
        }else{
          radioButtons[radioButton].containerStyle = {flexDirection: 'row-reverse', marginTop:5}
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
            style: "cancel",
          },
        ]);
        return
      }
      if(Title.replace(/\s+/g,'').length > 30 || Title.replace(/\s+/g,'').length < 3){
        Alert.alert("تنبيه", "حقل العنوان يجب ألا يقل عن ٣ أحرف وألا يتجاوز ٣٠ حرف ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
      if(ProductDescription.replace(/\s+/g,'').length > 250 || ProductDescription.replace(/\s+/g,'').length < 10){
        Alert.alert("تنبيه", "حقل وصف المشروع يجب ألا يقل عن ١٠ أحرف وألا يتجاوز ٢٥٠ حرف ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
      if(investorsSpec.replace(/\s+/g,'').length > 250 || investorsSpec.replace(/\s+/g,'').length < 10){
        Alert.alert("تنبيه", "حقل وصف المستثمرين يجب ألا يقل عن ١٠ أحرف وألا يتجاوز ٢٥٠ حرف ", [
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
        donation,
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

    const ChooseFile=async()=>{
            // Pick a single file
            try {
              const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],  //Uploud PDF ,can be changed to other type if
              })
              console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size,
              )
            } catch (err) {
              if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
              } else {
                throw err
              }
            }
    }

    const pickDocument = async () => {

      global.file = await DocumentPicker.getDocumentAsync({type: "application/pdf"});
     // console.log(file.uri);
     if (file != null) {
      const r = await fetch(file.uri);
      const b = await r.blob();
      console.log(JSON.stringify(b));
      console.log(file);
    }

    uploadFile();

    
    /*
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
      const path= await normalizePath(file.uri); 
      console.log(path); //check after removing prefix
      console.log(
        file.uri,
        file.type, // mime type
        file.name,
        file.size,
      )*/
      //const result=await RNFetchBlob.fs.readFile(path,'base64');
      //console.log(file); //check

    };
  // The file prefix should be removed from the path URL
  const normalizePath = async(path)=>{
        if(Platform.OS==='ios' || Platform.OS==='android'){
          const filePrefix='file://'  //To  file:/// to remove the third slash 
          if(path.startsWith(filePrefix)){
            path=path.substring(filePrefix.length); //to remove 
            try{
              path=decodeURI(path);
            }
            catch(e){

            }
          }
        }
        return path;  
    }

    const uploadFile =async ()=>{

      const blob = await new Promise((resolve,reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload=function(){
        resolve(xhr,response);
      };

      xhr.onerror=function(){
        reject(new TypeError("Network request failed"));
      
      };

      xhr.responseType='blob';
      xhr.open('GET',file,true);
      xhr.send(null);

      });

      const ref = AfaadFirebase.storage().ref().child('PDF')
      const snapshot = ref.put(blob)

      snapshot.on(AfaadFirebase.storage.TaskEvent.STATE_CHANGE,()=>{
        setUploading(true)
      },
      (error)=>{
        setUploading(false)
        console.log(error)
        blob.close();
        return;
      },
      ()=>{
        snapshot.snapshot.ref.getDownloadURL().then((url)=>{
          setUploading(false)
          console.log("download url",url)
          blob.close();
          return url;

          });
        }
      );
  };
/*
    const choosePhoto=()=>{
      ImagePicker.openPicker({
        with:200,
        height:200,
        croopint:true,
      }).then((image)=>{
        console.log(image);
        const imageUri=Platform.OS==='ios'? image.sourceURL : image.path;
        setImage(imageUri);
      });
    };*/

    return (
      <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
        <View style={{
          backgroundColor:"#7C98B3",
          height: 200, 
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          }}>
            <Text style={styles.title}>
              طرح فكرة جديدة
            </Text>
            </View>
            <View style={{backgroundColor:"white", padding: 24}}>
            <Text style={styles.warning}>
              *جميـع الحقول مطلوبـــة
            </Text>

            <Text style={styles.labelText}>عنوان المشروع<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTitle(text)}
              value={Title}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.labelText}>فئة المشروع<Text style={styles.warning}>*</Text></Text>
            <DropDownPicker
              style={styles.dropDownStyle}
              textStyle={styles.categoryText}
              containerStyle={{ marginBottom: 15}}
              dropDownContainerStyle={{borderColor: '#C7C7CD', backgroundColor:'#f2f4f7'}}
              placeholderStyle={{color: '#C7C7CD'}}
              open={open}
              value={categoryValue}
              items={items}
              setOpen={setOpen}
              setValue={setCategoryValue}
              setItems={setItems}
              placeholder='- اختر فئة -'
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

            <Text style={styles.labelText}>هل تريد استقبال الدعم المالي على البريد الالكتروني عن طريق باي بال؟<Text style={styles.warning}>*</Text></Text>
            <RadioGroup
              radioButtons={DonationradioButtons}
              onPress={onPressDonationRadioButton}
              containerStyle={{ alignItems: 'flex-end', marginBottom: 10 }}
              layout='col'
            />
           
            <Text style={styles.labelText}>ملف دراسه الجدوى للفكره </Text>
            <View style={styles.uploudIcon}>
            <TouchableOpacity onPress={pickDocument}>
            <Icon  name="file-upload-outline" style={{ marginLeft:'30%'} } size={40} color={"#536b78"}/> 
            </TouchableOpacity>
            </View>
      
            {/*
            <Text style={styles.labelText}>صور لفكرتك   </Text>
            <View style={styles.uploudIcon}>
            <TouchableOpacity>
            <Icon  name="image-plus" style={{ marginLeft:'65%'} } size={30} color={"#536b78"}/> 
            </TouchableOpacity>
            </View>
           */ }
            <Button buttonStyle={styles.button}
              onPress={submit}
              title="إرسال"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />

            <StatusBar style="auto" />
          </View>
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
      backgroundColor: "rgba(124, 152, 179, 0.1)",
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
      borderColor: "white",
      flexDirection: 'row-reverse',
      backgroundColor: '#f2f4f7',

    },
    categoryText: {
      textAlign: 'right',
      fontFamily: 'AJannatLT',
      fontSize: 14,
    },
    title: {
      fontFamily: 'AJannatLTBold',
      fontSize:40,
      fontWeight:'bold',
      textAlign: 'right',
      color:'white' ,
      paddingTop: 55,
      paddingRight:20,
    },
    uploudIcon:{
      marginTop:-30,

    },

  });