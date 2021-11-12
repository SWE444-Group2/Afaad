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
       ['اعلام ونشر',
        'تجارة',
        'ترفيه وفنون', 
        'تعليم', 
        'تقنية معلومات',
        'زراعة', 
        'صناعة', 
        'عقار ومقاولات', 
        'مطاعم ومقاهي', 
        'آخرى']

    global.dict = 
        [{name : 'تجارة',
            logo : 'domain'},
        {name : 'اعلام ونشر',
            logo : 'play-network-outline'},
        {name : 'ترفيه وفنون',
            logo : 'palette'},
        {name : 'تعليم',
            logo : 'school-outline'},
        {name : 'تقنية معلومات',
            logo : 'xml'},
        {name : 'زراعة',
            logo : 'sprout-outline'},
        {name : 'صناعة',
            logo : 'robot-industrial'},
        {name : 'عقار ومقاولات',
            logo : 'home-group'},
        {name : 'مطاعم ومقاهي',
            logo : 'silverware'},
        {name : 'آخرى',
            logo : 'dots-horizontal'}
]

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

                <FlatList style={{height:'72%'}}
                data={dict}
                keyExtractor={(item, index)=>index.toString()}
                numColumns= {2}
                renderItem={({ item })=>(
                 <TouchableOpacity  onPress={() => navigation.navigate('SearchResult', {category:item})}  >   
                 <View style={Titlestyles.categories}>
                 <Icon name={item.logo} style={{ marginTop:-30} } size={70} color={"#7c98b3"} />
 
            <Text style={Titlestyles.subTitle}>{item.name}</Text>
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