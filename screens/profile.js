
import Constants from 'expo-constants';
import ViewIdea from './ViewIdea';
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import SignOut from '../assets/images/SignOut.png';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from '../assets/images/plusIcon.png';
import Background from '../assets/images/Background.jpg';
import ClickedHomeIcon from '../assets/images/ClickedHomeIcon.png';
import SearchIcon from '../assets/images/SearchIcon.png';
import NotificationIcon from '../assets/images/NotificationIcon.png'
import ProfileIcon from '../assets/images/ProfileIcon.png'
import  {Notfication}  from './Notfication';
import { ScrollView } from 'react-native-gesture-handler';

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();

export default function Profile ({ navigation }) {
    //signout function
  const onSignout = () => {
    auth.signOut();
    navigation.reset({
        index: 0,
        routes: [{ name: 'MainScreen' }],
    });
};
return (
    <View style={Titlestyles.container}>
 <View style={styles.header}>

</View>
<Image style={styles.avatar} source={{uri:'https://www.pngkey.com/png/full/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png'}}/>



    <View style={styles.BottomBar}> 
    
    
    
          { userType== 'Entrepreneur' &&  
              <TouchableOpacity >
                <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
          }
    
          { userType== 'Entrepreneur' &&
              <TouchableOpacity  >
                <Icon name="bell" style={{ marginLeft:'25%' , marginTop:-38} } size={35} color={"#fff"}/> 
              </TouchableOpacity>
          } 
    
          { userType== 'Entrepreneur' && 
              <TouchableOpacity onPress={() => navigation.navigate('PublishIdea')}>
                <Icon name="plus-circle-outline" style={{ marginLeft:'45%' , marginTop:-40} } size={40} color={"#fff"}/>
              </TouchableOpacity>}
    
          { userType== 'Entrepreneur' && 
              <TouchableOpacity>
                <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
          }
          { userType== 'Entrepreneur' &&
            <TouchableOpacity onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
                <Icon name="home-circle-outline" style={{ marginLeft:'83%' , marginTop:-43 } } size={43} color={"#fff"}/> 
            </TouchableOpacity>
          }
        
          { userType== 'Investor' &&  
              <TouchableOpacity >
                <Icon name="account-box" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
          }
    
          { userType== 'Investor' &&
              <TouchableOpacity  >
                 <Icon name="bell-outline" style={{ marginLeft:'25%' , marginTop:-40} } size={37} color={"#fff"}/> 
              </TouchableOpacity>
          } 
    
          { userType== 'Investor' && 
              <TouchableOpacity>
                  <Icon name="lightbulb-on-outline" style={{ marginLeft:'45%' , marginTop:-43} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
          }
    
          { userType== 'Investor' && 
            <TouchableOpacity>
                 <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
            </TouchableOpacity>
          }
    
          { userType== 'Investor' &&
            <TouchableOpacity onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
                  <Icon name="home-circle-outline" style={{ marginLeft:'83%' , marginTop:-43 } } size={43} color={"#fff"}/> 
            </TouchableOpacity>
          }
          </View>
          <StatusBar style="auto" />
            </View>

)
};

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#7c98b3",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
    
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    BottomBar:{ 
        position:'absolute',
        height:80,
        bottom:0,
        width:'100%',
        backgroundColor:'#7c98b3'
      
      }
  
  });