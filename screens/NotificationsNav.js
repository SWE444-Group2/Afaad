
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image} from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Titlestyles from './TitleStyles';
import AfaadFirebase from './firebaseConfig';


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
  
          if (userType === 'Admin' && productsList[productID].status == 'Pending') {
            PendingProductList.push(productsList[productID])
          }
          else if (userType === 'Investor' && productsList[productID].status == 'Accepted' && productsList[productID].InvestorsList!=null) {
            let inv= Object.keys(productsList[productID].InvestorsList)
            for(let i in inv){
              if(inv[i]==userID)
            PendingProductList.push(productsList[productID])}
           
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

      <View style={styles.items}>
        <FlatList style={{height:'85%'}}
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity >   
          
        
          {userType== 'Entrepreneur' &&  (
            <View style={styles.item} onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType})}>       
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText]}>يوجد لديك طلب استثمار جديد في : {item.Title}</Text>
             <Icon name="exclamation" style={{ marginLeft:-10 , marginRight:-15} } size={40} color={"black"}
             />
             </View> )}

             {userType== 'Investor' && (
            <View style={styles.item} onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType})} >
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText]}> تم تحديث حالة طلب اسثمارك في مشروع: {item.Title}</Text>
             <Icon name="exclamation" style={{ marginLeft:-10 , marginRight:-15} } size={40} color={"black"}
             />
             </View> )}


          
          </TouchableOpacity>
        )}

        /> 
       
        </View>
        
       
      </View>
<View style={styles.BottomBar}> 



      { userType== 'Entrepreneur' &&  
          <TouchableOpacity onPress={() => navigation.navigate('profile')} >
            <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
          </TouchableOpacity>
      }

      { userType== 'Entrepreneur' &&
          <TouchableOpacity  >
            <Icon name="bell" style={{ marginLeft:'25%' , marginTop:-38} } size={35} color={"#fff"}/> 
          </TouchableOpacity>
      } 

      { userType== 'Entrepreneur' && 
          <TouchableOpacity onPress={() => navigation.navigate('PublishIdea')}>
            <Icon name="plus-circle-outline" style={{ marginLeft:'45%' , marginTop:-40} } size={40} color={"#fff"}/>
          </TouchableOpacity>}

      { userType== 'Entrepreneur' && 
          <TouchableOpacity>
            <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
          </TouchableOpacity>
      }
      { userType== 'Entrepreneur' &&
        <TouchableOpacity onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
            <Icon name="home-circle-outline" style={{ marginLeft:'83%' , marginTop:-43 } } size={43} color={"#fff"}/> 
        </TouchableOpacity>
      }



      { userType== 'Investor' &&  
          <TouchableOpacity  onPress={() => navigation.navigate('profile')}>
            <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
          </TouchableOpacity>
      }

      { userType== 'Investor' &&
          <TouchableOpacity  >
             <Icon name="bell" style={{ marginLeft:'25%' , marginTop:-40} } size={37} color={"#fff"}/> 
          </TouchableOpacity>
      } 

      { userType== 'Investor' && 
          <TouchableOpacity onPress={() => navigation.navigate('InvestedProductIdea')}>
              <Icon name="head-lightbulb-outline" style={{ marginLeft:'45%' , marginTop:-40} } size={37} color={"#fff"}/> 
          </TouchableOpacity>
      }

      { userType== 'Investor' && 
        <TouchableOpacity>
             <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
        </TouchableOpacity>
      }

      { userType== 'Investor' &&
        <TouchableOpacity onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
              <Icon name="home-circle-outline" style={{ marginLeft:'83%' , marginTop:-43 } } size={43} color={"#fff"}/> 
        </TouchableOpacity>
      }
      </View>
      <StatusBar style="auto" />
        </View>
    );


    
      
}


const styles = StyleSheet.create({
    
  BottomBar:{ 
    position:'absolute',
    height:80,
    bottom:0,
    width:'100%',
    backgroundColor:'#7c98b3'
  
  },

  container: {
    flex: 1,
     backgroundColor: 'white',
    
     
},
tasksWrapper:{
     flex:1,
     paddingHorizontal:20,
     
     
}, 
item:{ 
    flex: 1,
     padding:10,
     backgroundColor:'#eeeeee',
     borderRadius:10,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'flex-end',
     marginBottom:5, 
     marginTop:10,
     overflow:'scroll'

},
  });