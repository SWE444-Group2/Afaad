import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image , Icon } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import SignOut from '../assets/images/SignOut.png';
import PlusIcon from '../assets/images/plusIcon.png';
import Background from '../assets/images/Background.jpg';
import SvgUri from "expo-svg-uri";
let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function ViewIdea({ navigation }) {

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

      <StatusBar style="auto" />  


       { userType=='Entrepreneur'&&
      <Text style={[Titlestyles.sectionTitle ,{marginTop:'5%' , right:'5%'}] }> مرحبا، {userName}</Text>}
        { userType=='Investor'&&
      <Text style={[Titlestyles.sectionTitle ,{marginTop:'5%'}] }> مرحبا، {userName}</Text>}
     
       <View style={Titlestyles.tasksWrapper}>
    
         
            <View style={styles.SVG}>
            <SvgUri  source={require('../assets/images/Frame.svg')} /> 
            </View>  
            <Text style={styles.title}> عرض الافكار</Text>

     
      <View style={styles.items}>
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
            { userType== 'Entrepreneur' && <TouchableOpacity  
             style={styles.addIcon} onPress={() => navigation.navigate('PublishIdea')}>
             <Image source={PlusIcon} style={{ width: 60, height: 60 }}/>
            </TouchableOpacity>}

      

    </View>

    
    
  );
  
}


const styles = StyleSheet.create({
  addIcon: {
    bottom:'2%',
    left:'5%',
    height:80,
    width:80,
    backgroundColor:'#7c98b3',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
   
},
SVG:{
    alignItems: "center",
    position: 'absolute',
    marginTop:-40 
  
  },
  title: {
    fontFamily: 'AJannatLTBold',
    fontSize:35,
    fontWeight:'bold',
    textAlign: 'right',
    color:'white' ,
    paddingTop: 40,
    paddingRight:20,
  },
  items:{
    height:'75%',
    marginTop:50,


},
});

