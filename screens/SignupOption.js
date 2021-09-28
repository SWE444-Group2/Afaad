import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import styles from './styles';


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
   
      Box1:{
        width:155,
        height:155,
        backgroundColor: "#ADCBD8",
        borderRadius:6,
    },

      Box2:{
          width:155,
          height:155,
          backgroundColor: "#002B3E",
          borderRadius:6,
      },

      item:{
     // backgroundColor:'#536B78',
        padding:30,
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

});