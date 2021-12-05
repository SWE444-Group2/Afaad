
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image,Modal,Alert, TextInput} from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InvestorLogo from '../assets/images/business-and-finance.png';
import { Linking } from 'react-native'
import SvgUri from "expo-svg-uri";

//import * as MailComposer from 'expo-mail-composer';

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
    const [modalVisible2, setModalVisible2] = useState(false);
    const [offerRejectReason,setOfferRejectReason]=useState('');

    const [InvestorToken, setInvestorToken]=useState('');
    const [InvestorStat, setInvestorStat]=useState('');

    const[accept,setAccept]=useState(true);
    const[pending,setPending]=useState(false);


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
            setCounter(counter+1);
          }}

          if(!isUnmounted){
            setAcceptedOffers(acceptedOffers) ;}

            const pendingOffers=[]
            for(let status in offersList){
              if (offersList[status].status == 'Pending') {
                // auto rejection 
                if (CountAccepted==3){
                  // getInvestorToken(GlobalinvestorID,'Rejected')
                 // dataref+"/"+offersList[status].offerID.update({status : 'Rejected' })
                 const pendingIdeaRef = AfaadFirebase.database().ref(offersPath+"/"+offersList[status].offerID);
                 console.log(pendingIdeaRef.once('value').then(function(snapshot){
                  pendingIdeaRef.update({status : 'Rejected' })
                 }
                 ))

                 AfaadFirebase.database().ref("Investor/"+offersList[status].offerID).once('value').then(function(snapshot) {
                  setInvestorToken(snapshot.child('Token').val());
          });
          const GInvst=InvestorToken;
          
          SendNotification(GInvst,'Rejected');

                }
              else{ 
                 pendingOffers.push(offersList[status])
                 setPCounter(Pcounter+1);
              }
              }
            }
    
              if(!isUnmounted){
                setPendingOffers(pendingOffers) ;}

       });

       return()=>{
        isUnmounted=true;

       };
     

    }, [])


 //  console.log(offersList)

          const AcceptIdea=()=>{
          
            if(CountAccepted==3){

              Alert.alert(
                "تنبيه!",
                "لقد تجاوزت الحد المسموح لقبول عروض المستثمرين",   [

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
                    SendNotification(InvestorToken , 'Accepted')
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
            //getInvestorToken(investorID,"Accepted")
             Alert.alert(
              "تنبيه!",
              "هل أنت متأكد من قبول عرض المستثمر ؟",
              [
                { text: "إلغاء"},
              
                {
                  text: "نعم", onPress: (offer) => { 
                   SendNotification(InvestorToken,"Accepted")
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
                "هل أنت متأكد من رفض عرض المستثمر ؟",
                [
                  { text: "إلغاء"},
                  {
                    text: "نعم", onPress: () => { 
                      SendNotification(InvestorToken,'Rejected')
                      invstorsOfferRef.update({status : 'Rejected' })
                        Alert.alert(
                            "نجاح",
                            "تم رفض المستثمر بنجاح",[{text: "العودة لقائمه العروض" ,onPress: () => {setModalVisible(!modalVisible)}}, {text: "ارسال سبب الرفض", onPress: () =>  {setModalVisible(false); setModalVisible2(true)} }]
                            );                        
                          
                          }
                  }
                ]
              );  
             
            }

            

            const  [InvestorName, setInvestorName] = useState('') ;
            const  [invID, setInID] = useState('') ;
            const  [Message, setMessage] = useState('') ;
            const  [SuggCost, setSuggCost] = useState('') ;
            const  [status, setStatus] = useState('') ;
            const [investorEmail,setInvestorEmail]=useState("");
            const  [counter, setCounter] = useState(0) ;
            const  [Pcounter, setPCounter] = useState(0) ;
       
            const _onPress=(investorID)=>{
            setInID(investorID);
            global.InRef= AfaadFirebase.database().ref("Investor/"+investorID)
            InRef.on('value',(snapshot) =>{
              setInvestorToken(snapshot.child('Token').val());
              
        });
            global.InvestorOfferPath=offersPath+investorID+"/";   //ADD ID FROM ROUTE route.params.ID
            global.invstorsOfferRef = AfaadFirebase.database().ref(InvestorOfferPath);

              invstorsOfferRef.once('value').then(function(snapshot){
                      
                  setInvestorName(snapshot.child("Investorname").val());
                  setMessage(snapshot.child("EntMessage").val());
                  setSuggCost(snapshot.child("SuggestedCost").val());
                  setStatus(snapshot.child("status").val());
                  setInvestorEmail(snapshot.child("InvestorEmail").val())
                  setModalVisible(true);

              });

            }


  // Send notfication by token 
  const SendNotification= async (Token,stat) =>{

    console.log(Token+' ANND '+InvestorToken)

    if(InvestorToken=='not granted'){
        return ; 
     }

    if (stat=='Accepted'){


    let response = fetch('https://exp.host/--/api/v2/push/send' , {
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
  
  if (stat=='Rejected' ){
     let response = fetch('https://exp.host/--/api/v2/push/send' , {
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
  }
  
  //  console.log(Token+ 'is sent!')
   }


   //InvestorStat(snapshot.child("Token").val());
   //Just to make sure the entrepruner has a token and send the notification 

   const renderAccepted = () => {
    setAccept(true)
    setPending(false)
  } 
  
  const renderPending = () =>{ 
    setPending(true)
    setAccept(false)
  }


  /////////////////////////  Rejection fron ent to investor
  const SendRejectReason = () =>{
    if(offerRejectReason == ''){
      Alert.alert("تنبيه ", "الحقل مطلوب   ", [
        {
          text: "حسناً",
          style: "cancel",
        },
      ]);
      return
    }

    if(offerRejectReason.replace(/\s+/g,'').length > 150 || offerRejectReason.replace(/\s+/g,'').length < 10){
      Alert.alert("تنبيه", "حقل سبب الرفض  يجب ألا يقل عن ١٠ أحرف وألا يتجاوز ١٥٠ حرف ", [
        {
          text: "حسنًا",
          style: "cancel",
        },
      ]);
      return
    }
    const pId = route.params.Product_id
    if (user){
      const offerRejectReasonRef = AfaadFirebase.database().ref('ProductIdea/'+pId+'/InvestorsList/'+invID);
      const offerRejectReasonData= {
       offerRejectReason,
      };
     
      offerRejectReasonRef.update(offerRejectReasonData).then(() => {
          Alert.alert("نجاح", "تم إرسال سبب الرفض إلى المستثمر", [
            {
              text: "حسنًا",
              onPress:() => {setModalVisible2(false),navigation.navigate('OffersList',  {Product_id: route.params.Product_id}); setOfferRejectReason('')},
              style: "cancel",
            },
          ]); 
      });

  }

  }
  
    return (

      <View style={TitleStyles.container}>

            <View style={styles.SVG}>
            <SvgUri  source={require('../assets/images/Frame.svg')} /> 
            </View>  

          <View style={TitleStyles.tasksWrapper}>
            
          <Text style={styles.title}>عروض الإستثمار</Text>
    
              <View style={TitleStyles.items}>
              
              <View style={styles.ViewButton}>

              <TouchableOpacity style={pending ? styles.Abutton : styles.Rbutton} onPress={renderPending} >
              <Text style={pending ? styles.AtextButton: styles.RtextButton}>عروض قيد الإنتظار</Text>
              </TouchableOpacity>

              <TouchableOpacity style={accept ? styles.Abutton : styles.Rbutton } onPress={renderAccepted}>
              <Text style={accept ? styles.AtextButton: styles.RtextButton}>العروض المقبولة</Text>
              </TouchableOpacity>
              
              </View>
              

{
               (accept==true && counter==0) &&
                <Text style={[TitleStyles.subTitle ,{fontSize:15 , marginBottom:15 , marginTop:10, marginRight:100}]}>لا يوجد عروض مقبولة</Text>
              }
              {
                (counter==0 && accept == true ) &&
                <FlatList style={{height:'0%'}}
                data={acceptedOffers}
                keyExtractor={(item, index)=>index.toString()}
    
                renderItem={({ item })=>(
                               
                  <TouchableOpacity onPress={() => _onPress(item.offerID)}>   
                  <View>
                  <View style={TitleStyles.item}>
                  <Button 
                        style={TitleStyles.DetailsBtn}
                        onPress={() => _onPress(item.offerID)}
                        title="عرض التفاصيل"
                        titleProps={{}}
                        color='#247ba0'
                    />
                    
                    <Text style={TitleStyles.subTitle}>{item.Investorname}</Text>
                   </View>
                   
                  </View>
                  </TouchableOpacity>
                
                )}

                

               />               }

{
                (counter!=0 && accept == true )&&
                <FlatList style={{height:'53%'}}
                data={acceptedOffers}
                keyExtractor={(item, index)=>index.toString()}
    
                renderItem={({ item })=>(
                               
                  <TouchableOpacity onPress={() => _onPress(item.offerID)}>   
                  <View>
                  <View style={TitleStyles.item}>
                  <Button 
                        style={TitleStyles.DetailsBtn}
                        onPress={() => _onPress(item.offerID)}
                        title="عرض التفاصيل"
                        titleProps={{}}
                        color='#247ba0'
                    />
                    
                    <Text style={TitleStyles.subTitle}>{item.Investorname}</Text>
                   </View>
                   
                  </View>
                  </TouchableOpacity>
                
                )}

                

               />               }
               
    {
                (pending == true && Pcounter==0) &&
                <Text style={[TitleStyles.subTitle ,{fontSize:15 , marginBottom:15 , marginTop:10, marginRight:100}]}>لا يوجد عروض قيد الإنتظار</Text>
              }           
{                 pending == true &&
                  <FlatList style={{height:'50%'}}
                    data={pendingOffers}
                    keyExtractor={(item, index)=>index.toString()}
        
                    renderItem={({ item })=>(
                                   
                      <TouchableOpacity onPress={() => _onPress(item.offerID)}>   
                      <View>
                      <View style={TitleStyles.item}>
                      <Button 
                            style={TitleStyles.DetailsBtn}
                            onPress={() => _onPress(item.offerID)}
                            title="عرض التفاصيل"
                            titleProps={{}}
                            color='#247ba0'
                        />
                        
                        <Text style={TitleStyles.subTitle}>{item.Investorname}</Text>
                       </View>
                       
                      </View>
                      </TouchableOpacity>
                    
                    )}

                    

                   /> }
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
                         
                          <View>

                          <Icon
                          name="clipboard-account"
                          size={40}
                          style={{marginBottom:30,marginLeft:255 ,width:"100%",color:"#002B3E",marginTop:-55,}}
                           />
                          </View>
                        
                          
                          {/*
                          <Image source={InvestorLogo} style={styles.icons} />
                          */}
                       
                          <Text style={styles.TextCenter}> معلومات عرض المستثمر  </Text> 
                          <View>
                          <Text style={styles.OfferDetails}> اسم المستثمر </Text> 
                          <Text style={styles.DetailsText}> {InvestorName} </Text> 
                          <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:300, marginLeft:-7,marginTop:5}}/>

                          <Text style={styles.OfferDetails}> المبلغ المقترح للدعم</Text> 

                          <Text style={styles.DetailsText}>  {SuggCost} ريال سعودي  </Text>
                          <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:300, marginLeft:-7,marginTop:5}}/>

                           <Text style={styles.OfferDetails} > وصف دعم المستثمر </Text> 
                    
                          <Text style={styles.DetailsText}>  {Message}  </Text>
                          <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:300, marginLeft:-7,marginTop:5}}/>

                          { status=='Accepted' &&
                          <TouchableOpacity tyle={styles.Feasibility}
                          onPress={() => Linking.openURL('mailto:'+investorEmail)}>
                              <Text style={styles.SendFeasibility}>إرسال ملف دراسة الجدوى للمستثمر</Text>
                            {/* <Icon name="email-send"  style={{ marginTop:-27}} size={30} color={'#002B3E'}></Icon> */}  
                          </TouchableOpacity> }

                          
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

                          <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible2}
            >
              <View style={{backgroundColor:'rgba(52, 52, 52, 0.5)', height: '100%'}}>
              <View style={styles.modalContent}>
                <Icon
                  name="close"
                  size={30}
                  style={{marginBottom:30, width: 30}}
                  onPress={() => setModalVisible2(!modalVisible2)} />
                
                <Text style={styles.RejectText}>سيتم ارسال سبب الرفض لصاحب عرض الاستثمار</Text>

               <TextInput
                style={styles.TextInputDoc}
                placeholder="سبب رفضك لعرض الاستثمار"
                placeholderTextColor={"gray"} 
                onChangeText={(text) => setOfferRejectReason(text)}
                value={offerRejectReason}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                color="black"
                multiline={true}
              />
                <TouchableOpacity
                  style={styles.investButton}
                  onPress={SendRejectReason}>
                  <Text style={[TitleStyles.subTitle, { color: 'white', fontSize: 20 }]}>ارسال سبب الرفض</Text>
                </TouchableOpacity>
              </View>
              </View>
            </Modal>
       
             </View>
        
       
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
  fontSize:16,
  color:'#637081',
  //textAlign: 'right',
  marginTop:-65,
  marginLeft:85,

},

DetailsText:{
textAlign:"right",
fontFamily: 'AJannatLT',
marginTop: 10,
color:'#536b78',
marginRight:10,
fontSize:16,
//width:'90%',
//paddingRight:0,
marginRight:-20,
//paddingTop:-15,
},

OfferDetails:{
textAlign:"right",
fontFamily: 'AJannatLTBold',
marginTop: 25,
color:'#536b78',
fontSize:16,
marginRight:-20,

},

SendFeasibility:{
  textAlign:"center",
  fontFamily: 'AJannatLT',
  marginTop: 10,
  color:'#536b78',
  fontSize:16,
  marginTop:20,
  width:275,
  backgroundColor:'#FFF',
  borderWidth:1,
  borderColor:"#002B3E",
  borderRadius:6,
  marginLeft:8,
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
  marginLeft:245,
  
  

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
  marginTop:25,
  
},

Abutton: {
  alignItems: "center",
  backgroundColor: "#7c98b3",
  padding: 10,
  borderRadius:10,
  width:130
},

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
RejectText:{ 
  fontFamily: 'AJannatLT',
  fontSize:18,
  color:'#637081',
  textAlign: 'center',
    },

    TextInputDoc:{
      height: 130,
      overflow: "hidden",
      marginLeft: 20,
      marginRight: 30,
      paddingRight: 10,
      paddingBottom:90, 
      width:'90%',
      borderWidth:1,
      borderColor:"gray",
      borderRadius:10,
      fontFamily: 'AJannatLT',
      fontSize:14,
      textAlign: 'right',
      paddingRight:5,
      marginTop:20,
      color:"#fff",
     },
     investButton: {
      width: 213,
      height: 52,
      borderRadius: 6,
      marginTop: 40,
      alignSelf: 'center',
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: '#002B3E',
      backgroundColor: '#002B3E'
    },
});
