
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button , TouchableOpacity , Alert ,Image } from 'react-native';
import TitleStyles from './TitleStyles';
import AfaadLogo from '../assets/images/LOGO.jpeg';


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
        setcostEstimation(snapshot.child("costEstimation").val());
        setinvestorsSpec(snapshot.child("investorsSpec").val());
       });
  
        
       console.log(status);

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
        <ScrollView >
        <View style={[TitleStyles.containerDetails ]}>
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
               </View>



               

            
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
                   style={TitleStyles.investButton}>
                   <Text style={TitleStyles.AcceptDetailsBtn}>استثمر</Text>
                </TouchableOpacity>  }   

                 { userType== 'Investor' &&
                   <TouchableOpacity
                   style={TitleStyles.investButton}>
                   <Text style={TitleStyles.AcceptDetailsBtn}>ادعم</Text>
                </TouchableOpacity>  }        
         </View>  
        </View>

        </ScrollView>

        
    )
}


const styles = StyleSheet.create({
    
    inner: {
        padding: 24,
        justifyContent: 'space-evenly'

    }, });


