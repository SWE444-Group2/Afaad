import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button} from 'react-native';
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
       <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>عرض الافكار</Text>
         
      <View style={styles.items}>
        <FlatList
        data={PendingProductList}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=>(
          <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID})}>   
          <View style={styles.item}>
            <Text style={styles.Accounts}>{item.Title}</Text>
            <Button style={styles.button}
                onPress={() => navigation.navigate('productIdea', {Product_id:item.productID})}
                title="عرض التفاصيل"
                titleProps={{}}
                //titleStyle={{ marginHorizontal: 1 }}
            />
          </View>
          </TouchableOpacity>
        )}

        /> 
        </View>
      </View> 
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
    tasksWrapper:{
      paddingTop:80,
      paddingHorizontal:20,
    },
    sectionTitle:{
      fontSize:24,
      fontWeight:'bold',
      paddingBottom: 20,
      textAlign: 'right'
    },
    items:{

    
    },
    item:{
      backgroundColor:'#FFF',
      padding:15,
      borderRadius:10,
      flexDirection:'row',
     // alignItems:'center',
      justifyContent:"space-between",
      marginBottom:20,
     
    
    },
    Accounts:{
      fontSize:18,
      fontWeight:'bold',
      textAlign: 'right'
      
    },


});