import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from '../assets/images/plusIcon.png';
import HomeIcon from '../assets/images/HomeIcon.png';
import SearchIcon from '../assets/images/SearchIcon.png';
import ClickedNotificationIcon from '../assets/images/ClickedNotificationIcon.png'
import ProfileIcon from '../assets/images/ProfileIcon.png'
import Titlestyles from './TitleStyles';
import AfaadFirebase from '../screens/firebaseConfig';
export default function Notifications({ navigation }) {

    let user = AfaadFirebase.auth().currentUser ;
  let userID, userType , userName;

  if(user){
    userID = user.uid ;
    AfaadFirebase.database().ref('/Admin/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Admin' ;
      }})
    AfaadFirebase.database().ref('/Entrepreneur/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Entrepreneur' ;
        userName = snapshot.child('FirstName').val()
      }
    })
    AfaadFirebase.database().ref('/Investor/'+userID).on('value', (snapshot) => {
      if (snapshot.exists()) {
        userType = 'Investor' ;
        userName = snapshot.child('FullName').val()
      }
    })
  }

    return(
        <View style={Titlestyles.container}>

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
            <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
          </TouchableOpacity>
      }

      { userType== 'Investor' &&
          <TouchableOpacity  >
             <Icon name="bell" style={{ marginLeft:'25%' , marginTop:-38} } size={35} color={"#fff"}/> 
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
    );


    
      
}


const styles = StyleSheet.create({
    
  BottomBar:{ 
    position:'absolute',
    height:80,
    bottom:0,
    width:'100%',
    backgroundColor:'#7c98b3'
  
  }
  });