import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AfaadFirebase from "./firebaseConfig";


// Expecting an id of product idea


export default function productIdea({navigation}) {
    const [date, setdate] = useState('');
    const [Description, setDescription] = useState('');
    const [FeasibilityAnalysis, setFeasibilityAnalysis] = useState('');
    const [Verified, setVerified] = useState('');
    const [Title, setTitle] = useState('');

    const productIdeaRef = AfaadFirebase.database().ref("ProductIdea/ID");
    productIdeaRef.once('value').then(function(snapshot){
        setdate(snapshot.child("Date").val());
        setDescription(snapshot.child("Description ").val());
        setFeasibilityAnalysis(snapshot.child("FeasibilityAnalysis").val());
        setVerified(snapshot.child("Verified").val());
        setTitle(snapshot.child("Title").val());
    });
    // console.log(pIdea);
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Date</Text>
            <Text>{date}</Text>
            <Text style={styles.label}>Description</Text>
            <Text>{Description}</Text>
            <Text style={styles.label}>Feasibility Analysis</Text>
            <Text>{FeasibilityAnalysis}</Text>
            <Text style={styles.label}>Verified</Text>
            <Text>{Verified}</Text>
            <Text style={styles.label}>Title</Text>
            <Text>{Title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    label:{
        fontWeight: "bold",
        fontSize: 17
        }
  });
