import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect , setState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, FlatList ,Image} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Titlestyles from './TitleStyles';
import { color } from 'react-native-reanimated';
import Background from '../assets/images/Background.jpg';
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
        <Image source={Background} style={{ flex: 1,width:'100%',height:'10%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}] }}/>

        <View style={Titlestyles.tasksWrapper}>
        <Text style={[Titlestyles.subTitle , {fontSize:20 , marginBottom:35 , marginTop:15}]}>تفعيل حسابات المستثمرين</Text>
       

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
