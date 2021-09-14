import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app' ;
import {db} from "./firebase";

// Not yet connected to a db
// Expecting an Object


export default function invstorsAccount ({navigation}) {
    if (getParam('type')=='Company'){
        return(
            <view>
                <Text>{navigation.getParam('companyId')}</Text>
                <Text>{navigation.getParam('CompanyWeb')}</Text>
                <Text>{navigation.getParam('companyName')}</Text>
                <Text>{navigation.getParam('phoneNum')}</Text>
            </view>
        ) }
    else  {
        return(
            <view>
                <Text>{navigation.getParam('birthdate')}</Text>
                <Text>{navigation.getParam('firstName')}</Text>
                <Text>{navigation.getParam('Gender')}</Text>
                <Text>{navigation.getParam('Lastname')}</Text>
                <Text>{navigation.getParam('email')}</Text>
                <Text>{navigation.getParam('phoneNum')}</Text>
            </view>
        ) }
    
}
