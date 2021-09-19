import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Button, Icon } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';

let user = AfaadFirebase.auth().currentUser;
const auth = AfaadFirebase.auth();


export default function welcome({ navigation }) {
    console.log(user);
    //signout function
    const onSignout = () => {
        auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'splash' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text>welcome Admin,</Text>
            
            <Button style={styles.button}
                onPress={() => navigation.navigate('ViewAccount')}
                title="View Investors Accounts"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
            />
            <Button style={styles.button}
                onPress={() => navigation.navigate('ViewIdea')}
                title="View Entrepreneur Product Ideas"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
            />
            <Button style={styles.button}
                onPress={onSignout}
                title="Sign out"
                titleProps={{}}
                titleStyle={{ marginHorizontal: 5 }}
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
});
