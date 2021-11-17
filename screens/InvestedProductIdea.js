import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Titlestyles from './TitleStyles';
import AfaadFirebase from './firebaseConfig';
import { NavigationBar } from './NavigationBar';
import SvgUri from "expo-svg-uri";
import { useState } from 'react';
import {useEffect } from 'react';


export default function InvestedProductIdea({ navigation }) {

  
  let user = AfaadFirebase.auth().currentUser ;
  let userID, userType , userName;
  let InvestedIdeaList=[];
 

    const [productList,setProductList] = useState([]);
    const [idList,setidList] = useState([]);
    //const[InvestedIdeaList,setInvestedList]=useState([]);

    //Loop and save all the produbt id in array
    useEffect(()=>{
    AfaadFirebase
    .database()
    .ref("ProductIdea")
    .on("value", (snapshot) =>{
      let data = [];
      snapshot.forEach((child)=>{
        data.push(child.key);
      })
     setProductList(data);
    });

    },[])
    console.log(productList)
  
   

    useEffect(()=>{
      for(let i=0; i<=productList.length;i++){

      AfaadFirebase
      .database()
      .ref("ProductIdea/"+""+productList[i]+""+"/InvestorsList/")
      .on("value", (snapshot) =>{
        let data = [];
        snapshot.forEach((child)=>{
          data.push(child.key);
        })
       setidList(data);

       for(let j=0; j<=idList.length;j++){

        if(idList[j]==userID){    
          InvestedIdeaList.push(productList[i])
          break;
          }

        }

        });

      }

},[])
console.log(idList)//empty
console.log(InvestedIdeaList)//empty
    

/*
    for(let i=0 ; i<= productList.length; i++){
      useEffect(()=>{
        AfaadFirebase
        .database()
        .ref("ProductIdea/"+productList[i]+"/InvestorList/")
        .on("value", (snapshot) =>{
          let data = [];
          snapshot.forEach((child)=>{
            data.push(child);
          })
         setProductList(data);
        });
    
        },[])
    }
    */
 

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

      <View style={styles.SVG}>
      <SvgUri  source={require('../assets/images/Frame.svg')} /> 
      </View>

      <Text style={styles.title}>الأفكار المستثمره</Text>


  

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
  
  },
  SVG:{
    alignItems: "center",
    position: 'absolute',
  
  },
  title: {
    fontFamily: 'AJannatLTBold',
    fontSize:40,
    fontWeight:'bold',
    textAlign: 'right',
    color:'white' ,
    paddingTop: 55,
    paddingRight:20,
  },
  });