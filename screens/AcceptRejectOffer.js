import Constants from 'expo-constants';
import ViewIdea from './ViewIdea';
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image,Modal,Alert} from 'react-native';
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

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function OffersList({ navigation, route }) {

    const InvestorOfferPath='ProductIdea'+route.params.InvestorOffer_id;
    const [InvestorName, setInvestorName] = useState('');
    const [Desc, setDesc] = useState('');
    const [SuggCost, setSuggCost] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    
    const invstorsOffetRef = AfaadFirebase.database().ref(InvestorOfferPath);
    invstorsOffetRef.once('value').then(function(snapshot){
        
               
        setInvestorName(snapshot.child("Investorname").val());
        setDesc(snapshot.child("EntMessage").val());
        setSuggCost(snapshot.child("SuggestedCost").val());
    });
    

    const AcceptIdea=()=>{

        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من قبول عرض/دعم المستمثر ؟",
            [
              { text: "إلغاء"},
            
              {
                text: "نعم", onPress: () => { 
                    
                    dataref.update({status : 'Accepted' } )
                    Alert.alert(
                        "رائع!",
                        //"تم قبول عرض/دعم المستثمر بنجاح",[{text: "العودة لقائمه عرض / دعم المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
                        );                         }
              },
              
            ]
          ); }

    const RejectIdea=()=>{
        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من رفض عرض/دعم المستمثر ؟",
            [
              { text: "إلغاء"},
              {
                text: "نعم", onPress: () => { 

                     dataref.update({status : 'Rejected' } )
                    Alert.alert(
                        "رائع!",
                        //"تم رفض المستثمر بنجاح",[{text: "العودة لقائمه المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
                        );                         }
              }
             
            ]
          ); }


          return(
              <View>
                          <Modal
                          animationType="slide"
                          transparent={true}
                          visible={modalVisible} >

                          <View style={styles.modalContent}>

                          <Icon
                          name="close"
                          size={20}
                          style={{marginBottom:30, width: 20}}
                          onPress={() => setModalVisible(!modalVisible)} />

                          <Text style={styles.TextCenter}> معلومات دعم المستثمر  </Text> 
                          <Text style={styles.TextCenter}> اسم المستثمر :  {item.Investorname} </Text> 
                          <Text style={styles.TextCenter}> وصف دعم المستثمر:  {item.EntMessage} </Text> 
                          <Text style={styles.TextCenter}>  المبلغ المقترح للدعم :  {item.SuggestedCost} </Text> 


                          <TouchableOpacity
                              //style={TitleStyles.Acceptbutton}
                              onPress={() => AcceptIdea()}>
                              <Text >قبول</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                             // style={TitleStyles.Rejectbutton}
                              onPress={() => RejectIdea()}>
                              <Text s>رفض</Text>
                          </TouchableOpacity>


    
                          </View>
                        </Modal>

              </View>
          );


}


const styles = StyleSheet.create({
    modalContent: {
        height: '50%',
        margin: 20,
        marginBottom: 'auto',
        marginTop: 'auto',
        backgroundColor: "white",
        borderColor:"#eeeeee",
        borderWidth:1,
        borderRadius: 20,
        padding: 35,
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
        color:'#1d2d44',
        textAlign: 'center',
        paddingTop:-10,
      
      
      }
});