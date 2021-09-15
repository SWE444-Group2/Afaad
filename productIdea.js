import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AfaadFirebase from "./firebaseConfig";


// Expecting an id of product idea


export default function productIdea({navigation}) {
    const [date, setdate] = useState('');
    const [Description, setDescription] = useState('');
    const [FeasibilityAnalysis, setFeasibilityAnalysis] = useState('');
    const [Status, setStatus] = useState('');
    const [Title, setTitle] = useState('');

    const productIdeaRef = AfaadFirebase.database().ref("ProductIdea");
    productIdeaRef.once('value').then(function(snapshot){
        setdate(snapshot.child("Date").val());
        setDescription(snapshot.child("Description ").val());
        setFeasibilityAnalysis(snapshot.child("FeasibilityAnalysis").val());
        setStatus(snapshot.child("Status").val());
        setTitle(snapshot.child("Title").val());
    });
    // console.log(pIdea);
    return(
        <View>
            <Text>View console</Text>
            <Text>{date}</Text>
            <Text>{Description}</Text>
            <Text>{FeasibilityAnalysis}</Text>
            <Text>{Status}</Text>
            <Text>{Title}</Text>
        </View>
    )
}
