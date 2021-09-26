import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';

import { Button } from 'react-native-elements' ;


export default function splash({ navigation }) {
   return (
    <View style={styles.container}>
      <Text>Afaad Project</Text>
      <Button style={styles.button}
      onPress={() => navigation.navigate('Login')}
      title="Log in"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
        <Button style={styles.button}
      onPress={() => navigation.navigate('SignUpEntr')}
      title="Sign Up Entrepreneur"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
    <Button style={styles.button}
      onPress={() => navigation.navigate("SignUpEntr")}
      title="Sign Up investor"
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
