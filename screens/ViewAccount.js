import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity} from 'react-native';
import AfaadFirebase from './firebaseConfig';


export default function ViewAccount({ navigation }) {

    
    const [username, setUserName]= useState('');
    const[individual,setIndividual]=useState('');

    const InvestorsAccountsRef= AfaadFirebase.database().ref("Investor");
    //const InvestorsAccountsRef2= AfaadFirebase.database().ref("Admin");
    
    InvestorsAccountsRef.once('value').then(function(snapshot){
      setUserName(snapshot.child('Company').child("CompanyName").val());
      setIndividual(snapshot.child("Individual /username").val());
    
    });
/*
    InvestorsAccountsRef2.once('value').then(function(snapshot){
      setIndividual(snapshot.child("password").val());
    });
 */  

    ShowVal=()=>{
        //Bring the data to show
        //alert("Welcome");
    }

  return (
    <View style={styles.container}>
        <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Investor's Accounts</Text>
        <Button title="Accounts to Verify" onPress={ShowVal}></Button>

           <View style={styles.items}>
             {/* Investors Accounts is displayed  */}

             <TouchableOpacity onPress={() => navigation.navigate('investorAccount')}>
             <View style={styles.item}><Text style={styles.Accounts}>{individual}</Text></View>
             </TouchableOpacity>
             <View style={styles.item}><Text style={styles.Accounts}>{username}</Text></View>
             <View style={styles.item}><Text style={styles.Accounts}>Investor Account 3</Text></View>
             <View style={styles.item}><Text style={styles.Accounts}>Investor Account 4</Text></View>
           </View>

         </View>

      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
    tasksWrapper:{
      paddingTop:80,
      paddingHorizontal:20,
    },
    sectionTitle:{
      fontSize:24,
      fontWeight:'bold'
    },
    items:{

    
    },
    item:{
      backgroundColor:'#FFF',
      padding:15,
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      marginBottom:20,
    
    },
    Accounts:{
      fontSize:20,
      fontWeight:'bold'
    
    },

});
