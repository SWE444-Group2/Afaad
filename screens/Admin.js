import * as React from 'react';
import { Text, View, StyleSheet ,Image,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Button, Icon } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';
import ideaLogo from '../assets/images/idea1.png';
import accountLogo from '../assets/images/account.png';
import SignOut from '../assets/images/SignOut.png';


let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function welcome({ navigation }) {
    //signout function
    const onSignout = () => {
        auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
        });
    };

   
    return(        
                 
      <View style={styles.container}>


      <View><Text style={TitleStyles.TitleFix}>مرحبا مشرف</Text></View>
          

          <View style={styles.item}>

                  <View style={styles.Box1}>

                  <TouchableOpacity   onPress={() => navigation.navigate('ViewIdea')}>
                  <Image source={ideaLogo} style={styles.icons}/>
                  <Text style={styles.TextBox}>تفعيل المشاريع </Text>
                  </TouchableOpacity>

                  </View>

                  <View style={styles.Box2}>
                  <TouchableOpacity   onPress={() => navigation.navigate('ViewAccount')}>
                  <Image source={accountLogo} style={styles.icons} />
                  <Text style={styles.TextBox}>تفعيل الحسابات </Text>
                  </TouchableOpacity>

                  </View>
  

          </View>

          <TouchableOpacity  style={TitleStyles.SignOutbutton} onPress={onSignout}>
          <Image source={SignOut} style={{ width: 25, height: 25 }}/>
          </TouchableOpacity>
        
     
      </View>
   );

}

const styles= StyleSheet.create({

container:{
flex:1,
backgroundColor:'#FFFFFF',
//justifyContent:'center',
//alignItems:'center',
},

Box1:{
width:155,
height:155,
backgroundColor: "#ADCBD8",
borderRadius:6,
margin:10,
},

Box2:{
width:155,
height:155,
backgroundColor: "#002B3E",
borderRadius:6,
margin:10,
},

item:{
// backgroundColor:'#536B78',
padding:10,
//   borderRadius:10,
flexDirection:'row',
// alignItems:'center',
justifyContent:"space-between",
margin:10,
marginTop:180, 
//   marginBottom:30, 
},

icons:{
marginLeft:50,
marginTop:35,
},

TextBox:{
fontFamily: 'AJannatLT',
fontSize:18,
color:'#FFF',
textAlign:'center'

},




});
