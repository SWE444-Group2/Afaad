import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app' ;
import {db} from "./firebase";


// Not yet connected to a db
// Expecting an Object


export default function invstorsAccount ({navigation}) {
    return(
        <view>
            <Text>{navigation.getParam('date')}</Text>
            <Text>{navigation.getParam('description')}</Text>
            <Text>{navigation.getParam('FeasibilityAnalysis')}</Text>
            <Text>{navigation.getParam('status')}</Text>
            <Text>{navigation.getParam('title')}</Text>
        </view>
    )
}
