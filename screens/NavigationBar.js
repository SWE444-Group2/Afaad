import React from 'react';
import { StyleSheet, View , TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';


export function NavigationBar ({navigation}) {

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

  console.log(userType);
    return (
        <View style={styles.BottomBar}> 

            { userType== 'Entrepreneur' &&  
              <TouchableOpacity  onPress={() => navigation.navigate('profile',{userType: userType,userID:userID})}>
                <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            }

            { userType== 'Entrepreneur' &&
              <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                <Icon name="bell-outline" style={{ marginLeft:'25%' , marginTop:-40} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            } 

            { userType== 'Entrepreneur' && 
              <TouchableOpacity  onPress={() => navigation.navigate('PublishIdea')}>
                <Icon name="plus-circle-outline" style={{ marginLeft:'45%' , marginTop:-40} } size={40} color={"#fff"}/>
              </TouchableOpacity>
            }

            { userType== 'Entrepreneur' && 
              <TouchableOpacity>
                <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            }
            
            { userType== 'Entrepreneur' &&
              <TouchableOpacity>
                <Icon name="home-circle" style={{ marginLeft:'82%' , marginTop:-43 } } size={43} color={"#fff"}/> 
              </TouchableOpacity>
            }


              { userType== 'Investor' &&  
                 <TouchableOpacity onPress={() => navigation.navigate('profile')} >
                   <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
                 </TouchableOpacity>
              }

              { userType== 'Investor' &&
                  <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                   <Icon name="bell-outline" style={{ marginLeft:'25%' , marginTop:-40} } size={40} color={"#fff"}/> 
                  </TouchableOpacity>
              } 

              { userType== 'Investor' && 
                   <TouchableOpacity onPress={() => navigation.navigate('InvestedProductIdea')}>
                     <Icon name="head-lightbulb-outline" style={{ marginLeft:'45%' , marginTop:-40} } size={37} color={"#fff"}/> 
                   </TouchableOpacity>
              }

              { userType== 'Investor' && 
                   <TouchableOpacity>
                     <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
                   </TouchableOpacity>
              }

              { userType== 'Investor' &&
              <TouchableOpacity>
              <Icon name="home-circle" style={{ marginLeft:'83%' , marginTop:-43 } } size={43} color={"#fff"}/> 
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

