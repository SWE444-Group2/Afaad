import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';


const Notfication = async() => { 
//Asked for permitions
// check if it is real device?
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
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        this.setState({ expoPushToken: token });
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if(token){
        const userToken= await AfaadFirebase.database().ref(userType+'/'+user.uid);
         userToken.update({
           Token : token
         })
      }
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      useEffect(() => {
        registerForPushNotificationsAsync();
      });

};

export {Notfication};