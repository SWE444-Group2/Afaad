
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';
import { cos } from 'react-native-reanimated';
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
        /*----
         why showing verified in  the details?
         -----setInvested(snapshot.child("invested").val());
         no need since the idea is still not accepted
         -----setFeasibilityAnalysis(snapshot.child("FeasibilityAnalysis").val());
         do not know how to upload the analysis yet 
         setTitle(snapshot.child("Title").val());
        setcostEstimation(snapshot.child("costEstimation").val());
        setinvestorsSpec(snapshot.child("investorsSpec").val());
        setUserID(snapshot.child("userID"))
          */
        
        


    });
    // console.log(pIdea);
    return(
        <View style={styles.container}>
           {/* <Text style={styles.label}>Feasibility Analysis</Text>
            <Text>{FeasibilityAnalysis}</Text> 
            <Text style={styles.label}>Verified</Text>
            <Text>{Verified}</Text>
            <Text style={styles.label}>Cost Estimation</Text>
            <Text>{costEstimation}</Text>
            <Text style={styles.label}>Cost Estimation</Text>
            <Text>{costEstimation}</Text>
            <Text style={styles.label}>Investors Specifications</Text>
            <Text>{investorsSpec}</Text>*/}
            <Text style={styles.label}>Title</Text>
            <Text>{Title}</Text>
            <Text style={styles.label}>Description</Text>
            <Text>{Description}</Text>
            <Text style={styles.label}>Date</Text>
            <Text>{date}</Text>
            <Text style={styles.label}>Catagory</Text>
            <Text>{category}</Text>
            
{/*The accept/ reject function is on Verify page*/}
            <Button style={styles.button}
               onPress={()=>AcceptIdea(itemData.item.id)}
               title="Accept"
            />

            <Button style={styles.button}
               onPress={()=>RejectIdea(itemData.item.id)}
               title="Reject"
            />  
           
            
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
  });
