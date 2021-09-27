import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { default as splash } from './screens/splash' ;
import { default as ViewIdea } from './screens/ViewIdea' ;
import {default as ViewAccount} from './screens/ViewAccount';
import { default as Admin } from './screens/Admin' ;
import { default as Investor } from './screens/Investor' ;
import { default as Entrepreneur } from './screens/Entrepreneur' ;
import { default as productIdea } from './screens/productIdea' ;
import {default as investorAccount} from './screens/investorAccount';
import { default as Login } from './screens/Login' ;
import { default as welcome } from './screens/welcome' ;
import { default as SignUpEntr } from './screens/SignUpEntr' ;
import { default as SignUpInvst } from './screens/SignUpInvst' ;
import { default as PublishIdea } from './screens/PublishIdea' ;
import {useFonts} from 'expo-font';

export default function App() {

  const[isLoaded]=useFonts({
    AJannatLT: require('./assets/fonts/AJannatLT.otf'),
    AJannatLTBold: require('./assets/fonts/AJannatLT-Bold.otf'),
  });


  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
      <Stack.Screen name="splash" component={splash} />  
        <Stack.Screen name="welcome" component={welcome} options={{ headerTitle:'الصفحة الرئيسية', headerBackVisible: false, gestureEnabled: false, }}/>
        <Stack.Screen name="ViewIdea" component={ViewIdea} options={{ headerTitle: ""}}/>  
        <Stack.Screen name="ViewAccount" component={ViewAccount} options={{ headerTitle: ""}} />
        <Stack.Screen name="productIdea" component={productIdea} options={{ headerTitle: ""}} />
        <Stack.Screen name="investorAccount" component={investorAccount} options={{ headerTitle: ""}}/>         
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="SignUpEntr" component={SignUpEntr} options={{ headerTitle: "إنشاء حساب "}}/>
        <Stack.Screen name="SignUpInvst" component={SignUpInvst} options={{ headerTitle: "إنشاء حساب "}} />
        <Stack.Screen name="PublishIdea" component={PublishIdea} options={{ headerTitle: "نشر مشروع جديد"}}/>
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Investor" component={Investor} />
        <Stack.Screen name="Entrepreneur" component={Entrepreneur} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}