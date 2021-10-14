import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
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

{ userType== 'Entrepreneur' && <TouchableOpacity  
       style={styles.addIcon} onPress={() => navigation.navigate('PublishIdea')}>
       <Image source={PlusIcon} style={{ width: 20, height: 20 }}/>
      </TouchableOpacity>}

      { userType== 'Entrepreneur' &&  
        <Image source={ProfileIcon} style={{ width: 30, height: 30  , marginLeft:30, marginTop:10} }/> }
        { userType== 'Entrepreneur' &&
        <TouchableOpacity >
        <Image source={ClickedNotificationIcon} style={{ width: 30, height: 30  , marginLeft:105,marginTop:-28 , backgroundColor:'#cee5f2'} }/>
        </TouchableOpacity>  } 
        { userType== 'Entrepreneur' && 
        <Image source={SearchIcon} style={{ width: 30, height: 30  , marginLeft:253, marginTop:-30} }/> }
        { userType== 'Entrepreneur' &&
        <TouchableOpacity style={[ {marginLeft:290}]} onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
        <Image source={HomeIcon} style={{ width: 30, height: 30  , marginLeft:30 , marginTop:-30,} }/> 
        </TouchableOpacity>}



        { userType== 'Investor' &&  
        <Image source={ProfileIcon} style={{ width: 30, height: 30  , marginLeft:40, marginTop:10} }/> }
        { userType== 'Investor' &&
        <TouchableOpacity style={{backgroundColor:'#7c98b3'}}>
        <Image source={ClickedNotificationIcon} style={{ width: 30, height: 30  , marginLeft:125,marginTop:-28 , backgroundColor:'#cee5f2'} }/>
        </TouchableOpacity>  } 
        { userType== 'Investor' && 
        <Image source={SearchIcon} style={{ width: 30, height: 30  , marginLeft:225, marginTop:-30} }/> }
        { userType== 'Investor' &&
        <TouchableOpacity style={[ {marginLeft:290}]} onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
        <Image source={HomeIcon} style={{ width: 30, height: 30  , marginLeft:30 , marginTop:-30,} }/> 
        </TouchableOpacity>}





      </View>
      <StatusBar style="auto" />
        </View>
    );


    
      
}


const styles = StyleSheet.create({
    addIcon: {
      position:'absolute',
      bottom:'47%',
      left:'46%',
      borderRadius:10,
      backgroundColor:'#536b78',
      justifyContent:'center',
      alignItems:'center',
      width:30,
      height:30
     
  },
  
  BottomBar:{ 
    position:'absolute',
    height:80,
    bottom:0,
    width:'100%',
    backgroundColor:'#7c98b3'
  
  }
  });