import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app' ;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2iAuAhBcgED7WRZ2IaiN3B-dxCirZDuA",
  authDomain: "afaad-a831c.firebaseapp.com",
  databaseURL: "https://afaad-a831c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "afaad-a831c",
  storageBucket: "afaad-a831c.appspot.com",
  messagingSenderId: "258899203071",
  appId: "1:258899203071:web:1072dc66e5ad009fa38dca",
  measurementId: "G-6S74QZVLF8"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Afaad Project</Text>
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
});
