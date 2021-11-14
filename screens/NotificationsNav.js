
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image} from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Titlestyles from './TitleStyles';
import AfaadFirebase from './firebaseConfig';
import { NavigationBar } from './NavigationBar';
import { mdiBorderColor } from '@mdi/js';



let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function NotificationsNav({ navigation }) {

  
  let user = AfaadFirebase.auth().currentUser ;
  let userID, userType , userName;

  if(user){
    userID = user.uid ;
    AfaadFirebase.database().ref('/Admin/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Admin' ;
      }})
    AfaadFirebase.database().ref('/Entrepreneur/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Entrepreneur' ;
        userName = snapshot.child('FirstName').val()
      }
    })
    AfaadFirebase.database().ref('/Investor/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Investor' ;
        userName = snapshot.child('FullName').val()
      }
    })
  }

  const [productsList , setproductsList]= useState();
  const[PendingProductList ,setPendingproductsList ]=useState();

  useEffect(() => {
    let isUnmounted=false;
     const dataref=AfaadFirebase.database().ref('ProductIdea')
  
     dataref.on('value',(snapshot) =>{
        const productsList=[] // empty list
        const products= snapshot.val();  
        for (let productID in products){
             productsList.push({productID,...products[productID]});
        } 

        if(!isUnmounted){
        setproductsList(productsList);}
      
        

        const PendingProductList=[]
        for(let productID in productsList){
  
         if (userType === 'Investor' && productsList[productID].status == 'Accepted' && productsList[productID].InvestorsList!=null) {
            let inv= Object.keys(productsList[productID].InvestorsList)
            for(let i in inv){
              if(inv[i]==userID){
                 PendingProductList.push(productsList[productID])
                }
          }
           
     }
          else if (userType === 'Entrepreneur' && productsList[productID].userID == userID && productsList[productID].InvestorsList!=null ) {
            PendingProductList.push(productsList[productID])
          }
        }

        if(!isUnmounted){
         setPendingproductsList(PendingProductList) ;}

        
     });


     console.log(PendingProductList)
     
     return()=>{
      isUnmounted=true;

     };

  }, [])


    return(
        <View style={styles.container}>

<StatusBar style="auto" />  
        
      <View style={styles.tasksWrapper}>

      <View>
        <FlatList style={{height:'85%'}}
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType})} >   
          
        
          {userType== 'Entrepreneur' &&  (
            <View style={styles.item}>       
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText , {fontSize:17}]}>يوجد لديك طلب استثمار جديد في : {item.Title}</Text>
             <Icon name="checkbox-blank-circle-outline"  size={20} color={"#022B3A"}
             />
             </View> )}

             {userType== 'Investor'  && item.InvestorsList[userID].status!='Pending'&&(
            <View style={styles.item}  >
              <Text style={{     
            backgroundColor: item.InvestorsList[userID].status=='Accepted' ? 
            //Accepted
            '#87c38f' :  
            //Rejected
            '#c75146', 
            color:'white',
            textAlign:'center',
            width:60,
            borderRadius:10,
            overflow:'hidden',
            fontFamily: 'AJannatLT',          
            } }>  
            { item.InvestorsList[userID].status=='Accepted' ?
            'مقبول' :
            'مرفوض'} 
            </Text>
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText ,{fontSize:17 , width:'65%'}]}>حالة طلب اسثمارك في {item.Title}</Text> 
            <Icon name='checkbox-blank-circle-outline' size={20} color='#6A687A'/> 
             </View> )}
            


          
          </TouchableOpacity>
        )}

        /> 
       
        </View>
        
       
      </View>
      {NavigationBar({navigation, ScreenName: 'notification'})}
      <StatusBar style="auto" />
        </View>
    );


    
      
}


const styles = StyleSheet.create({
    


  container: {
    flex: 1,
     backgroundColor: 'white',
    
     
},
tasksWrapper:{
     flex:1,
     paddingHorizontal:20,
     marginTop:30
     
     
}, 
item:{ 
    flex: 1,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'flex-end',
     marginTop:10,
     height:80,
     overflow:'scroll',
     borderBottomWidth:1,
     borderBottomColor:'#A2ABB5',
     borderRadius:5,
     backgroundColor:'#eeeeee',
    

},
  });