import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import SvgUri from "expo-svg-uri";
import { ScrollView } from 'react-native-gesture-handler';


let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function Favorites({ navigation , route}) {
  
     const[FavList ,setFavList ]=useState();
     
      useEffect(() => {
        let isUnmounted=false;
        const FavoritesRef = AfaadFirebase.database().ref('/Investor/'+route.params.userID+'/FavoriteIdeasList/');
        
        FavoritesRef.on('value',(snapshot) =>{
            global.Lcounter = 0;
            const FavList=[]
            const favs= snapshot.val();  
            for (let ideaID in favs) {
                FavList.push({ideaID,...favs[ideaID]});
              Lcounter++;
            } 
            
         if(!isUnmounted){
            setFavList(FavList);}
            
         });
  
         return()=>{
          isUnmounted=true;
  
         };
  
      }, [])
      console.log(route.params.userType)
    return (
  
      
      <View style={Titlestyles.container}>
  
        <StatusBar style="auto" />  
        <View style={styles.SVG}>
      <SvgUri  source={require('../assets/images/Frame.svg')} /> 
      </View>    
       
         <View style={Titlestyles.tasksWrapper}>
        <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:90 ,color:'white', marginTop:24}]}>مُفضلتك</Text>
      
           
  
       
        <View style={Titlestyles.items}>
            
        { global.Lcounter == 0 && <Text style = {Titlestyles.subTitle}>لم تضف مشروع الى مُفضلتك بعد</Text>}
  
          <FlatList style={{height:'85%'}}
          data={FavList}
          keyExtractor={(item, index)=>index.toString()}
          renderItem={({ item })=>(
            <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.ideaID, userType: route.params.userType})}>   
            <View style={Titlestyles.item}>
            <Button 
                  style={Titlestyles.DetailsBtn}
                  onPress={() => navigation.navigate('productIdea', {Product_id:item.ideaID, userType: route.params.userType})}
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
  const styles = StyleSheet.create({
    SVG:{
      alignItems: "center",
      position: 'absolute',
      marginTop:-40,
    
    }
})