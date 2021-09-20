
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button , TouchableOpacity , Alert} from 'react-native';

import AfaadFirebase from "./firebaseConfig";
// Expecting an id of product idea
export default function productIdea({navigation , route}) {
    const ProductPath='ProductIdea/'+route.params.Product_id ;
    const [date, setdate] = useState('');
    const [Description, setDescription] = useState('');
    //const [FeasibilityAnalysis, setFeasibilityAnalysis] = useState('');
    const [Verified, setVerified] = useState('');
    const [Title, setTitle] = useState('');
    const [category, setcategory] = useState('');
    const [costEstimation, setcostEstimation] = useState('');
    const [invested, setInvested] = useState('');
    const [investorsSpec, setinvestorsSpec] = useState('');
    const [userID, setUserID] = useState('');


    const productIdeaRef = AfaadFirebase.database().ref(ProductPath)
    productIdeaRef.once('value').then(function(snapshot){
        setTitle(snapshot.child("Title").val())
        setdate(snapshot.child("date").val());
        setDescription(snapshot.child("ProductDescription").val());
        setVerified(snapshot.child("accepted").val());
        setcategory(snapshot.child("category").val());
        setcostEstimation(snapshot.child("costEstimation").val());
        setinvestorsSpec(snapshot.child("investorsSpec").val());
       });

    const AcceptIdea=()=>{

        productIdeaRef.update({
            status : 'Accepted' } )

        Alert.alert(
            "رائع!",
            "تم قبول الفكرة بنجاح",[{text: "العودة لقائمه الافكار" ,onPress: () => {navigation.navigate('ViewIdea')}}]
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
          <Text style={styles.label}>Title</Text>
            <Text>{Title}</Text> 
            <Text style={styles.label}>Description</Text>
            <Text>{Description}</Text> 
            <Text style={styles.label}>Cost Estimation</Text>
            <Text>{costEstimation}</Text>
            <Text style={styles.label}>Investors Specifications</Text>
            <Text>{investorsSpec}</Text>
            <Text style={styles.label}>Date</Text>
            <Text>{date}</Text>
            <Text style={styles.label}>Catagory</Text>
            <Text>{category}</Text>
            
{/*The accept/ reject function is on Verify page*/}
              <TouchableOpacity
                    style={styles.button}
                    onPress={() => AcceptIdea()}>
                    <Text style={styles.buttonTitle}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => RejectIdea()}>
                    <Text style={styles.buttonTitle}>Reject</Text>
                </TouchableOpacity>
            
           
            
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E1E5F2',
      alignItems: 'center',
    },
    label:{
        fontWeight: "bold",
        fontSize: 17
        },
     button: {
        width: 150,
        margin: 10,
        },
    buttonTitle: {
        color: 'dodgerblue',
        fontSize: 16,
        fontWeight: "bold",
        
        },
  });
