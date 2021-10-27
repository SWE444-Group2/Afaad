
import Constants from 'expo-constants';
import ViewIdea from './ViewIdea';
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image,Modal,Alert,TextArea} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from '../assets/images/plusIcon.png';
import Background from '../assets/images/Background.jpg';
import ClickedHomeIcon from '../assets/images/ClickedHomeIcon.png';
import SearchIcon from '../assets/images/SearchIcon.png';
import NotificationIcon from '../assets/images/NotificationIcon.png'
import ProfileIcon from '../assets/images/ProfileIcon.png'
import { ScrollView } from 'react-native-gesture-handler';
import InvestorLogo from '../assets/images/business-and-finance.png';

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function OffersList({ navigation, route }) {
  //Create model for pop up window 
    const [modalVisible, setModalVisible] = useState(false);
    const offerroute=route;
    const offersPath='ProductIdea/'+route.params.Product_id+'/InvestorsList/' ;
    const [offersList , setOffersList]= useState();
    const [acceptedOffers , setAcceptedOffers] = useState();
    const [pendingOffers , setPendingOffers] = useState();
    const dataref=AfaadFirebase.database().ref(offersPath);

    const [InvestorToken, setInvestorToken]=useState('');
    const [InvestorStat, setInvestorStat]=useState('');


    useEffect(() => {
        let isUnmounted=false;
       //const dataref=AfaadFirebase.database().ref(offersPath)
    
       dataref.on('value',(snapshot) =>{
          const offersList=[] // empty list
          const offers= snapshot.val();  
          for (let offerID in offers) {
            offersList.push({offerID,...offers[offerID]
            }
              );

          } 

          if( !isUnmounted){
          setOffersList(offersList);
        }

        const acceptedOffers=[]
        global.CountAccepted=0;
        for(let status in offersList){
          if (offersList[status].status == 'Accepted') {
            acceptedOffers.push(offersList[status])
            CountAccepted++;
            console.log(CountAccepted);
          }}

          if(!isUnmounted){
            setAcceptedOffers(acceptedOffers) ;}

            const pendingOffers=[]
            for(let status in offersList){
              if (offersList[status].status == 'Pending') {
                pendingOffers.push(offersList[status])
              }}
    
              if(!isUnmounted){
                setPendingOffers(pendingOffers) ;}

       });

       return()=>{
        isUnmounted=true;

       };
     

    }, [])


   //console.log(offersList)

          const AcceptIdea=()=>{
            //getInvestorToken(offer)
            if(CountAccepted==3){

              Alert.alert(
                "تنبيه!",
                "لقد تجاوزدت الحد المسموح لقبول عروض المستثمرين",   [

                  { text: "حسناً", onPress:()=>{setModalVisible(!modalVisible);}}
                ]        
                  
              );

            }
            if(CountAccepted==2){
              
              Alert.alert(
               "تنبيه!",
               "فرصتك الاخيره لقبول عرض المستثمر هل أنت متأكد من قبول العرض؟",
               [
                 { text: "إلغاء"},
               
                 {
                   text: "نعم", onPress: (offer) => { 
                    // getInvestorToken(offer)
                     invstorsOfferRef.update({status :'Accepted' })  
                       Alert.alert(
                           "رائع!",
                           "تم قبول عرض المستثمر بنجاح",[{text: "العودة لقائمه عرض المستثمرين" ,onPress: () => {setModalVisible(!modalVisible)}}]
                           );                         }
                 },
                 
               ]
             ); }

             else if(CountAccepted!=3)
            {
              
             Alert.alert(
              "تنبيه!",
              "هل أنت متأكد من قبول عرض المستمثر ؟",
              [
                { text: "إلغاء"},
              
                {
                  text: "نعم", onPress: (offer) => { 
                   // getInvestorToken(offer)
                    invstorsOfferRef.update({status :'Accepted' })  
                      Alert.alert(
                          "رائع!",
                          "تم قبول عرض المستثمر بنجاح",[{text: "العودة لقائمه عرض المستثمرين" ,onPress: () => {setModalVisible(!modalVisible)}}]
                          );                         }
                },
                
              ]
            ); }
            
          }


        const RejectIdea=()=>{
            Alert.alert(
                "تنبيه!",
                "هل أنت متأكد من رفض عرض المستمثر ؟",
                [
                  { text: "إلغاء"},
                  {
                    text: "نعم", onPress: () => { 
                      //getInvestorToken(offer)
                      invstorsOfferRef.update({status : 'Rejected' })
                        Alert.alert(
                            "تنبيه!",
                            "تم رفض المستثمر بنجاح",[{text: "العودة لقائمه العروض" ,onPress: () => {setModalVisible(!modalVisible)}}]
                            );                        
                          
                          }
                  }
                ]
              );  
             
            }

            

            const  [InvestorName, setInvestorName] = useState('') ;
            const  [Message, setMessage] = useState('') ;
            const  [SuggCost, setSuggCost] = useState('') ;
            const  [status, setStatus] = useState('') ;
       
            const _onPress=(investorID)=>{

            global.InvestorOfferPath=offersPath+investorID+"/";   //ADD ID FROM ROUTE route.params.ID
            global.invstorsOfferRef = AfaadFirebase.database().ref(InvestorOfferPath);

              invstorsOfferRef.once('value').then(function(snapshot){
                      
                  setInvestorName(snapshot.child("Investorname").val());
                  setMessage(snapshot.child("EntMessage").val());
                  setSuggCost(snapshot.child("SuggestedCost").val());
                  setStatus(snapshot.child("status").val());
                  setModalVisible(true);

              });

            }


  // Send notfication by token 
  const SendNotification= async (Token,stat) =>{

  

    if (stat=='Accepted'){


     response = fetch('https://exp.host/--/api/v2/push/send' , {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      },

      body:JSON.stringify({
        to: Token,
        sound: 'default',
        title:'تهانينا',
        body: 'لقد تم قبول طلب إستثمارك ',


      })
    });
    }
  
  if (stat=='Rejected' )
     response = fetch('https://exp.host/--/api/v2/push/send' , {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
  
      body:JSON.stringify({
        to: Token,
        sound: 'default',
        title:'عذرًا',
        body: 'لقد تم رفض طلب إستثمارك ',


      })
    });

  
    console.log(Token)
   }


   //InvestorStat(snapshot.child("Token").val());
   //Just to make sure the entrepruner has a token and send the notification 

   const getInvestorToken =(offer,Stat)=>{

   const InRef= AfaadFirebase.database().ref("Investor/"+offer)

   InRef.once('value').then(function(snapshot){
     
    setInvestorToken(snapshot.child("Token").val());
  
   });

    if(!InvestorToken){
        return ; 
     }
     SendNotification(InvestorToken,Stat)
   }



    return (

      <View style={Titlestyles.container}>
        <Image source={Background} style={{ flex: 1,width:'100%',height:'13%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}] }}/>
     
          <View style={Titlestyles.tasksWrapper}>
            
          <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:36 , marginTop:35}]}>عروض الإستثمار</Text>
    
              <View style={Titlestyles.items}>
              <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:15 , marginTop:10}]}> العروض المقبولة</Text>

