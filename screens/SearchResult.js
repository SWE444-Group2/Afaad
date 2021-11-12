import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image , Icon } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import { ScrollView } from 'react-native-gesture-handler';


const auth = AfaadFirebase.auth();


export default function SearchResult({ navigation , route}) {


  let user = AfaadFirebase.auth().currentUser ;
  let userID, userType , userName;

   const[ResultList ,setResultList ]=useState();
   const[categoryList ,setCategoryList ]=useState();
   
    useEffect(() => {
      let isUnmounted=false;
       const dataref=AfaadFirebase.database().ref('ProductIdea')
    
       dataref.on('value',(snapshot) =>{
        const ResultList = []
        const products= snapshot.val();  
          for (let productID in products){
             
            ResultList.push({productID,...products[productID]});

          } 

          if(!isUnmounted){
            setResultList(ResultList);}

            global.counter = 0;
            const categoryList=[]
            if ( route.params.searchKey !== undefined){
                for(let productID in ResultList){
                    if (ResultList[productID].Title == route.params.searchKey) {
                        categoryList.push(ResultList[productID])
                        counter++;
                    }
                  }
            }
            else {for(let productID in ResultList){
            if (ResultList[productID].category == route.params.category.name) {
                categoryList.push(ResultList[productID])
                counter++;
            }
          }}

          if(!isUnmounted){
           setCategoryList(categoryList) ;}

        //   console.log(counter)
          
       });

       return()=>{
        isUnmounted=true;

       };

    }, [])
  //  console.log(userType)
  return (

    
    <View style={Titlestyles.container}>

      <StatusBar style="auto" />  
    <View style={{ flex: 1,width:'100%',height:'10%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}] }}/>

     
       <View style={Titlestyles.tasksWrapper}>
      <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:35 , marginTop:15}]}>نتائج البحث</Text>
    
         

     
      <View style={Titlestyles.items}>
      { global.counter == 0 && <Text style = {Titlestyles.subTitle}>لا توجد مشاريع لهذه الفئة</Text>}

        <FlatList style={{height:'85%'}}
        data={categoryList}
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

      

    </View>

    
    
  );
  
}


