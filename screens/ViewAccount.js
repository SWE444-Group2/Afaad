import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect , setState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, FlatList } from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Titlestyles from './TitleStyles';
import { color } from 'react-native-reanimated';

export default function ViewAccount({ navigation }) {

    //New code 
      const [AccountsList,setAccountsList]= useState();
      const[PendingAccountsList ,setPendingAccountList ]=useState();

      useEffect(()=> {
    
        const InvestorTableRef = AfaadFirebase.database().ref("Investor");
        
        InvestorTableRef.on('value',(snapshot)=>{
            
            const AccountsList = [];
            const investor=snapshot.val();

            for(let id in investor){
                AccountsList.push({id,...investor[id]}); //BRING ID FROM DB
            }
            
            setAccountsList(AccountsList);


            const PendingAccountsList=[];
          for(let AccountID in AccountsList){
            if(AccountsList[AccountID].Verified=='Pending'){
              PendingAccountsList.push(AccountsList[AccountID]) } 
            }

           setPendingAccountList(PendingAccountsList) ;
           console.log(PendingAccountsList);
  
            
        })

       
    },[])
  
  return (
    <View style={Titlestyles.container}>
        <View style={Titlestyles.tasksWrapper}>
        <Text style={[Titlestyles.sectionTitle]}>تفعيل حسابات المستثمرين</Text>
       

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
             <Text style={Titlestyles.subTitle} >{item.email} </Text>
             
           
             </View>
             </TouchableOpacity>


             ) }
             />
             
           </View>
      </View>
   </View>
  );

}
