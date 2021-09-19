import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AfaadFirebase from "./firebaseConfig";


// Expecting an id of product idea


export default function invstorsAccount({navigation, route}) {

    const [Age, setAge] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Gender, setGender] = useState('');
    const [Lastname, setLastname] = useState('');
    const [PhoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    const [Description, setDescription] = useState('');

    const invstorsAccountRef = AfaadFirebase.database().ref("Investor/"+route.params.id);
    invstorsAccountRef.once('value').then(function(snapshot){
        setAge(snapshot.child("Age").val());
        setFirstname(snapshot.child("Firstname").val());
        setGender(snapshot.child("Gender").val());
        setLastname(snapshot.child("Lastname").val());
        setPhoneNum(snapshot.child("PhoneNum").val());
        setEmail(snapshot.child("email").val());
        setDescription(snapshot.child("Description").val());

    });
    

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <Text>{Description}</Text>
            <Text style={styles.label}>email</Text>
            <Text>{email}</Text>
            <Text style={styles.label}>Firstname</Text>
            <Text>{Firstname}</Text>
            <Text style={styles.label}>Lastname</Text>
            <Text>{Lastname}</Text>
            <Text style={styles.label}>Gender</Text>
            <Text>{Gender}</Text>
            <Text style={styles.label}>Age</Text>
            <Text>{Age}</Text>
            <Text style={styles.label}>PhoneNum</Text>
            <Text>{PhoneNum}</Text>

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
