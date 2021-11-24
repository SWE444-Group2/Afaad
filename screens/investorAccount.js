import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View ,TouchableOpacity , Alert , Image } from 'react-native';
import AfaadFirebase from "./firebaseConfig";
import TitleStyles from './TitleStyles';
import AfaadLogo from '../assets/images/LOGO.jpeg';


// Expecting an id of product idea


export default function invstorsAccount({navigation , route}) {

    const AccountPath='Investor/'+route.params.InvestorID;

   
    const [FullName, setFullName] = useState('');
    const [Desc, setDesc] = useState('');
    const [email, setEmail] = useState('');

    const invstorsAccountRef = AfaadFirebase.database().ref(AccountPath);
    invstorsAccountRef.once('value').then(function(snapshot){
        
               
        setFullName(snapshot.child("FullName").val());
        setDesc(snapshot.child("Describetion").val());
        setEmail(snapshot.child("email").val());
    });


    const AcceptIdea=()=>{

        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من قبول المستثمر؟",
            [
              {
                text: "نعم", onPress: () => { 
                    invstorsAccountRef.update({Verified : 'Accepted' } )
                    Alert.alert(
                        "رائع!",
                        "تم قبول المستثمر بنجاح",[{text: "العودة لقائمه المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
                        );                         }
              },
              { text: "إلغاء"}
            ]
          ); }

    const RejectIdea=()=>{
        Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من رفض المستثمر؟",
            [
              {
                text: "نعم", onPress: () => { 
                    invstorsAccountRef.update({Verified : 'Rejected' } )
                    Alert.alert(
                        "رائع!",
                        "تم رفض المستثمر بنجاح",[{text: "العودة لقائمه المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
                        );                         }
              },
              { text: "إلغاء"}
            ]
          ); }
          
    // console.log(pIdea);
    return(
        <View style={[TitleStyles.containerDetails]}>
            <Image source={AfaadLogo} style={{ width: 150, height: 150 }}/>
            <Text style={[TitleStyles.ProjectName ]}>معلومات المستثمر</Text> 
            <View style={TitleStyles.square} >
              <Text style={[ TitleStyles.TitleFix]}>البيانات الشخصية</Text>
              <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
              <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>الاسم الكامل : {FullName}</Text>
              <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>البريد الالكتروني : {email}</Text>
              <Text style={[TitleStyles.TitleFix]}>وصف المستثمر</Text>
              <View style={{ backgroundColor: '#d2d2cf',height: 1 , width:'50%'}}/>
              <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{Desc}</Text>
        </View>

        <View style={{flexDirection:'row'}}>

        <TouchableOpacity
                    style={TitleStyles.Rejectbutton}
                    onPress={() => RejectIdea()}>
                    <Text style={TitleStyles.RejectDetailsBtn}>رفض</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={TitleStyles.Acceptbutton}
                    onPress={() => AcceptIdea()}>
                    <Text style={TitleStyles.AcceptDetailsBtn}>قبول</Text>
                </TouchableOpacity>


                </View>

                <StatusBar style="auto" />
        </View>
    )
}


