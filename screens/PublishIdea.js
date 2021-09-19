import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';

let user = AfaadFirebase.auth().currentUser ;

export default function Login({ navigation }) {

    //fields value
    const [Title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [costEstimation, setCostEstimation] = useState('');
    const [investorsSpec, setInvestorsSpec] = useState('');
  
    //when login button is pressed perform this
    const submit = () => {
    const ProductsRef = AfaadFirebase.database().ref('ProductIdea');
    let createDate = new Date().toLocaleDateString() ;

    const productData = {
        Title,
        category,
        ProductDescription,
        costEstimation,
        investorsSpec,
        invested: false,
        accepted: false,
        userID: user.uid,
        date: createDate,
    };
    ProductsRef.push(productData);
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
            label="Product Cost Estimation"
            placeholder="Enter Your Estimation"
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