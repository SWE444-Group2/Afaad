import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AfaadFirebase from './firebaseConfig';


const Notfication = async() => { 

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

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
//Asked for permitions
// check if it is real device?
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if(token){
    const userToken= await AfaadFirebase.database().ref(userType+'/'+user.uid);
     userToken.update({
       Token : token
     })
  
     isAllowed=true;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


export {Notfication};

