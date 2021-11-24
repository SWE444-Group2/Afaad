import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect , setState } from 'react';
import {StyleSheet, Text, View, Button,TouchableOpacity, FlatList ,Image} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Titlestyles from './TitleStyles';
import Background from '../assets/images/Background.jpg';
import SvgUri from "expo-svg-uri";

export default function ViewAccount({ navigation }) {

    //New code 
      const [AccountsList,setAccountsList]= useState();
      const[PendingAccountsList ,setPendingAccountList ]=useState();

      useEffect(()=> {
    
        let isUnmounted=false;
        const InvestorTableRef = AfaadFirebase.database().ref("Investor");
        
        InvestorTableRef.on('value',(snapshot)=>{
            
            const AccountsList = [];
            const investor=snapshot.val();

            for(let id in investor){
                AccountsList.push({id,...investor[id]}); //BRING ID FROM DB
            }
            
            if(!isUnmounted){
            setAccountsList(AccountsList);}


            const PendingAccountsList=[];
          for(let AccountID in AccountsList){
            if(AccountsList[AccountID].Verified=='Pending'){
              PendingAccountsList.push(AccountsList[AccountID]) } 
            }

            if(!isUnmounted){
           setPendingAccountList(PendingAccountsList) ;}
          
  
           
            
        });

        return()=>{
          isUnmounted=true;
 
        };

       
    },[])
  
  return (
    <View style={Titlestyles.container}>

          <View style={styles.SVG}>
            <SvgUri  source={require('../assets/images/Frame.svg')} /> 
            </View>  
            <Text style={styles.title}>  تفعيل حسابات المستثمرين</Text>
        <View style={Titlestyles.tasksWrapper}>
       

           <View style={Titlestyles.items}>
             {/* Investors Accounts is displayed  */}
             <FlatList  
             data = {PendingAccountsList}
             keyExtractor={(item, index)=>index.toString()}
             renderItem = {({item})=>(

             <TouchableOpacity onPress={() => navigation.navigate('investorAccount', {InvestorID:item.id})}>
             <View style={Titlestyles.item}>
             <Button style={Titlestyles.button}
                onPress={() => navigation.navigate('investorAccount', {InvestorID:item.id})}
                title="عرض التفاصيل"
                titleProps={{}}
                color='#247ba0'
            />
             <Text style={Titlestyles.subTitle} >{item.FullName} </Text>
             
           
             </View>
             </TouchableOpacity>


             ) }
             />
             
           </View>
      </View>

      <StatusBar style="auto" />
   </View>
  );

}
const styles = StyleSheet.create({
 
SVG:{
    alignItems: "center",
    position: 'absolute',
    marginTop:-40 
  
  },
  title: {
    fontFamily: 'AJannatLTBold',
    fontSize:28,
    fontWeight:'bold',
    textAlign: 'right',
    color:'white' ,
    paddingTop: 40,
    paddingRight:5,
  },
});