import React, { useState, useEffect } from 'react';
import { StyleSheet, View , TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';


export function NavigationBar ({navigation, ScreenName}) {
  let user = AfaadFirebase.auth().currentUser;
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

  //default is they are all outlined 
  const [home, setHome] = useState("home-circle-outline") ;
  const [search, setSearch] = useState("feature-search-outline") ;
  const [plusIdea, setPlusIdea] = useState("plus-circle-outline") ;
  const [invested, setInvested] = useState("head-lightbulb-outline") ;
  const [notification, setNotification] = useState("bell-outline") ;
  const [profile, setProfile] = useState("account-box-outline") ;

  //except when the screen name matches the name passed then remove outline
  useEffect(() => {
    switch(ScreenName){
      case 'home':  setHome('home-circle') ; return ;
      case 'offers':  setHome('home-circle') ; return ;
      case 'search':  setSearch('feature-search') ; return;
      case 'plus':  setPlusIdea('plus-circle'); return ;
      case 'invested': setInvested('head-lightbulb') ; return ;
      case 'notification': setNotification('bell') ; return ;
      case 'profile': setProfile('account-box'); return ;
    }
  }, [])


    return (
        <View style={styles.BottomBar}> 

            { userType== 'Entrepreneur' &&  
              <TouchableOpacity  onPress={() => navigation.navigate('profile',{userType: userType,userID:userID})}>
                <Icon name={profile} style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            }

            { userType== 'Entrepreneur' &&
              <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                <Icon name={notification} style={{ marginLeft:'25%' , marginTop:-40} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            } 

            { userType== 'Entrepreneur' && 
              <TouchableOpacity  onPress={() => navigation.navigate('PublishIdea')}>
                <Icon name={plusIdea} style={{ marginLeft:'45%' , marginTop:-40} } size={40} color={"#fff"}/>
              </TouchableOpacity>
            }

            { userType== 'Entrepreneur' && 
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name={search} style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            }
            
            { userType== 'Entrepreneur' &&
              <TouchableOpacity onPress={() => navigation.navigate("EntrepreneurAndInvestor")}>
                <Icon name={home} style={{ marginLeft:'82%' , marginTop:-43 } } size={43} color={"#fff"}/> 
              </TouchableOpacity>
            }


              { userType== 'Investor' &&  
                 <TouchableOpacity onPress={() => navigation.navigate('profile',{userType: userType,userID:userID})}>
                   <Icon name={profile} style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
                 </TouchableOpacity>
              }

              { userType== 'Investor' &&
                  <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                   <Icon name={notification} style={{ marginLeft:'25%' , marginTop:-40} } size={40} color={"#fff"}/> 
                  </TouchableOpacity>
              } 

              { userType== 'Investor' && 
                   <TouchableOpacity onPress={() => navigation.navigate('InvestedProductIdea')}>
                     <Icon name={invested} style={{ marginLeft:'45%' , marginTop:-40} } size={37} color={"#fff"}/> 
                   </TouchableOpacity>
              }

              { userType== 'Investor' && 
                   <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                     <Icon name={search} style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
                   </TouchableOpacity>
              }

              { userType== 'Investor' &&
              <TouchableOpacity onPress={() => navigation.navigate("EntrepreneurAndInvestor")}>
              <Icon name={home} style={{ marginLeft:'83%' , marginTop:-43 } } size={43} color={"#fff"}/> 
              </TouchableOpacity>
              }

            </View>
    ) ;
    
}

const styles = StyleSheet.create({

    BottomBar: {
        position: 'absolute',
        height: 80,
        bottom: 0,
        width: '100%',
        backgroundColor: '#7c98b3'

    }

});

