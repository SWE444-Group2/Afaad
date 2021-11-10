
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button , TouchableOpacity , Alert ,Image, Modal } from 'react-native';
import TitleStyles from './TitleStyles';
import AfaadLogo from '../assets/images/LOGO.jpeg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import 'firebase/auth';


import AfaadFirebase from "./firebaseConfig";
import { ScrollView } from 'react-native-gesture-handler';
// Expecting an id of product idea
export default function productIdea({navigation , route}) {
    const ProductPath='ProductIdea/'+route.params.Product_id ;
    const userType = route.params.userType;
    const [date, setdate] = useState('');
    const [Description, setDescription] = useState('');
    //const [FeasibilityAnalysis, setFeasibilityAnalysis] = useState('');
    const [status, setStatus] = useState('');
    const [Title, setTitle] = useState('');
    const [category, setcategory] = useState('');
    const [costEstimation, setcostEstimation] = useState('');
    const [invested, setInvested] = useState('');
    const [investorsSpec, setinvestorsSpec] = useState('');
    const[Donation , setDonation]=useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [userInfo , setUserInfo]= useState('');
    const [userName , setUserName]=useState('');
    //const [userGender , setUserGender]=useState('');
    const [userEmail , setUserEmail]=useState('');
    const [userPhone , setUserPhone]=useState('');

    const InvestorsListNode = AfaadFirebase.database().ref(ProductPath+'/InvestorsList/');

    const productIdeaRef = AfaadFirebase.database().ref(ProductPath)
    productIdeaRef.once('value').then(function(snapshot){
        setTitle(snapshot.child("Title").val());
        setdate(snapshot.child("date").val());
        setDescription(snapshot.child("ProductDescription").val());
        if(snapshot.child("status").val()=='Accepted')
        setStatus('مقبول');
        if(snapshot.child("status").val()=='Rejected')
        setStatus('مرفوض'); 
        if(snapshot.child("status").val()=='Pending')
        setStatus('في حالة المراجعة');
        setcategory(snapshot.child("category").val());
        setDonation(snapshot.child("donation").val());
        setcostEstimation(snapshot.child("costEstimation").val());
        setinvestorsSpec(snapshot.child("investorsSpec").val());
        setUserInfo(snapshot.child('userID').val());
       });
  

       const UserInfoRef=AfaadFirebase.database().ref('Entrepreneur/'+userInfo)
       UserInfoRef.once('value').then(function(snapshot){
        setUserName(snapshot.child('FirstName').val()+' '+snapshot.child('Lastname').val());
        setUserEmail(snapshot.child('email').val());
        setUserPhone(snapshot.child('phone').val());
      });

        
  const SendRequest = () => {

    const user = AfaadFirebase.auth().currentUser ;

     InvestorsListNode.once('value',(snapshot) =>{
        const offersList=[] // empty list
        const offers= snapshot.val();  
        for (let offerID in offers) {
          offersList.push({offerID,...offers[offerID]});
        } 

       let CountAccepted = 0;
       for (let status in offersList) {
         if (offersList[status].status == 'Accepted') {
           CountAccepted++;
         }
       }

       if (CountAccepted == 3) {
         Alert.alert("تنبيه", "نعتذر، وصلت الفكرة الحد الأعلى لاستقبال طلبات الاستثمار", [
           {
             text: "حسنًا",
             style: "cancel",
           },
         ]);
         return

       } else {
        if (user) {

          const InvestorRequest = AfaadFirebase.database().ref(ProductPath + '/InvestorsList/' + user.uid);

          InvestorRequest.once('value', (snapshot) => {
            if (snapshot.exists()) {
              Alert.alert("تنبيه", "عزيزي المستثمر، لديك طلب استثمار مسبق لهذه الفكرة", [
                {
                  text: "حسنًا",
                  style: "cancel",
                },
              ]);
              return
            } else {
              setModalVisible(!modalVisible)
              navigation.navigate('InvestorRequest', { Product_id: route.params.Product_id, user_Name:route.params.user_Name })
            }
          })
        }
       }
     });
  }

    const AcceptIdea=()=>{
        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من قبول الفكرة؟",
            [
              {
                text: "نعم", onPress: () => { 
                    productIdeaRef.update({status : 'Accepted'} )
                    Alert.alert(
                        "رائع!",
                        "تم قبول الفكرة بنجاح",[{text: "العودة لقائمه الافكار" ,onPress: () => {navigation.navigate('ViewIdea')}}]
                        );                         }
              },
              { text: "إلغاء"}
            ]
          );
         }
    

    const RejectIdea=()=>{
        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من رفض الفكرة؟",
            [
              {
                text: "نعم", onPress: () => { 
                    productIdeaRef.update({status : 'Rejected' } )
                    Alert.alert(
                        "رائع!",
                        "تم رفض الفكرة بنجاح",[{text: "العودة لقائمه الافكار" ,onPress: () => {navigation.navigate('ViewIdea')}}]
                        );                         }
              },
              { text: "إلغاء"}
            ]
          ); }
    // console.log(pIdea);
    return(
        <View style={styles.container}>
        <ScrollView >
        <View style={[TitleStyles.containerDetails ]}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <View style={{backgroundColor:'rgba(52, 52, 52, 0.5)', height: '100%'}}>
              <View style={styles.modalContent}>
                <Icon
                  name="close"
                  size={30}
                  style={{marginBottom:30, width: 30}}
                  onPress={() => setModalVisible(!modalVisible)} />
                <Text style={[TitleStyles.subTitle]}>عند الضغط على زر أرسل طلب الإستثمار فإنك تقر بصدق نيتك في الاستثمار وأن فريق أفاد يخلي مسؤوليته عن أي أمر يحدث بينك وبين رائد الأعمال</Text>
                <Text style={[TitleStyles.subTitle]}> سيتم إرسال كافة بياناتك لرائد الأعمال وستتلقى تنبيه عندما يتحقق من طلبك</Text>
                <TouchableOpacity
                  style={styles.investButton}
                  onPress={SendRequest}>
                  <Text style={[TitleStyles.subTitle, { color: 'white', fontSize: 20 }]}>أرسل طلب الاستثمار</Text>
                </TouchableOpacity>
              </View>
              </View>
            </Modal>
            <Image source={AfaadLogo} style={{ width: 150, height: 150 }}/>
           <Text style={[TitleStyles.ProjectName ]}>{Title}</Text> 
              <View style={TitleStyles.square}>
                    <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>فكرة المشروع</Text>
                    <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
                    <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{Description}</Text> 
                    <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>القيمة التقديرية</Text>
                    <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
                    <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{costEstimation}</Text>
                    <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>فئة المشروع</Text>
                    <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
                    <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{category}</Text>
                    <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>المستثمر المراد</Text>
                    <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
                    <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{investorsSpec}</Text>
                    
                    { userType== 'Entrepreneur' &&
                    <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>حالة المشروع</Text> 
                    }
                    { userType== 'Entrepreneur' &&
                     <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
                    }
                    { userType== 'Entrepreneur' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{status}</Text> }

                      { userType== 'Investor' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}> للتواصل مع رائد الاعمال</Text> } 

                     { userType== 'Investor' &&
                     <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
                    }  
                      { userType== 'Investor' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{userName}</Text> }
                      { userType== 'Investor' &&
                      <TouchableOpacity   onPress={() => Linking.openURL('mailto:'+userEmail) }>
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText , {color:'#1F7A8C'}]} >{userEmail}</Text> 
                     </TouchableOpacity>}
                     { userType== 'Investor' &&
                     <TouchableOpacity   onPress={() => Linking.openURL('tel:$'+userPhone) }>
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText , {color:'#1F7A8C'}]}>{userPhone}</Text>
                     </TouchableOpacity> }



                    { userType== 'Admin' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}> رائد الاعمال</Text> } 
                     { userType== 'Admin' &&
                     <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>}  
                      { userType== 'Admin' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{userName}</Text> }
                      { userType== 'Admin' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{userEmail}</Text> }
                     { userType== 'Admin' &&
                     <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{userPhone}</Text> }




               </View>


               <Modal
                    visible={paymentModalVisible}
                   onRequestClose={() => setPaymentModalVisible(!paymentModalVisible)} 
                
                >
                   <Icon
                  name="close"
                  size={30}
                  style={{marginTop:70, width: 30 , marginLeft:30}}
                  onPress={() => setPaymentModalVisible(!paymentModalVisible)} />

                    <WebView style={{flex: 1, marginTop: Constants.statusBarHeight }}
                        source={{ uri: 'https://www.sandbox.paypal.com/donate/?business='+userEmail+'&no_recurring=1&currency_code=USD' }}
                        />
                </Modal>
               

            
           <View style={{flexDirection:'row'}}>
           { userType== 'Admin' &&
            <TouchableOpacity
                style={TitleStyles.Rejectbutton}
                onPress={() => RejectIdea()}>
                <Text style={TitleStyles.RejectDetailsBtn}>رفض</Text>
            </TouchableOpacity> 
              }

                { userType== 'Admin' &&
                   <TouchableOpacity
                   style={TitleStyles.Acceptbutton}
                   onPress={() => AcceptIdea()}>
                   <Text style={TitleStyles.AcceptDetailsBtn}> قبول</Text>
                </TouchableOpacity>  }    


                 { userType== 'Investor' &&
                   <TouchableOpacity
                   style={TitleStyles.investButton}
                onPress={() => setModalVisible(true)}>
                   <Text style={TitleStyles.AcceptDetailsBtn}>استثمر</Text>
                </TouchableOpacity>  }   

                 { userType== 'Investor' && Donation==true &&
                   <TouchableOpacity
                   style={TitleStyles.investButton}
                   onPress={() => setPaymentModalVisible(true) }
                   >
                   <Text style={TitleStyles.AcceptDetailsBtn}>ادعم</Text>
                </TouchableOpacity>  }       

                  { userType== 'Entrepreneur' &&
                   <TouchableOpacity   onPress={() => navigation.navigate('OffersList', {Product_id: route.params.Product_id})}
                   style={styles.ButtonText}>
                   <Text style={styles.ButtonText}> قائمه عروض المستثمرين</Text>
                </TouchableOpacity>  }    
         </View>  
        </View>

        </ScrollView>

        <StatusBar style="auto" />
        </View>

        
    )
}


const styles = StyleSheet.create({

  inner: {
    padding: 24,
    justifyContent: 'space-evenly'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContent: {
    margin: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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

  SuppButton:{
    borderColor: '#002B3E',
    backgroundColor: '#002B3E',
    borderRadius: 6,
    width: 213,
    //marginTop: 7,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",


  },
  ButtonText:{
    fontFamily: 'AJannatLT',
    fontSize:18,
    color:"#fff",
    fontWeight:'bold',
    borderColor: '#002B3E',
    backgroundColor: '#002B3E',
    borderRadius: 6,
    width: 213,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center',
    height: 40,
    borderRadius: 6,
  },

  investors:{
    fontFamily: 'AJannatLT',
    fontSize:18,
    color:"#fff",
    fontWeight:'bold',
    borderColor: '#002B3E',
    borderRadius: 20,
    width: 213,
    textAlign:'center',
    height: 40,
  }

});


