import * as React from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button } from 'react-native';
//import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Titlestyles from './TitleStyles';
import AfaadFirebase from './firebaseConfig';
import { NavigationBar } from './NavigationBar';
import SvgUri from "expo-svg-uri";
import { useState } from 'react';
import {useEffect } from 'react';


export default function InvestedProductIdea({ navigation }) {

  const[accept,setAccept]=useState(true);
  const[reject,setReject]=useState(false);


  let user = AfaadFirebase.auth().currentUser ;
  const auth = AfaadFirebase.auth();
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

  const [productsList , setproductsList]= useState();
  const[PendingProductList ,setPendingproductsList ]=useState();

//Brings pending

  useEffect(() => {

     let isUnmounted=false;

     const dataref=AfaadFirebase.database().ref('ProductIdea')
  
     dataref.on('value',(snapshot) =>{
        const productsList=[] // empty list
        const products= snapshot.val();  
        for (let productID in products){
             productsList.push({productID,...products[productID]});
        } 

        if(!isUnmounted){
        setproductsList(productsList);
      }
      
        const PendingProductList=[]
        //onst AcceptedProductList=[]
        for(let productID in productsList){
  
         if (userType === 'Investor' && productsList[productID].status == 'Accepted' && productsList[productID].InvestorsList!=null) {
            let inv= Object.keys(productsList[productID].InvestorsList)
            for(let i in inv){
              if(inv[i]==userID ){
                 PendingProductList.push(productsList[productID])
                }//end if

            }//end for

        } //end big if  

   }//end big for

          if(!isUnmounted){
            setPendingproductsList(PendingProductList)
          }   
     });

     return()=>{
      isUnmounted=true;

     };

  }, [])
  
  //All the accepted list
  const acceptedList=[]
  for(let accepted in PendingProductList){
        if(PendingProductList[accepted].InvestorsList[userID].status=='Accepted'){
          acceptedList.push(PendingProductList[accepted])   
        }
  }
  //All the rejected list
  const RejectedList=[]
  for(let rejected in PendingProductList){
    if(PendingProductList[rejected].InvestorsList[userID].status=='Rejected'){
      RejectedList.push(PendingProductList[rejected])   
    }
}

const renderAcceptedList = () => {
  setAccept(true)
  setReject(false)
} 

const renderRejectedList = () =>{ 
  setReject(true)
  setAccept(false)
}

  return(
    
        <View style={Titlestyles.container}>

      {NavigationBar({navigation, ScreenName: 'invested'})}

      <View style={styles.SVG}>
      <SvgUri  source={require('../assets/images/Frame.svg')} /> 
      </View>

      <Text style={styles.title}>المشاريع المستثمره</Text>



       <View style={{backgroundColor:"white", padding: 24,marginTop:"15%"}}>
   
       
      <View style={styles.items}>

                  <View style={styles.ViewButton}>


                  <TouchableOpacity style={reject ? styles.Abutton : styles.Rbutton} onPress={renderRejectedList} >
                   <Text style={reject ? styles.AtextButton: styles.RtextButton}>العروض المرفوضة</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={accept ? styles.Abutton : styles.Rbutton } onPress={renderAcceptedList}>
                   <Text style={accept ? styles.AtextButton: styles.RtextButton}>العروض المقبولة</Text>
                  </TouchableOpacity>
                  </View>

          {/*  Accepted List */}

          { accept == true && (

          <FlatList style={{height:'85%'}}

              
          data={acceptedList}
          keyExtractor={(item, index)=>index.toString()}

          renderItem={({ item })=>(

            <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType , user_ID:userID })}>   
   
          {userType=='Investor' && item.InvestorsList[userID].status!='Pending' && (
            <View style={Titlestyles.item}>

              <View style={{borderTopRightRadius:15}}>
            
            {/*   
            <Button 
                  style={Titlestyles.DetailsBtn}
                  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType, user_Name:userName})}
                  title= 
                  { item.InvestorsList[userID].status=='Accepted' ?
                    'مقبول'  : 'مرفوض' }

                  titleProps={{}}
                  //titleStyle={{ marginHorizontal: 1 }}
                  color='#247ba0'/>
                  */}
              
                  <Text style={{     
                      backgroundColor: item.InvestorsList[userID].status=='Accepted' ? 
                      //Accepted
                      '#87c38f' : 
                      item.InvestorsList[userID].status=='Rejected' ? 
                      //Rejected
                      '#c75146':
                      //Pending
                      '#7c98b3' , 

                      color:'white',
                      textAlign:'center',
                      width:80,
                      marginTop:-10,
                      marginLeft:-10,
                      overflow:'hidden',
                      fontFamily: 'AJannatLT',
                      } }>  
                      { item.InvestorsList[userID].status=='Accepted' ? 
                          'مقبول': 
                        item.InvestorsList[userID].status=='Rejected' ? 
                          'مرفوض' :
                          'قيد المراجعة' 
                          } 
                   </Text>
                  

              </View>

              <Text style={Titlestyles.subTitle}>{item.Title}</Text>
              
            </View> )}
            </TouchableOpacity>
          )}

          />  )}

          {/*  Rejected List */}

          
          { reject== true &&
          
          <FlatList style={{height:'85%'}}

              
          data={RejectedList}
          keyExtractor={(item, index)=>index.toString()}

          renderItem={({ item })=>(

            <TouchableOpacity  onPress={() => navigation.navigate('productIdea', {Product_id:item.productID, userType: userType , user_ID:userID  })}>   
          
          {userType=='Investor' && item.InvestorsList[userID].status!='Pending' && (
            <View style={Titlestyles.item}>

              <View style={{borderTopRightRadius:15}}>
              <Text style={{     
                      backgroundColor: item.InvestorsList[userID].status=='Accepted' ? 
                      //Accepted
                      '#87c38f' : 
                      item.InvestorsList[userID].status=='Rejected' ? 
                      //Rejected
                      '#c75146':
                      //Pending
                      '#7c98b3' , 
                      color:'white',
                      textAlign:'center',
                      width:80,
                      marginTop:-10,
                      marginLeft:-10,
                      overflow:'hidden',
                      fontFamily: 'AJannatLT',
                      } }>  
                      { item.InvestorsList[userID].status=='Accepted' ? 
                          'مقبول': 
                        item.InvestorsList[userID].status=='Rejected' ? 
                          'مرفوض' :
                          'قيد المراجعة' 
                          } 
                   </Text>
                  

              </View>

              <Text style={Titlestyles.subTitle}>{item.Title}</Text>
              
            </View> )}
            </TouchableOpacity>
          )}

/> }
       
                  </View>
              </View> 
         
            {NavigationBar({navigation, ScreenName:'invested'})}
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
    backgroundColor:'#7c98b3',
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

  ViewButton:{
    flexDirection: "row",
    justifyContent: 'space-between',
   padding: 10,
    marginBottom:20,
    
  },

  Abutton: {
    alignItems: "center",
    backgroundColor: "#7c98b3",
    padding: 10,
    //borderWidth:1,
    borderRadius:10,
    width:130
  },

//Reject list button by defualt grayed
  Rbutton: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderWidth:1,
    borderRadius:10,
    width:130,
    borderColor:"gray",
  },

  AtextButton:{
    color:"#FFF",

  },
  RtextButton:{
    color:"gray",
  },
  items:{
    height:'90%'
},
  });