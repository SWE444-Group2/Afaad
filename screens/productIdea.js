
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button , TouchableOpacity , Alert} from 'react-native';
import TitleStyles from './TitleStyles';


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
        <View style={[TitleStyles.containerDetails ]}>
        <View style={TitleStyles.square}/>
            <Text style={[TitleStyles.ProjectName ]}>{Title}</Text> 
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>فكرة المشروع</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{Description}</Text> 
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>القيمة التقديرية</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{costEstimation}</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>فئة المشروع</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{category}</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>المستثمر المراد</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{investorsSpec}</Text>
            

              <TouchableOpacity
                    style={TitleStyles.Acceptbutton}
                    onPress={() => AcceptIdea()}>
                    <Text style={TitleStyles.AcceptDetailsBtn}> قبول</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={TitleStyles.Rejectbutton}
                    onPress={() => RejectIdea()}>
                    <Text style={TitleStyles.RejectDetailsBtn}>رفض</Text>
                </TouchableOpacity>
            
           
            
           
        </View>
    )
}


