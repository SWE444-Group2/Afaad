import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import styles from './styles';
import InvestorLogo from '../assets/images/investorr.png';
import EntrLogo from '../assets/images/Entr.png';
import Titlestyles from './TitleStyles';
export default function SignupOption({ navigation }) {
       return(        
             <View style={styles.container}>
                <View style={Titlestyles.tasksWrapper}>
                <Text style={[styles.sectionTitle]}>حدد النوع الخاص بك</Text>

                  <View style={styles.item}>

                    <View style={styles.rectangle1}>

                    <TouchableOpacity   onPress={() => navigation.navigate('SignUpEntr')}>
                    <Text style={styles.TextBox}>تسجيل رواد الأعمال </Text>
                    <Image source={EntrLogo} style={styles.icons}/> 
                    </TouchableOpacity>
                   
                    </View>

                    <View style={styles.rectangle1}>

                    <TouchableOpacity   onPress={() => navigation.navigate('SignUpInvst')}>
                    <Text style={styles.TextBox}>تسجيل المستثمرين </Text>
                    <Image source={InvestorLogo} style={styles.icons} />
                    </TouchableOpacity>

                    </View>


                  </View>
                </View>
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
   



      item:{
     // backgroundColor:'#536B78',
       padding:50,
     //   borderRadius:10,
      //  flexDirection:'row',
        alignItems:'center',
       // justifyContent:"space-between",
       // margin:10,
       // marginTop:180, 
     //   marginBottom:30, 
   },

   

   TextBox:{
    fontFamily: 'AJannatLT',
    fontSize:18,
    color:'#637081',
    textAlign:'center',
    marginTop:50,
    marginRight:20,
    

   },
   sectionTitle:{ 
    fontFamily: 'AJannatLTBold',
    fontSize:24,
    fontWeight:'bold',
    textAlign: 'right',
    color:'#536b78',
    paddingTop:30,

  },
    
  
  rectangle1:{
    borderRadius:6,
    width: 350,
    height:130,
    backgroundColor: "#EAF0F2",
    margin:20,
   
  },
  icons:{
      marginTop:-65,
      marginLeft:250,

    },

});