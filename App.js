import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase/app' ;
import { default as splash } from './screens/splash' ;

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
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen name="splash" component={splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

