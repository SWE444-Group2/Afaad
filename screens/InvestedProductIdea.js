import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Titlestyles from './TitleStyles';
import AfaadFirebase from './firebaseConfig';
import { NavigationBar } from './NavigationBar';

export default function InvestedProductIdea({ navigation }) {

  
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

      {NavigationBar({navigation, ScreenName: 'invested'})}

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