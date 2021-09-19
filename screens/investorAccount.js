import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity , Alert } from 'react-native';
import AfaadFirebase from "./firebaseConfig";


// Expecting an id of product idea


export default function invstorsAccount({navigation , route}) {

    const AccountPath='Investor/'+route.params.InvestorID;

   
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Desc, setDesc] = useState('');
    const [email, setEmail] = useState('');

    const invstorsAccountRef = AfaadFirebase.database().ref(AccountPath);
    invstorsAccountRef.once('value').then(function(snapshot){
        
               
        setFirstname(snapshot.child("FirstName").val());
        setLastname(snapshot.child("LastName").val());
        setDesc(snapshot.child("description").val());
        setEmail(snapshot.child("email").val());
    });


    const AcceptIdea=()=>{

        invstorsAccountRef.update({
            Verified : 'Accepted' } )

        Alert.alert(
            "رائع!",
            "تم قبول المستثمر  بنجاح",[{text: "العودة لقائمه المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
            );
    }

    const RejectIdea=()=>{
        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من رفض المستثمر؟",
            [
              {
                text: "نعم", onPress: () => { 
                    invstorsAccountRef.update({Verified : 'Rejected' } )
                    Alert.alert(
                        "رائع!",
                        "تم رفض المستثمر بنجاح",[{text: "العودة لقائمه المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
                        );                         }
              },
              { text: "إلغاء"}
            ]
          ); }
    // console.log(pIdea);
    return(
        <View style={styles.container}>
            <Text style={styles.label}>email</Text>
            <Text>{email}</Text>
            <Text style={styles.label}>First name:</Text>
            <Text>{Firstname}</Text>
            <Text style={styles.label}>Last name:</Text>
            <Text>{Lastname}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text>{Desc}</Text>

<TouchableOpacity
                    style={styles.button}
                    onPress={() => AcceptIdea()}>
                    <Text style={styles.buttonTitle}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => RejectIdea()}>
                    <Text style={styles.buttonTitle}>Reject</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E1E5F2',
      alignItems: 'center',
    },
    label:{
        fontWeight: "bold",
        fontSize: 17
        },
        button: {
            width: 150,
            margin: 10,
            },

    buttonTitle: {
        color: 'dodgerblue',
         fontSize: 16,
        fontWeight: "bold",   
        },
  });
