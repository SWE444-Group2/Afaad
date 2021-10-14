
import Constants from 'expo-constants';
import ViewIdea from './ViewIdea';
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image , Icon } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import SignOut from '../assets/images/SignOut.png';
import PlusIcon from '../assets/images/plusIcon.png';
import Background from '../assets/images/Background.jpg';
import ClickedHomeIcon from '../assets/images/ClickedHomeIcon.png';
import SearchIcon from '../assets/images/SearchIcon.png';
import NotificationIcon from '../assets/images/NotificationIcon.png'
import ProfileIcon from '../assets/images/ProfileIcon.png'
import { ScrollView } from 'react-native-gesture-handler';

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

    <Image source={Background} style={{ flex: 1,width:'100%',height:'13%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}] }}/>


       { userType=='Entrepreneur'&&
      <Text style={[Titlestyles.sectionTitle ,{marginTop:'5%' , right:'5%'}] }> مرحبا، {userName}</Text>}
        { userType=='Investor'&&
      <Text style={[Titlestyles.sectionTitle ,{marginTop:'5%'}] }> مرحبا، {userName}</Text>}
     
       <View style={Titlestyles.tasksWrapper}>
      <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:5 , marginTop:35}]}>عرض الافكار</Text>
    
         

     
      <View style={Titlestyles.items}>
        <FlatList style={{height:'85%'}}
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType})}>   
          <View style={Titlestyles.item}>
          <Button 
                style={Titlestyles.DetailsBtn}
                onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType})}
                title="عرض التفاصيل"
                titleProps={{}}
                //titleStyle={{ marginHorizontal: 1 }}
                color='#247ba0'
            />
            <Text style={Titlestyles.subTitle}>{item.Title}</Text>
            
          </View>
          </TouchableOpacity>
        )}

        /> 
       
        </View>
        
       
      </View> 

     
     { userType=='Investor' && <TouchableOpacity  
           style={Titlestyles.SignOutbutton} onPress={onSignout}>
          <Image source={SignOut} style={{ width: 25, height: 25 }}/>
          </TouchableOpacity>}
          
      { userType=='Entrepreneur' && <TouchableOpacity  
           style={Titlestyles.SignOutbutton} onPress={onSignout}>
          <Image source={SignOut} style={{ width: 25, height: 25 }}/>
        </TouchableOpacity>
}
           

      
      <View style={styles.BottomBar}> 

      { userType== 'Entrepreneur' && <TouchableOpacity  
             style={styles.addIcon} onPress={() => navigation.navigate('PublishIdea')}>
             <Image source={PlusIcon} style={{ width: 20, height: 20 }}/>
            </TouchableOpacity>}

            { userType== 'Entrepreneur' &&  
              <Image source={ProfileIcon} style={{ width: 30, height: 30  , marginLeft:30, marginTop:10} }/> }
              { userType== 'Entrepreneur' &&
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')} >
              <Image source={NotificationIcon} style={{ width: 30, height: 30  , marginLeft:105,marginTop:-28} }/>  
              </TouchableOpacity>} 
              { userType== 'Entrepreneur' && 
              <Image source={SearchIcon} style={{ width: 30, height: 30  , marginLeft:253, marginTop:-30} }/> }
              { userType== 'Entrepreneur' &&
              <TouchableOpacity style={[{marginLeft:290 , backgroundColor:'#cee5f2'}]}>
              <Image source={ClickedHomeIcon} style={{ width: 30, height: 30  , marginLeft:30 , marginTop:-30 , backgroundColor:'#cee5f2' } }/> 
              </TouchableOpacity>}



              { userType== 'Investor' &&  
              <Image source={ProfileIcon} style={{ width: 30, height: 30  , marginLeft:40, marginTop:10} }/> }
              { userType== 'Investor' &&
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')} >
              <Image source={NotificationIcon} style={{ width: 30, height: 30  , marginLeft:125,marginTop:-28} }/>  
              </TouchableOpacity>}  
              { userType== 'Investor' && 
              <Image source={SearchIcon} style={{ width: 30, height: 30  , marginLeft:225, marginTop:-30} }/> }
              { userType== 'Investor' &&
              <TouchableOpacity style={[{marginLeft:290 , backgroundColor:'#cee5f2'}]}>
              <Image source={ClickedHomeIcon} style={{ width: 30, height: 30  , marginLeft:30 , marginTop:-30  } }/> 
              </TouchableOpacity>}





            </View>
            <StatusBar style="auto" />
    </View>

    );




}


const styles = StyleSheet.create({
  addIcon: {
    position:'absolute',
    bottom:'47%',
    left:'46%',
    borderRadius:10,
    backgroundColor:'#536b78',
    justifyContent:'center',
    alignItems:'center',
    width:30,
    height:30
   
},

BottomBar:{
    position:'absolute',
    height:80,
    bottom:0,
    width:'100%',
    backgroundColor:'#7c98b3'

}

});
