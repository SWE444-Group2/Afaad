import * as React from 'react';
import { Text, View, StyleSheet ,Image,TouchableOpacity  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';
import ideaLogo from '../assets/images/idea1.png';
import accountLogo from '../assets/images/account.png';
import SignOut from '../assets/images/SignOut.png';
import Background from '../assets/images/Background.jpg';
import SvgUri from "expo-svg-uri";
//sprint 2 here 
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

            <View style={styles.SVG}>
            <SvgUri  source={require('../assets/images/Frame.svg')} /> 
            </View>  
            <Text style={styles.title}> مرحبا مشرف</Text>

          

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
        

          <StatusBar style="auto" />
     
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
SVG:{
    alignItems: "center",
    position: 'absolute',
    marginTop:-40 
  
  },
  title: {
    fontFamily: 'AJannatLTBold',
    fontSize:35,
    fontWeight:'bold',
    textAlign: 'right',
    color:'white' ,
    paddingTop: 40,
    paddingRight:20,
  },

});
