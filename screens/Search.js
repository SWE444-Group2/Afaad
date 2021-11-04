import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image,Modal,Alert,TextArea} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from '../assets/images/plusIcon.png';
import Background from '../assets/images/Background.jpg';
import ClickedHomeIcon from '../assets/images/ClickedHomeIcon.png';
import SearchIcon from '../assets/images/SearchIcon.png';
import NotificationIcon from '../assets/images/NotificationIcon.png'
import ProfileIcon from '../assets/images/ProfileIcon.png'
import { ScrollView } from 'react-native-gesture-handler';
import InvestorLogo from '../assets/images/business-and-finance.png';
import { NavigationBar } from './NavigationBar';

const auth = AfaadFirebase.auth();
//Check user type? 
// let user = AfaadFirebase.auth().currentUser;


export default function Search({ navigation, route }) { 


    return (

        <View style={Titlestyles.container}>
          <Image source={Background} style={{ flex: 1,width:'100%',height:'13%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}] }}/>
       
            <View style={Titlestyles.tasksWrapper}>
              
            <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:36 , marginTop:35}]}>الرجاء إختيار فئة المشروع</Text>
      
                <View style={Titlestyles.items}>
                <Text style={[Titlestyles.subTitle ,{fontSize:15 , marginBottom:15 , marginTop:10}]}>not yet implemnted...</Text>
                </View>
                </View>
                {NavigationBar({navigation, ScreenName: 'search'})}
                </View>
)  

}