import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput,View , Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' ;




export default function InvestorRequest({navigation , route}) {

    const [SuggestedCost, setSuggested]= useState('');
    const [EntMessage , setEntMessage]=useState('');
    const [EntrepreneurToken, setEntrepreneurToken]=useState('');
    const [id, setID]=useState('')
    const user = AfaadFirebase.auth().currentUser ;

    // The Token reference for the product idea entrepruneur so we can send them the nothification 
    const UserRef = AfaadFirebase.database().ref('ProductIdea/'+route.params.Product_id);
      UserRef.once('value').then(function(snapshot){
         setID(snapshot.child("userID").val());
         
      });
      const EntreRef = AfaadFirebase.database().ref('Entrepreneur/'+id);
      EntreRef.once('value').then(function(snapshot){
        setEntrepreneurToken(snapshot.child('Token').val())   
     });

     // Send notfication by token 
    const SendNotification= async (Token) =>{


      
     let response = fetch('https://exp.host/--/api/v2/push/send' , {
       method: 'POST',
       headers:{
         Accept: 'application/json',
         'Content-Type':'application/json'
       },
       body:JSON.stringify({
         to: Token,
         sound: 'default',
         title:'تنبيه',
         body: 'يوجد لديك طلب استثمار جديد',
         displayInForeground: true 


       })
     });

     console.log(Token + 'Is sent')
    }

    //Just to make sure the entrepruner has a token and send the notification 
    const getEntreToken =()=>{
      if(!EntrepreneurToken){
         return ; 
      }
      SendNotification(EntrepreneurToken)
    }

    const submit = () => {

      if (
        SuggestedCost == "" || 
        EntMessage == ""

      ) {
        Alert.alert("تنبيه ", "جميع الحقول مطلوبة", [
          {
            text: "حسناً",
            style: "cancel",
          },
        ]);
  
        return
      }
      if(SuggestedCost.length < 3 || SuggestedCost.length > 7){
        Alert.alert("تنبيه", "مبلغ الاستثمار المقترح يجب ألا يقل عن ٣ خانات وألا يتجاوز ٧ خانات ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }
      if(EntMessage.replace(/\s+/g,'').length > 250 || EntMessage.replace(/\s+/g,'').length < 10){
        Alert.alert("تنبيه", "حقل رسالة رائد الأعمال يجب ألا تقل عن ١٠ أحرف وألا تتجاوز ٢٥٠ حرف ", [
          {
            text: "حسنًا",
            style: "cancel",
          },
        ]);
        return
      }

        if (user){
        const RequestRef = AfaadFirebase.database().ref('/ProductIdea/'+route.params.Product_id+'/InvestorsList/'+user.uid);
        const RequestData = {
            Investorname: route.params.user_Name,
            SuggestedCost,
            EntMessage,
            status: 'Pending',
        };
        RequestRef.set(RequestData).then(() => {
            Alert.alert("نجاح", "تم إرسال طلبك إلى رائد الأعمال", [
              {
                text: "حسنًا",
                onPress: () => {
                  getEntreToken();
                  navigation.pop();
                },
                style: "cancel",
              },
            ]); 
        });

    }

   
}



    return(
<KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>

            <View style={{backgroundColor:"#7C98B3", height: '30%', borderBottomStartRadius: 20,borderBottomEndRadius: 20}}>
            <Text style={styles.title}>
              طلب الاستثمار
            </Text>
            </View>
            
            <View style={{backgroundColor:"white", padding: 24, height:'70%'}}>

            <Text style={styles.warning}>
              *جميـع الحقول مطلوبـــة
            </Text>

            <Text style={styles.labelText}>مبلغ الاستثمار المقترح<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSuggested(text)}
              value={SuggestedCost}
              underlineColorAndroid="transparent"
              keyboardType='numeric'
            />

            <Text style={styles.labelText}>رسالة لرائد الأعمال<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={[styles.input, { height: 150 }]}
              placeholder="(حد أقصى:٢٥٠ حرف)"
              onChangeText={(text) => setEntMessage(text)}
              value={EntMessage}
              underlineColorAndroid="transparent"
              multiline={true}
            />

            <Button buttonStyle={styles.button}
              onPress={submit}
              title="إرسال"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />

</View>
            <StatusBar style="auto" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
      },
    inner: {
        justifyContent: "space-around",
    },
    button: {
      width: 150,
      margin: 10,
      marginLeft:'auto',
      marginRight:'auto',

    },
    labelText: {
      fontSize: 16,
      fontFamily: 'AJannatLTBold',
      fontWeight: 'bold',
      textAlign: 'right',
      color: '#86939e',
      marginTop: 10,
    },
    warning:{
      fontSize: 14,
      textAlign: 'right',
      color:"#9a2222",    
    },
    input: {
      height: 48,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "rgba(124, 152, 179, 0.1)",
      marginBottom: 10,
      paddingRight: 15,
      textAlign: 'right',
      fontFamily: 'AJannatLT',
    },
    button: {
      width: 213,
      height: 52,
      borderRadius: 6,
      marginVertical: 50,
      alignSelf: 'center',
      backgroundColor: '#022B3A',
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