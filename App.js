import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { default as splash } from './screens/splash' ;
import { default as ViewIdea } from './screens/ViewIdea' ;
import {default as ViewAccount} from './screens/ViewAccount';


import { default as productIdea } from './screens/productIdea' ;
import {default as investorAccount} from './screens/investorAccount';
import { default as Login } from './screens/Login' ;
import { default as welcome } from './screens/welcome' ;
import { default as SignUp } from './screens/SignUp' ;
import { default as PublishIdea } from './screens/PublishIdea' ;


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
      <Stack.Screen name="splash" component={splash} />  
        <Stack.Screen name="welcome" component={welcome} options={{ headerBackVisible: false, gestureEnabled: false, }}/>
        <Stack.Screen name="ViewIdea" component={ViewIdea}/>  
        <Stack.Screen name="ViewAccount" component={ViewAccount}/>
        <Stack.Screen name="productIdea" component={productIdea}/>
        <Stack.Screen name="investorAccount" component={investorAccount}/>         
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="PublishIdea" component={PublishIdea} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

