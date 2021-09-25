import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import { Button, Input } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';


export default function PublishIdea({ navigation }) {

  const user = AfaadFirebase.auth().currentUser ;

    //fields value
    const [Title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [costEstimation, setCostEstimation] = useState('');
    const [investorsSpec, setInvestorsSpec] = useState('');

    const IsValidfield= (field) => {
      const RegxOfNames = /^[a-zA-Z\s]*$/;
      return RegxOfNames.test(field);
    };

  
    //when submit button is pressed perform this
    const submit = () => {

      // Checking for empty fields
      if (
        Title == "" || 
        category == "" ||
        ProductDescription == "" ||
        investorsSpec == ""
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
            text: "سإعيد المحاولة",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]);
        return
      }

      if (IsValidfield(category) == false) {
        Alert.alert("تنبيه", "حقل \"التصنيف\" يجب ان يحتوي على حروف فقط", [
          {
            text: "سإعيد المحاولة",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]);
        return
      }

      if (IsValidfield(ProductDescription) == false) {
        Alert.alert("تنبيه", "حقل \"الوصف\" يجب ان يحتوي على حروف فقط", [
          {
            text: "سإعيد المحاولة",
            onPress: () => console.log("yes Pressed"),
            style: "cancel",
          },
        ]);
        return
      }

      if (IsValidfield(investorsSpec) == false) {
        Alert.alert("تنبيه", "حقل \"وصف المستثمر المراد\" يجب ان يحتوي على حروف فقط", [
          {
            text: "سإعيد المحاولة",
            onPress: () => console.log("yes Pressed"),
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
      navigation.pop()
      navigation.push('ViewIdea');
    });
  }
    };
  
    return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.titleText}>Submit idea</Text>
          <Input
            label="Title"
            placeholder="Enter Title"
            value={Title}
            onChangeText={text => setTitle(text)}
          />
          <Input
            label="Category"
            placeholder="Enter Category"
            value={category}
            onChangeText={text => setCategory(text)}
          />
          
          {/* 
          *********Uploading Input***********
          <Input
            label=""
            placeholder=""
            value={}
            onChangeText={text => (text)}
          /> */}

          <Input
            label="Product Description"
            placeholder="Enter Product Description"
            multiline={true}
            numberOfLines={4}
            value={ProductDescription}
            onChangeText={text => setProductDescription(text)}
          />
          <Input
            label="Product Cost Estimation (SAR)"
            placeholder="Enter Your Estimation"
            keyboardType = {'number-pad'}
            value={costEstimation}
            onChangeText={text => setCostEstimation(text)}
          />
          <Input
            label="What do you look for in investors?"
            placeholder="..."
            multiline={true}
            numberOfLines={4}
            value={investorsSpec}
            onChangeText={text => setInvestorsSpec(text)}
          />

          <Button style={styles.button}
            onPress={submit}
            title="Submit"
            titleStyle={{ marginHorizontal: 5 }}
          />
          <StatusBar style="auto" />
        </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    },
    titleText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 50,
    },
  });