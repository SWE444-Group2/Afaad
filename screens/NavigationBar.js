import React, { useState, useEffect } from 'react';
import { StyleSheet, View , TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
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

  //default is they are all outlined and white
  const [home, setHome] = useState("home-circle-outline") ;
  const [search, setSearch] = useState("feature-search-outline") ;
  const [plusIdea, setPlusIdea] = useState("plus-circle-outline") ;
  const [invested, setInvested] = useState("hand-holding-usd") ;
  const [notification, setNotification] = useState("bell-outline") ;
  const [profile, setProfile] = useState("account-box-outline") ;

  const [homeColro, setHomeColro] = useState("#fff") ;
  const [SearchColro, setSearchColro] = useState("#fff") ;
  const [plusIdeaColro, setPlusIdeaColro] = useState("#fff") ;
  const [investedColro, setInvestedColro] = useState("#fff") ;
  const [notificationColro, setNotificationColro] = useState("#fff") ;
  const [profileColro, setProfileColro] = useState("#fff") ;


  //except when the screen name matches the name passed then remove outline and change the color
  useEffect(() => {
    switch(ScreenName){
      case 'home':  setHome('home-circle'), setHomeColro("#022B3A") ; return ;
      case 'search':  setSearch('feature-search') ,setSearchColro("#022B3A"); return;
      case 'plus':  setPlusIdea('plus-circle'),setPlusIdeaColro("#022B3A"); return ;
      case 'invested': setInvested('hand-holding-usd') ,setInvestedColro("#022B3A"); return ;
      case 'notification': setNotification('bell') ,setNotificationColro("#022B3A"); return ;
      case 'profile'||'profileInv': setProfile('account-box'),setProfileColro("#022B3A"); return ;
    }
  }, [])


    return (
        <View style={styles.BottomBar}> 

            { userType== 'Entrepreneur' &&  
              <TouchableOpacity  onPress={() => navigation.navigate('profile',{userType: userType,userID:userID})}>
                <Icon name={profile} size={40} color={profileColro}/> 
              </TouchableOpacity>
            }

            { userType== 'Entrepreneur' &&
              <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                <Icon name={notification} size={40} color={notificationColro}/> 
              </TouchableOpacity>
            } 

            { userType== 'Entrepreneur' && 
              <TouchableOpacity  onPress={() => navigation.navigate('PublishIdea')}>
                <Icon name={plusIdea} size={40} color={plusIdeaColro}/>
              </TouchableOpacity>
            }

            { userType== 'Entrepreneur' && 
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name={search} size={40} color={SearchColro}/> 
              </TouchableOpacity>
            }
            
            { userType== 'Entrepreneur' &&
              <TouchableOpacity onPress={() => navigation.navigate("EntrepreneurAndInvestor")}>
                <Icon name={home} size={43} color={homeColro}/> 
              </TouchableOpacity>
            }


              { userType== 'Investor' &&  
                 <TouchableOpacity onPress={() => navigation.navigate('profileInv',{userType: userType,userID:userID})}>
                   <Icon name={profile} size={40} color={profileColro}/> 
                 </TouchableOpacity>
              }

              { userType== 'Investor' &&
                  <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                   <Icon name={notification} size={40} color={notificationColro}/> 
                  </TouchableOpacity>
              } 

              { userType== 'Investor' && 
                   <TouchableOpacity onPress={() => navigation.navigate('InvestedProductIdea',{userType: userType,userID:userID})}>
                     <FontAwesomeIcon name={invested} size={37} color={investedColro}/> 
                   </TouchableOpacity>
              }

              { userType== 'Investor' && 
                   <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                     <Icon name={search} size={40} color={SearchColro}/> 
                   </TouchableOpacity>
              }

              { userType== 'Investor' &&
              <TouchableOpacity onPress={() => navigation.navigate("EntrepreneurAndInvestor")}>
              <Icon name={home} size={43} color={homeColro}/> 
              </TouchableOpacity>
              }

            </View>
    ) ;
    
}

const styles = StyleSheet.create({

    BottomBar: {
      flex:1,
      justifyContent:'space-around',
      flexDirection: 'row',
      paddingTop: 10 ,
        position: 'absolute',
        height: 80,
        bottom: 0,
        width: '100%',
        backgroundColor: '#7c98b3'

    }

});