{
                CountAccepted==0 &&
                <Text style={[Titlestyles.subTitle ,{fontSize:15 , marginBottom:15 , marginTop:10, marginRight:100}]}>لا يوجد عروض مقبولة</Text>
              }
              {
                CountAccepted==0 &&
                <FlatList style={{height:'0%'}}
                data={acceptedOffers}
                keyExtractor={(item, index)=>index.toString()}
    
                renderItem={({ item })=>(
                               
                  <TouchableOpacity onPress={() => _onPress(item.offerID)}>   
                  <View>
                  <View style={Titlestyles.item}>
                  <Button 
                        style={Titlestyles.DetailsBtn}
                        onPress={() => _onPress(item.offerID)}
                        title="عرض التفاصيل"
                        titleProps={{}}
                        color='#247ba0'
                    />
                    
                    <Text style={Titlestyles.subTitle}>{item.Investorname}</Text>
                   </View>
                   
                  </View>
                  </TouchableOpacity>
                
                )}

                

               />               }

{
                CountAccepted!=0 &&
                <FlatList style={{height:'53%'}}
                data={acceptedOffers}
                keyExtractor={(item, index)=>index.toString()}
    
                renderItem={({ item })=>(
                               
                  <TouchableOpacity onPress={() => _onPress(item.offerID)}>   
                  <View>
                  <View style={Titlestyles.item}>
                  <Button 
                        style={Titlestyles.DetailsBtn}
                        onPress={() => _onPress(item.offerID)}
                        title="عرض التفاصيل"
                        titleProps={{}}
                        color='#247ba0'
                    />
                    
                    <Text style={Titlestyles.subTitle}>{item.Investorname}</Text>
                   </View>
                   
                  </View>
                  </TouchableOpacity>
                
                )}

                

               />               }
               
               
                  <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:15 , marginTop:35}]}>عروض في قيد الإنتظار</Text>

                  <FlatList style={{height:'50%'}}
                    data={pendingOffers}
                    keyExtractor={(item, index)=>index.toString()}
        
                    renderItem={({ item })=>(
                                   
                      <TouchableOpacity onPress={() => _onPress(item.offerID)}>   
                      <View>
                      <View style={Titlestyles.item}>
                      <Button 
                            style={Titlestyles.DetailsBtn}
                            onPress={() => _onPress(item.offerID)}
                            title="عرض التفاصيل"
                            titleProps={{}}
                            color='#247ba0'
                        />
                        
                        <Text style={Titlestyles.subTitle}>{item.Investorname}</Text>
                       </View>
                       
                      </View>
                      </TouchableOpacity>
                    
                    )}

                    

                   /> 
                          <Modal
                          animationType="slide"
                          transparent={true}
                          visible={modalVisible} >

                          <View style={styles.modalContent}>

                          <Icon
                          name="close"
                          size={20}
                          style={{marginBottom:30, width: 20, paddingTop:25,}}
                          onPress={() => setModalVisible(!modalVisible)} />
                          <Image source={InvestorLogo} style={styles.icons} />

                       
                          <Text style={styles.TextCenter}> معلومات دعم المستثمر  </Text> 
                          <View>
                          <Text style={styles.OfferDetails}> اسم المستثمر: </Text> 
                   
                          <Text style={styles.DetailsText}> {InvestorName} </Text> 

                          <Text style={styles.OfferDetails}> المبلغ المقترح للدعم:</Text> 

                          <Text style={styles.DetailsText}>  {SuggCost}  </Text>

                           <Text style={styles.OfferDetails} > وصف دعم المستثمر: </Text> 
                    
                          <Text style={styles.DetailsText}>  {Message}  </Text>
                      

                          
                          <View style={{flexDirection:'row', paddingLeft:35,paddingTop:70,alignContent:"center"}}>
                          
                         { status=='Pending' &&
                          <TouchableOpacity style={styles.RejectOffer}
                            // style={TitleStyles.Rejectbutton}
                              onPress={() => RejectIdea()}>
                              <Text style={styles.RejectDetailsBtn}  >رفض</Text>
                          </TouchableOpacity> }
                          { status=='Pending' &&
                          <TouchableOpacity style={styles.AcceptOffer}
                              //style={TitleStyles.Acceptbutton}
                              onPress={() => AcceptIdea()}>
                              <Text style={styles.AcceptDetailsBtn} >قبول</Text>
                          </TouchableOpacity> }

                          </View> 
                          </View>


                          </View>
                          </Modal>
       
             </View>
        
       
           </View> 
           

     
      <View style={styles.BottomBar}> 

              <TouchableOpacity >
                <Icon name="account-box-outline" style={{ marginLeft:'5%' , marginTop:10} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            

              <TouchableOpacity onPress={() => navigation.navigate('NotificationsNav')} >
                <Icon name="bell-outline" style={{ marginLeft:'25%' , marginTop:-40} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            

              <TouchableOpacity  onPress={() => navigation.navigate('PublishIdea')}>
                <Icon name="plus-circle-outline" style={{ marginLeft:'45%' , marginTop:-40} } size={40} color={"#fff"}/>
              </TouchableOpacity>
            

              <TouchableOpacity>
                <Icon name="feature-search-outline" style={{ marginLeft:'65%' , marginTop:-43} } size={40} color={"#fff"}/> 
              </TouchableOpacity>
            
            
              <TouchableOpacity onPress={() => navigation.navigate('EntrepreneurAndInvestor')}>
                <Icon name="home-circle" style={{ marginLeft:'82%' , marginTop:-43 } } size={43} color={"#fff"}/> 
              </TouchableOpacity>

        </View>

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

modalContent: {
  //height: '60%', // to be fixebale with the offer content details
  margin: 20,
  marginBottom: 'auto',
  marginTop: 'auto',
  backgroundColor: "white",
  borderColor:"#eeeeee",
  borderWidth:1,
  borderRadius: 20,
  padding: 35,
  paddingTop:5,
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  shadowOffset: {
    width: 0,
    height: 2,

  },
  
},


TextCenter:{
  fontFamily:'AJannatLTBold',
  fontSize:18,
  color:'#637081',
  textAlign: 'center',
  marginTop:-10,

},

DetailsText:{
textAlign:"right",
fontFamily: 'AJannatLTBold',
marginTop: 10,
color:'#536b78',
marginRight:10,
fontSize:18,
//width:'90%',
//paddingRight:0,
},

OfferDetails:{
textAlign:"right",
fontFamily: 'AJannatLT',
marginTop: 10,
color:'#536b78',
fontSize:16,

},

AcceptDetailsBtn:{
  fontFamily:'AJannatLT',
  color:'#fff',
  textAlign:'center',
  padding:3,
  fontSize: 18, 
  //position:'relative',
  
  
},
RejectDetailsBtn:{
  fontFamily:'AJannatLT',
  color:'#002B3E',
  textAlign:'center',
  padding:3,
  fontSize: 18, 
  //position:'relative',
},

AcceptOffer:{
  //position:'relative',
  marginBottom:'5%',
  marginRight:'5%',
  width:100,
  backgroundColor:'#002B3E',
  borderRadius:6,
},
RejectOffer:{
  //position:'relative',
  marginBottom:'5%',
  marginRight:'5%',
  width:100,
  backgroundColor:'#fff',
  borderWidth:1,
  borderColor:"#002B3E",
  borderRadius:6,
},

square:{
  marginTop:20,
  
  alignItems:'flex-end',
  backgroundColor:'#eeeeee',
  borderRadius:10,
  width:'100%', 
  height:350,
  marginBottom:'5%'
},

icons:{
  marginTop:-45,
  alignSelf:"center",
  //width:10,
  

},
});
