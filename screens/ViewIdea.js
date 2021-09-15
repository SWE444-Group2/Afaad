import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';



export default function ViewIdea({ navigation }) {

    const [productsList , setproductsList]= useState();
   
    useEffect(() => {
       const dataref=AfaadFirebase.database().ref('ProductIdea')//When publishizing the idea we just need to push key named 'ProductIdea'
       dataref.on('value',(snapshot) =>{
          const productsList=[] // empty list
          const products= snapshot.val();   
          for (let productID in products){
               productsList.push(products[productID]);
          } 
          
          setproductsList(productsList)
          console.log(productsList)

          
        
          
          
       })
    }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>View Product Ideas</Text>
      <StatusBar style="auto" />    
      
      <View>
        <FlatList
        data={productsList}
        keyExtractor={(item) => item.key}    
        renderItem={({ item })=>(
          <TouchableOpacity  onPress={() => navigation.navigate('productIdea')}>
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