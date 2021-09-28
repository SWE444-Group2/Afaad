import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import styles from './styles';
//import Titlestyles from './TitleStyles';


export default function SignupOption({ navigation }) {

   
        return(             
                <View style={styles.container}>

                    <Text>تسجيل المستثمرين</Text>
                    <Text>تسجيل رواد الأعمال</Text>      
               
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
        marginLeft:150,
        marginTop:115,
    },

    TextLogo:{
        marginTop:70,
        marginLeft:100,

    },

    button1: {
        width: 213,
        height:52,
        borderRadius:6,
        margin: 40,
        marginLeft:100,
        backgroundColor: "#ADCBD8",
        alignItems: "center",
        justifyContent: "center",
       
      },

    button2: {
        width: 213,
        height:52,
        borderRadius:6,
        marginLeft:100,
        backgroundColor: "#002B3E",
        alignItems: "center",
        justifyContent: "center",
      },

      appButtonText:{
        fontFamily: 'AJannatLTBold',
        color:'white',
        textAlign:'center',
        alignSelf: "center",
        fontSize: 18,
       
       
      },

});