
import Constants from 'expo-constants';
import ViewIdea from './ViewIdea';
import { StatusBar } from 'expo-status-bar';
import React ,{useEffect , useState , setState} from 'react';
import { StyleSheet, Text, View , FlatList , TouchableOpacity , Button , Image,Modal } from 'react-native';
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
//import Icon from 'react-native-vector-icons/FontAwesome';


let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function OffersList({ navigation, route }) {
  //Create model for pop up window 
    const [modalVisible, setModalVisible] = useState(false);

    const offersPath='ProductIdea/'+route.params.Product_id+'/InvestorsList/' ;

    const [offersList , setOffersList]= useState();
   
    useEffect(() => {
        let isUnmounted=false;
       const dataref=AfaadFirebase.database().ref(offersPath)
    
       dataref.on('value',(snapshot) =>{
          const offersList=[] // empty list
          const offers= snapshot.val();  
          for (let offerID in offers){
            offersList.push({offerID,...offers[offerID]});
          } 
          if(!isUnmounted){
          setOffersList(offersList);}

       });

       return()=>{
        isUnmounted=true;

       };

    }, [])
    return (

      <View style={Titlestyles.container}>

        <Image source={Background} style={{ flex: 1,width:'100%',height:'13%', opacity:1, position:'absolute' ,transform: [{ rotate: '180deg'}] }}/>
     
          <View style={Titlestyles.tasksWrapper}>
          <Text style={[Titlestyles.subTitle ,{fontSize:20 , marginBottom:36 , marginTop:35}]}>عروض الإستثمار</Text>
    
              <View style={Titlestyles.items}>
                  <FlatList style={{height:'85%'}}
                    data={offersList}
                    keyExtractor={(item, index)=>index.toString()}
        
                    renderItem={({ item })=>(

                      <TouchableOpacity // onPress={() => navigation.navigate('TODO', {Product_id:item.productID})}
                      onPress={() => setModalVisible(true)}
                      >   
                      <View style={Titlestyles.item}>
                      <Button 
                            style={Titlestyles.DetailsBtn}
                            //onPress={() => navigation.navigate('TODO', {Product_id:item.productID})}
                            onPress={() => setModalVisible(true)}
                            title="عرض التفاصيل"
                            titleProps={{}}
                            color='#247ba0'
                        />
                     
                        <Text style={Titlestyles.subTitle}>{item.Investorname}</Text>

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
                           // style={Titlestyles.Acceptbutton}
                            //onPress={() => AcceptIdea()}
                            >
                            <Text > قبول</Text>
                          </TouchableOpacity>  


                          <TouchableOpacity
                             // style={Titlestyles.Rejectbutton}
                              //onPress={() => RejectIdea()}
                              >
                              <Text >رفض</Text>
                          </TouchableOpacity> 
    
                          </View>
                        </Modal>
                       


                      </View>
                      </TouchableOpacity>

                    )}

                   /> 
       
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
