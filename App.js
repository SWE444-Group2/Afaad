import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { default as splash } from './screens/splash' ;
import { default as ViewIdea } from './screens/ViewIdea' ;
import { default as productIdea } from './screens/productIdea' ;
import {default as invstorsAccount} from './screens/investorAccount';
import { default as Login } from './screens/Login' ;
import { default as welcome } from './screens/welcome' ;


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
      <Stack.Screen name="View Idea" component={ViewIdea}/>
        <Stack.Screen name="Product Idea Details" component={productIdea}/>
        <Stack.Screen name="investor Account Details" component={invstorsAccount}/>
        <Stack.Screen name="splash" component={splash} />       
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="welcome" component={welcome} options={{ headerBackVisible: false, gestureEnabled: false, }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

