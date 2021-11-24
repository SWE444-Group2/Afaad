
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  {Notfication}  from './Notfication';
import { NavigationBar } from './NavigationBar';
import SvgUri from 'expo-svg-uri';

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function Entrepreneur({ navigation }) {
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
  let NotificationAllowed=Notfication();
  let investorEmail ;

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
        investorEmail=snapshot.child('email').val()
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
            else if (userType === 'Investor' && productsList[productID].status == 'Accepted') {
              PendingProductList.push(productsList[productID])
            }
            else if (userType === 'Entrepreneur' && productsList[productID].userID == userID) {
              PendingProductList.push(productsList[productID])
            }
          }

          if(!isUnmounted){
           setPendingproductsList(PendingProductList) ;}

          
       });

       return()=>{
        isUnmounted=true;

       };

    }, [])
    return (

      <View style={Titlestyles.container}>

<View style={styles.SVG}>
      <SvgUri  source={require('../assets/images/Frame.svg')} /> 
      </View>


       { userType=='Entrepreneur'&&
      <Text style={[Titlestyles.sectionTitle ,{marginTop:'10%' , right:'5%' , color:'white' , fontSize:40}] }> مرحبا بك! {/*{userName}*/}</Text>}
      
        { userType=='Investor'&&
      <Text style={[Titlestyles.sectionTitle ,{marginTop:'10%' , color:'white' , fontSize:40}] }> مرحبا بك! {/*{userName}*/}</Text>}
     
       <View style={Titlestyles.tasksWrapper}>
      <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:5 , marginTop:35}]}>عرض الافكار</Text>
    
      { userType== 'Investor' && 
        <TouchableOpacity >
        <Icon2
                    onPress={() => navigation.navigate('Favorites', {userID: user.uid , userType: userType , user_Name:userName, investor_Email:investorEmail })} 
                      name={"heart"}
                      size={32}
                      color="#cccccc"
                      style={ {marginTop:-40, marginBottom:30 , textDecorationLine:'underline'}} />
                         </TouchableOpacity>}
     
      <View style={Titlestyles.items}>
        <FlatList style={{height:'85%'}}
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType , user_Name:userName, investor_Email:investorEmail})}>   
          <View style={Titlestyles.item}>

          
            <View style={{borderTopRightRadius:15}}>
          {/*if user is an entrepreuner*/}
           {userType=='Entrepreneur' &&  (    
           <Text style={{     
            backgroundColor: item.status=='Accepted' ? 
            //Accepted
            '#87c38f' : 
           item.status=='Rejected' ? 
            //Rejected
            '#c75146':
            //Pending
            '#7c98b3' , 

            color:'white',
            textAlign:'center',
            width:80,
            marginTop:-10,
            marginLeft:-10,
            overflow:'hidden',
            fontFamily: 'AJannatLT',
            } }>  
            { item.status=='Accepted' ? 
                'مقبول': 
                 item.status=='Rejected' ? 
                'مرفوض' :
                'قيد المراجعة' 
                 } 
            </Text>)}

           {/*if user is an Investor*/}
            {userType=='Investor'&&( <Button 
                style={Titlestyles.DetailsBtn}
                onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType, user_Name:userName})}
                title="عرض التفاصيل"
                titleProps={{}}
                //titleStyle={{ marginHorizontal: 1 }}
                color='#247ba0'/>)}
            </View>
            <Text style={Titlestyles.subTitle}>{item.Title}</Text>
            
          </View>
          </TouchableOpacity>
        )}

        /> 
       
        </View>
        
       
      </View> 

  
          
      

      
      {NavigationBar({navigation, ScreenName:'home'})}

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
SVG:{
  alignItems: "center",
  position: 'absolute',
  marginTop:-40,


},

});
