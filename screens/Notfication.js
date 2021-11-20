import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform , Alert } from 'react-native';
import AfaadFirebase from './firebaseConfig';



const Notfication = async() => { 
  
  let user = AfaadFirebase.auth().currentUser ;
  let userID, userType , userName;


  if(user){
    userID = user.uid ;
    AfaadFirebase.database().ref('/Admin/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Admin' ;
      }})
    AfaadFirebase.database().ref('/Entrepreneur/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Entrepreneur' ;
        userName = snapshot.child('FirstName').val()
      }
    })
    AfaadFirebase.database().ref('/Investor/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Investor' ;
        userName = snapshot.child('FullName').val()
      }
    })
  }
  
  
  Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    _displayInForeground: true
  }),
});
//Asked for permitions
// check if it is real device?
  let token;
  let finalStatus;
  const userToken= await AfaadFirebase.database().ref(userType+'/'+user.uid);
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus=status;  
    }
    
   
    
    token = (await Notifications.getExpoPushTokenAsync()).data;

   
  } else {
    alert('Must use physical device for Push Notifications');
  }  



  if(finalStatus=='granted'){
     userToken.update({
       Token : token
     })
  } else{
    if (finalStatus !== 'granted') {
      userToken.update({
        Token : 'not granted'
      })

     /* Alert.alert("تنبيه",
      "للاستفادة من تطبيق افاد بشكل كامل ، يرجى تفعيل التنبيهات ", [
        {
          text: "حسنًا",
          style: "cancel",
        },
      ]);*/
      return;
    }
  }


  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return true;
}
export {Notfication};

