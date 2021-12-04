
import React ,{useEffect , useState } from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image , Modal} from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Titlestyles from './TitleStyles';
import AfaadFirebase from './firebaseConfig';
import { NavigationBar } from './NavigationBar';
import SvgUri from "expo-svg-uri";


let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function NotificationsNav({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  
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
  const  [adminRejectReason, setadminRejectReason] = useState('') ;

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
      
        
        global.counter = 0;

        const PendingProductList=[]
        for(let productID in productsList){
  
         if (userType === 'Investor' && productsList[productID].status == 'Accepted' && productsList[productID].InvestorsList!=null) {
            let inv= Object.keys(productsList[productID].InvestorsList)
            for(let i in inv){
              if(inv[i]==userID){
                 PendingProductList.push(productsList[productID])
                 if(productsList[productID].InvestorsList[userID].status!='Pending')
                 counter++;
                }
          }
           
     }
          else if (userType === 'Entrepreneur' && productsList[productID].userID == userID && productsList[productID].status != 'Pending'  ) {
           
            PendingProductList.push(productsList[productID])
            counter++;
          }
        }

        if(!isUnmounted){
         setPendingproductsList(PendingProductList) ;}

        
     });


     
     
     return()=>{
      isUnmounted=true;

     };

  }, [])

  const getInfo=(itemID)=>{
    
    global.InRef= AfaadFirebase.database().ref("ProductIdea/"+itemID);
    
    InRef.once('value').then(function(snapshot){            
          setadminRejectReason(snapshot.child("adminRejectReason").val());
          setModalVisible(true);
      });

     
}
  
    return(
        <View style={styles.container}>

        <View style={styles.SVG}>
      <SvgUri  source={require('../assets/images/Frame.svg')} /> 
      </View>

      <Text style={styles.title}> الاشعارات</Text>
        
      <View style={styles.tasksWrapper}>

      <View>
      {global.counter==0 &&<Text style={[Titlestyles.subTitle , {marginRight:'25%' , marginTop:'10%'} ]}> لا توجد إشعارات حاليا </Text>}

        <FlatList style={{height:'85%'}}
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity >   
          
          
        
          {userType== 'Entrepreneur' &&  
          <TouchableOpacity >   
           {item.InvestorsList!=null &&
           <TouchableOpacity onPress={() => navigation.navigate('OffersList', {Product_id:item.productID, userType: userType, user_Name:userName})}>
            <View style={styles.item}>   
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText , {fontSize:16 , width:'75%'}]}>يوجد لديك طلب استثمار جديد في
            <Text style={{color:'#247ba0', textDecorationLine: 'underline' , fontWeight:'bold'}}> {item.Title}</Text></Text>
             <Icon name="checkbox-blank-circle"  size={15} color={"#022B3A"} style={{marginRight:20}}
             />
             </View> 
             </TouchableOpacity>}

             {item.status=='Rejected' &&
             <TouchableOpacity onPress={() => getInfo(item.productID)}>
            <View style={styles.item}>   
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText , {fontSize:16 , width:'75%'}]}>تم رفض فكرة مشروعك  
            <Text style={{color:'#247ba0' , textDecorationLine: 'underline'}}> {item.Title}</Text></Text>
             <Icon name="checkbox-blank-circle"  size={15} color={"#022B3A"} style={{marginRight:20}}
             />
             </View> 
             </TouchableOpacity>}     

             {item.status=='Accepted' &&
             <TouchableOpacity>
            <View style={styles.item}>   
            <Text style={[Titlestyles.subTitle , Titlestyles.DescText , {fontSize:16 , width:'75%'}]}>تم قبول فكرة مشروعك  
            <Text style={{color:'#247ba0' , textDecorationLine: 'underline'}}> {item.Title}</Text></Text>
             <Icon name="checkbox-blank-circle"  size={15} color={"#022B3A"} style={{marginRight:20}}
             />
             </View>
             </TouchableOpacity> }
             
             </TouchableOpacity>
             
             }

             {userType== 'Investor'  && item.InvestorsList[userID].status!='Pending'&&(
               <TouchableOpacity   onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType, user_Name:userName})} >  
            <View style={styles.item}  >
            
                {item.InvestorsList[userID].status=='Accepted'&&
                <Text style={[Titlestyles.subTitle , Titlestyles.DescText ,{fontSize:16 , width:'75%'}]}>تم قبول طلب اسثمارك في
                  <Text style={{color:'#247ba0' ,textDecorationLine: 'underline'}}> {item.Title}</Text>
               </Text> }

               {item.InvestorsList[userID].status=='Rejected'&&
                <Text style={[Titlestyles.subTitle , Titlestyles.DescText ,{fontSize:16 , width:'75%'}]}>تم رفض طلب اسثمارك في
                  <Text style={{color:'#247ba0' , textDecorationLine: 'underline'}}> {item.Title}</Text>
               </Text> }
            <Icon name='checkbox-blank-circle' size={15} color='#6A687A' style={{marginRight:20}}/> 
             </View> 
             </TouchableOpacity>)}
             
             <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <View style={{backgroundColor:'rgba(52, 52, 52, 0.5)', height: '100%'}}>
              <View style={styles.modalContent}>
                
                <Icon
                  name="close"
                  size={30}
                  style={{marginBottom:30, width: 30}}
                  onPress={() => setModalVisible(!modalVisible)} />
                  
                  <Text style={styles.RejectText}>  سبب الرفض  : </Text>
                 
                {userType=='Entrepreneur' &&
                <Text style={styles.Rejectreason}>{adminRejectReason}</Text> }


                  

              
                
              </View>
              </View>
            </Modal>
            


                
               
          
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
     marginTop:60
     
     
}, 
item:{ 
    flex: 1,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'flex-end',
     marginTop:10,
     height:65,
     overflow:'scroll',
     borderBottomWidth:1,
     borderBottomColor:'#A2ABB5',
     borderRadius:5,
     backgroundColor:'#eeeeee',
    

},

SVG:{
  alignItems: "center",
  position: 'absolute',
  marginTop:-40

},
title: {
  fontFamily: 'AJannatLTBold',
  fontSize:40,
  fontWeight:'bold',
  textAlign: 'right',
  color:'white' ,
  paddingTop: 40,
  paddingRight:20,
}, 
modalContent: {
  margin: 20,
  marginBottom: 'auto',
  marginTop: 'auto',
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
RejectText:{ 
  marginTop:-45,
  fontFamily: 'AJannatLT',
  fontSize:20,
  color:'#637081',
  textAlign: 'right',
  
    },
    Rejectreason:{
      fontFamily:'AJannatLT',
      textAlign:'right',
      fontSize:16

    }

  });