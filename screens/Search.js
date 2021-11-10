import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image,Modal,Alert,TextInput} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationBar } from './NavigationBar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const auth = AfaadFirebase.auth();
//Check user type? 
// let user = AfaadFirebase.auth().currentUser;


export default function Search({ navigation, route }) { 

    const categories = 
       ['اعلام ونشر وتوزيع',
        'تجارة',
        'ترفيه وفنون', 
        'تعليم', 
        'تقنية معلومات',
        'زراعة', 
        'صناعة', 
        'عقار ومقاولات', 
        'مطاعم ومقاهي', 
        'آخرى']

        const[keyword ,setKeyword ]=useState('');

        const searchKey=(key)=>{
            setKeyword(key)
            navigation.navigate('SearchResult', {searchKey:keyword})
        }


    return (

        <View style={Titlestyles.container}>
          <View style={{ flex: 1,width:'100%',height:'13%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}], backgroundColor:'#7c98b3' , borderTopRightRadius:500 }}/>
       
            <View style={Titlestyles.tasksWrapper}>

            <Icon name = "magnify" style={{ marginTop:15} } size={40} color={"#fff"} onPress={() => navigation.navigate('SearchResult', {searchKey:keyword})}/> 

            <TextInput
              style={Titlestyles.input}
              onChangeText={(text) => setKeyword(text)}
              value={keyword}
              placeholder='ابحث هنا'
              underlineColorAndroid="transparent"
            />


            <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:36 ,color:'white', marginTop:24}]}>أو اختار فئة المشروع</Text>
      
                <View style={Titlestyles.categoriesContainer}>                
                <FlatList style={{height:'85%'}}
                data={categories}
                keyExtractor={(item, index)=>index.toString()}
                numColumns= {2}
                renderItem={({ item })=>(
                 <TouchableOpacity  onPress={() => navigation.navigate('SearchResult', {category:item})}  >   
                 <View style={Titlestyles.categories}>
               
            <Text style={Titlestyles.subTitle}>{item}</Text>
            
          </View>
          </TouchableOpacity>
        )}

        /> 
                </View>
                </View>
                {NavigationBar({navigation, ScreenName: 'search'})}
                </View>
)  

}