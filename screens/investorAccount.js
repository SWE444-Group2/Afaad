import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AfaadFirebase from "./firebaseConfig";


// Expecting an id of product idea


export default function invstorsAccount({navigation , route}) {

    const AccountPath='Investor/'+route.params.InvestorID;

   
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Gender, setGender] = useState('');
    const [Birthdate, setBirthdate] = useState('');  
    const [PhoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    
   // const [username, setUsername] = useState(''); 

    const invstorsAccountRef = AfaadFirebase.database().ref(AccountPath);
    invstorsAccountRef.once('value').then(function(snapshot){
        
        /*
        setBirthdate(snapshot.child("Individual /Birthdate").val());
        setFirstname(snapshot.child("Individual /Firstname").val());
        setGender(snapshot.child("Individual /Gender").val());
        setLastname(snapshot.child("Individual /Lastname").val());
        setPhoneNum(snapshot.child("Individual /PhoneNum").val());
        setUsername(snapshot.child("Individual /username").val());
        */
        setEmail(snapshot.child("email").val());
    });
    // console.log(pIdea);
    return(
        <View style={styles.container}>
        {/*
            <Text style={styles.label}>Username</Text>
            <Text>{username}</Text>
        */}
            <Text style={styles.label}>email</Text>
            <Text>{email}</Text>

        {/*
            <Text style={styles.label}>Firstname</Text>
            <Text>{Firstname}</Text>
            <Text style={styles.label}>Lastname</Text>
            <Text>{Lastname}</Text>
            <Text style={styles.label}>Gender</Text>
            <Text>{Gender}</Text>
            <Text style={styles.label}>Birthdate</Text>
            <Text>{Birthdate}</Text>
            <Text style={styles.label}>PhoneNum</Text>
            <Text>{PhoneNum}</Text>
        */}
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
