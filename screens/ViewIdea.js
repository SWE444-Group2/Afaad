import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState} from 'react';
import { StyleSheet, Text, View , Button, Pressable, SnapshotViewIOSBase } from 'react-native';
import { color } from 'react-native-reanimated';
import AfaadFirebase from './firebaseConfig';



export default function ViewIdea({ navigation }) {

    const [productsList , setproductsList]= useState();
   
    useEffect(() => {
       const dataref=AfaadFirebase.database().ref('ProductIdea')//When publishizing the idea we just need to push key named 'ProductIdea'
       dataref.on('value',(snapshot) =>{
          const products= snapshot.val();
          const productsList=[] // empty list
          for (let productID in products){
               productsList.push(products[productID]);
          } 
          
          setproductsList(productsList)

        
          
          
       })
    }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>عرض المنتجات</Text>
      <StatusBar style="auto" />  
    
    
        {productsList ? productsList.map((product)=><Text style={styles.Text}>{product.Title}</Text>): "No Products Found"}
   
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',   
  },
  Text: {
      marginTop:20,
      marginRight:10,
      fontSize: 30,
      
  }
});