import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';


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
       const dataref=AfaadFirebase.database().ref('ProductIdea')
    
       dataref.on('value',(snapshot) =>{
          const productsList=[] // empty list
          const products= snapshot.val();  
          for (let productID in products){
               productsList.push({productID,...products[productID]});
          } 

          setproductsList(productsList);
        

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
           setPendingproductsList(PendingProductList) ;

          
       })

       
    }, [])
  return (
    <View style={Titlestyles.container}>
       { userType=='Entrepreneur'&&
      <Text style={Titlestyles.sectionTitle}> مرحبا {userName}،</Text>}
        { userType=='Investor'&&
      <Text style={Titlestyles.sectionTitle}> مرحبا {userName}،</Text>}
       <View style={Titlestyles.tasksWrapper}>
      <Text style={Titlestyles.sectionTitle}>عرض الافكار</Text>
         
      <View style={Titlestyles.items}>
        <FlatList
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
     { userType=='Investor' && <Button 
                onPress={onSignout}
                title="تسجيل خروج"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
            />}
      { userType=='Entrepreneur' && <Button 
                onPress={onSignout}
                title="تسجيل خروج"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
            />}
            { userType== 'Entrepreneur' &&
<Button 
                name="add"
                title="أنشر مشروع"
                onPress={() => navigation.navigate('PublishIdea')}
                size={70}
                type="material"
            />}
    </View>
    
  );
  
}

