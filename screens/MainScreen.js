import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
//import styles from './styles';
//import Titlestyles from './TitleStyles';
import AfaadLogo from '../assets/images/LOGO.jpeg';
import TextLogo from '../assets/images/AfaadLogo.jpeg';

export default function MainScreen({ navigation }) {

   
        return(             
                <View style={styles.container}>

                <View style={styles.logo}>
                    <Image source={AfaadLogo} style={{ width: 121, height: 149 }}/>
                </View>

                <View style={styles.TextLogo}>
                    <Image source={TextLogo} style={{ width: 207, height: 46 }}/>
                </View>
                
                <TouchableOpacity  style={styles.button2} onPress={() => navigation.navigate('Login')}>
                     <Text style={styles.appButtonText}>تسجيل دخول</Text>
                 </TouchableOpacity>
                
                <TouchableOpacity  style={styles.button1} onPress={() => navigation.navigate('SignupOption')}>
                     <Text style={styles.appButtonText1}>إنشاء حساب </Text>
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
    logo:{
        alignSelf: 'center',
        marginTop:115,
    },

    TextLogo:{
        marginTop:70,
        alignSelf: 'center',

    },

    button1: {
        width: 213,
        height:52,
        borderRadius:6,
        marginTop: 40,
        alignSelf: 'center',
        //backgroundColor: "#ADCBD8",
        alignItems: "center",
        justifyContent: "center",
        borderWidth:2,
        borderColor:'#002B3E',
       
      },

    button2: {
        width: 213,
        height:52,
        borderRadius:6,
        marginTop: 40,
        alignSelf: 'center',
        backgroundColor: "#002B3E",
        alignItems: "center",
        justifyContent: "center",
      },
      appButtonText1:{
        fontFamily: 'AJannatLTBold',
        color:'#002B3E',
        textAlign:'center',
        alignSelf: "center",
        fontSize: 18,
  
      },
      appButtonText:{
        fontFamily: 'AJannatLTBold',
        color:'white',
        textAlign:'center',
        alignSelf: "center",
        fontSize: 18,
  
      },

});