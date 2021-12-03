import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Image, Modal, Alert } from 'react-native';
import AfaadFirebase from '../screens/firebaseConfig';
import 'firebase/auth';
import Titlestyles from './TitleStyles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SvgUri from "expo-svg-uri";

export default function ContactMessages({ navigation }) {

  const contactMessagesRef = AfaadFirebase.database().ref('ContactMessages');

  const [modalVisible, setModalVisible] = useState(false);
  const [messagesList, setMessagesList] = useState();
  const [messageTitle, setMessageTitle] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {

    let isUnmounted = false;

    contactMessagesRef.on('value', (snapshot) => {
      const messagesList = [] // empty list
      const messages = snapshot.val();
      for (let messageID in messages) {
        messagesList.push({ messageID, ...messages[messageID] });
      }

      if (!isUnmounted) {
        setMessagesList(messagesList);
      }

    });

    return () => {
      isUnmounted = true;

    };


  }, [])


  const _onPress = (messageID) => {

    console.log(messageID)
    const messageRef = AfaadFirebase.database().ref("ContactMessages/" + messageID);


    messageRef.once('value').then(function (snapshot) {

      setMessageTitle(snapshot.child("messageTitle").val());
      setContactEmail(snapshot.child("contactEmail").val());
      setMessage(snapshot.child("message").val());
      setModalVisible(true);

    });

  }

  return (
    <View style={Titlestyles.container}>

      <View style={styles.SVG}>
        <SvgUri source={require('../assets/images/Frame.svg')} />
      </View>

      <View style={Titlestyles.tasksWrapper}>

        <Text style={styles.title}>رسائل التواصل</Text>

        <View style={Titlestyles.items}>

          <FlatList style={{ height: '0%', marginTop: 70 }}
            data={messagesList}
            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item }) => (

              <TouchableOpacity onPress={() => _onPress(item.messageID)}>
                <View>
                  <View style={Titlestyles.item}>
                    <Button
                      style={Titlestyles.DetailsBtn}
                      onPress={() => _onPress(item.messageID)}
                      title="عرض التفاصيل"
                      titleProps={{}}
                      color='#247ba0'
                    />

                    <Text style={Titlestyles.subTitle}>{item.messageTitle}</Text>
                  </View>

                </View>
              </TouchableOpacity>

            )} />


          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)', height: '100%' }}>
              <View style={styles.modalContent}>

                <Icon
                  name="close"
                  size={20}
                  style={{ marginBottom: 30, width: 20, paddingTop: 25, }}
                  onPress={() => setModalVisible(!modalVisible)} />

                <View>

                  <Icon
                    name="message-text-outline"
                    size={40}
                    style={{ marginBottom: 30, marginLeft: 255, width: "100%", color: "#002B3E", marginTop: -55, }}
                  />
                </View>



                <Text style={styles.TextCenter}>{messageTitle}</Text>
                <View>
                  <Text style={styles.OfferDetails}>عنوان التواصل </Text>
                  <Text style={styles.DetailsText}> {contactEmail} </Text>

                  <Text style={styles.OfferDetails}>الرسالة</Text>
                  <Text style={styles.DetailsText}>{message}</Text>


                </View>


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
  SVG: {
    alignItems: "center",
    position: 'absolute',
    marginTop: -40

  },
  title: {
    fontFamily: 'AJannatLTBold',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
    paddingTop: 25,
    paddingRight: 10,
  },
  modalContent: {
    margin: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  TextCenter: {
    fontFamily: 'AJannatLTBold',
    fontSize: 16,
    color: '#637081',
    marginTop: -65,
    alignSelf:'center',
  },
  DetailsText: {
    textAlign: "right",
    fontFamily: 'AJannatLT',
    marginTop: 10,
    color: '#536b78',
    marginRight: 10,
    fontSize: 16,
    //width:'90%',
    //paddingRight:0,
    marginRight: -20,
    //paddingTop:-15,
  },
  OfferDetails: {
    textAlign: "right",
    fontFamily: 'AJannatLTBold',
    marginTop: 25,
    color: '#536b78',
    fontSize: 16,
    marginRight: -20,
  },




})