import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' ;



export default function InvestorRequest({navigation , route}) {

    const [SuggestedCost, setSuggested]= useState('');
    const [EntMessage , setEntMessage]=useState('');

    const user = AfaadFirebase.auth().currentUser ;

    const submit = () => {
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
                  navigation.pop()
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
            <Text style={styles.warning}>
              *جميـع الحقول مطلوبـــة
            </Text>

            <Text style={styles.labelText}>مبلغ الاستثمار المقترح<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSuggested(text)}
              value={SuggestedCost}
              underlineColorAndroid="transparent"
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

            <StatusBar style="auto" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    inner: {
        padding: 24,
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
      backgroundColor: "white",
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
  });