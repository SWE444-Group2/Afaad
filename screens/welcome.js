import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AfaadFirebase from './firebaseConfig';
import 'firebase/auth';

const auth = AfaadFirebase.auth();


export default function welcome({ navigation }) {

    //when signout button is pressed perform this
    const onSignout = () => {
        auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'splash' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text>welcome</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 150,
        margin: 10,
    },
});
