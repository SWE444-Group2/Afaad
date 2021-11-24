import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements' ;


export default function splash({ navigation }) {
   return (
    <View style={styles.container}>
      <Text>Afaad Project</Text>
      <Button style={styles.button}
      onPress={() => navigation.navigate('Login')}
      title="تسجيل دخول"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT'}}
    />
        <Button style={styles.button}
      onPress={() => navigation.navigate('SignUpEntr')}
      title="تسجيل رواد الأعمال"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT'}}
    />
    <Button style={styles.button}
      onPress={() => navigation.navigate("SignUpInvst")}
      title="تسجيل المستثمرين"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5, fontFamily: 'AJannatLT'}}
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
    width: 170,
    margin: 10,
  },
});
