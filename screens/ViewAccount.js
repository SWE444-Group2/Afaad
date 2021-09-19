import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, FlatList} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';

export default function ViewAccount({ navigation }) {

    //New code 
      const [AccountsList,setAccountsList]= useState();

      useEffect(()=> {
    
        const InvestorTableRef = AfaadFirebase.database().ref("Investor");
        
        InvestorTableRef.on('value',(snapshot)=>{
            
            const AccountsList = [];
            const investor=snapshot.val();

            for(let id in investor){
                AccountsList.push({id,...investor[id]}); //BRING ID FROM DB
            }
            
            setAccountsList(AccountsList);
        })
    },[])
  
  return (
    <View style={styles.container}>
        <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Investor's Accounts</Text>
       

           <View style={styles.items}>
             {/* Investors Accounts is displayed  */}
             <FlatList  
             data = {AccountsList}
             keyExtractor={(item, index)=>index.toString()}
             renderItem = {({item})=>(

             <TouchableOpacity onPress={() => navigation.navigate('investorAccount', {InvestorID:item.id})}>
             <View style={styles.item}>
             <Text style={styles.Accounts}>{item.email} </Text>
             </View>
             </TouchableOpacity>


             ) }
             />
             
           </View>
      </View>
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
