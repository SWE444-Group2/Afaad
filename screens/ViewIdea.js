import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';



export default function ViewIdea({ navigation }) {

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
            if(productsList[productID].status=='Pending'){
              PendingProductList.push(productsList[productID]) } 
            }

           setPendingproductsList(PendingProductList) ;
            console.log(PendingProductList);

          
       })
    }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>View Product Ideas</Text>
      <StatusBar style="auto" />    
      
      <View>
        <FlatList
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID})
          }>   
            <Text style={styles.Title}>{item.Title}</Text>
          </TouchableOpacity>
        )}

        /> 
      </View> 
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center'
    
  },
  Text: {
    
    marginTop:20 ,
      fontSize: 40,
     
      
  },
  Title :{
    fontSize:35 ,   
    marginTop:20 ,
    color: 'dodgerblue',
    
  }

});