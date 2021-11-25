import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput,View , Text, Keyboard, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' ;




export default function contactForm({ navigation }) {

  const submit = () => {

  }
    return(
<KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>

            <View style={{backgroundColor:"#7C98B3", height: 200, borderBottomStartRadius: 20,borderBottomEndRadius: 20}}>
            <Text style={styles.title}>
              استمارة التواصل
            </Text>
            </View>
            
            <View style={{backgroundColor:"white", padding: 24}}>

            <Text style={styles.warning}>
              *جميـع الحقول مطلوبـــة
            </Text>

            <Text style={styles.labelText}>البريد الإلكتروني للتواصل<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType='numeric'
            />

            <Text style={styles.labelText}>رسالتك<Text style={styles.warning}>*</Text></Text>
            <TextInput
              style={[styles.input, { height: 150 }]}
              placeholder="(حد أقصى:٢٥٠ حرف)"
              underlineColorAndroid="transparent"
              multiline={true}
            />

            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
            <Button buttonStyle={[styles.button, {backgroundColor: 'grey'}]}
              onPress={() => navigation.pop()}
              title="إلغاء"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />
            <Button buttonStyle={styles.button}
              onPress={submit}
              title="إرسال"
              titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT' }}
            />
            </View>

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
        paddingBottom: 40
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
      width: 150,
      height: 52,
      borderRadius: 6,
      marginVertical: 10,
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