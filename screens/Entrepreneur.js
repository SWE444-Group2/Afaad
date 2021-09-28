import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Button, Icon } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';
import TitleStyles from './TitleStyles';


let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function welcome({ navigation }) {
    //signout function
    const onSignout = () => {
        auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={TitleStyles.sectionTitle}>مرحبا رائد الاعمال</Text>

            <Button style={styles.button}
                onPress={() => navigation.navigate('ViewIdea')}
                title="عرض مشاريعك"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
            />

            <Button style={styles.button}
                onPress={onSignout}
                title="تسجيل خروج"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
            />


<Icon style={styles.addIcon}
                name="add"
                onPress={() => navigation.navigate('PublishIdea')}
                size={70}
                type="material"
            />
            
            <StatusBar style="auto" />
        </View>
    );




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    width: 150,
    margin: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addIcon: {
    width:70,
    marginTop: '100%',
    backgroundColor:'#BFDBF7',
    borderRadius:50
},
});