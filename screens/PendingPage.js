import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity , Image } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import SignOut from '../assets/images/SignOut.png';
import exclamationmark from '../assets/images/exclamation-mark.png';
import React, { useState } from "react";


let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function ViewIdea({ navigation }) {

  //signout function
  const onSignout = () => {
    auth.signOut();
    navigation.reset({
        index: 0,
        routes: [{ name: 'MainScreen' }],
    });
};


let user = AfaadFirebase.auth().currentUser ;
let userID, userType , userName;

if(user){
    userID = user.uid ;
    AfaadFirebase.database().ref('/Investor/'+userID).on('value', (snapshot) => {
        if (snapshot.exists()) {
          userType = 'Investor' ;
          userName = snapshot.child('FullName').val()
        }
      })
}

return(

    <View >


     <View style={styles.container}>
           <TouchableOpacity>
             <Image source={exclamationmark} style={{ width: 190, height: 230 }}/>
            </TouchableOpacity>
        <Text style={Titlestyles.sectionTitle}>مرحبا</Text>
        <Text style={[Titlestyles.subTitle , styles.align]}> حسابك قيد المراجعة ، يرجى الانتظار حتى يتم قبول طلبك</Text>
     </View>

     <TouchableOpacity  
            style={Titlestyles.SignOutbutton} onPress={onSignout}>
             <Image source={SignOut} style={{ width: 25, height: 25 }}/>
     </TouchableOpacity>

     <StatusBar style="auto" />

 </View>
);
}


const styles = StyleSheet.create({
    container:{
    marginTop:'30%',
    alignItems:'center',
    },
    align:{
        textAlign:'center'
    }
  });