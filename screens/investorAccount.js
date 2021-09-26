import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity , Alert } from 'react-native';
import AfaadFirebase from "./firebaseConfig";
import TitleStyles from './TitleStyles';


// Expecting an id of product idea


export default function invstorsAccount({navigation , route}) {

    const AccountPath='Investor/'+route.params.InvestorID;

   
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Desc, setDesc] = useState('');
    const [email, setEmail] = useState('');

    const invstorsAccountRef = AfaadFirebase.database().ref(AccountPath);
    invstorsAccountRef.once('value').then(function(snapshot){
        
               
        setFirstname(snapshot.child("FirstName").val());
        setLastname(snapshot.child("LastName").val());
        setDesc(snapshot.child("description").val());
        setEmail(snapshot.child("email").val());
    });


    const AcceptIdea=()=>{

        invstorsAccountRef.update({
            Verified : 'Accepted' } )

        Alert.alert(
            "رائع!",
            "تم قبول المستثمر  بنجاح",[{text: "العودة لقائمه المستثمرين" ,onPress: () => {navigation.navigate('ViewAccount')}}]
            );
    }

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
        <View style={[TitleStyles.containerDetails , styles.container]}>
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>الاسم الاول</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{Firstname}</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>الاسم الاخير</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{Lastname}</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>البريد الالكتروني</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{email}</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.TitleFix]}>وصف المستثمر</Text>
            <Text style={[TitleStyles.subTitle , TitleStyles.DescText]}>{Desc}</Text>

<TouchableOpacity
                    style={TitleStyles.Acceptbutton}
                    onPress={() => AcceptIdea()}>
                    <Text style={TitleStyles.AcceptDetailsBtn}>قبول</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={TitleStyles.Rejectbutton}
                    onPress={() => RejectIdea()}>
                    <Text style={TitleStyles.RejectDetailsBtn}>رفض</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
  });
