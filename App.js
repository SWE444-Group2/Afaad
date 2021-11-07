import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { default as splash } from './screens/splash' ;
import { default as ViewIdea } from './screens/ViewIdea' ;
import {default as ViewAccount} from './screens/ViewAccount';
import { default as Admin } from './screens/Admin' ;
import { default as EntrepreneurAndInvestor } from './screens/EntrepreneurAndInvestor' ;
import { default as productIdea } from './screens/productIdea' ;
import {default as investorAccount} from './screens/investorAccount';
import { default as Login } from './screens/Login' ;
import { default as welcome } from './screens/welcome' ;
import { default as SignUpEntr } from './screens/SignUpEntr' ;
import { default as SignUpInvst } from './screens/SignUpInvst' ;
import { default as PublishIdea } from './screens/PublishIdea' ;
import { default as MainScreen } from './screens/MainScreen' ;
import { default as SignupOption } from './screens/SignupOption' ;
import { default as ResetPass } from './screens/ResetPass' ;
import { default as PendingPage } from './screens/PendingPage' ;
import { default as conditionsPage } from './screens/conditionsPage' ;
import { default as NotificationsNav } from './screens/NotificationsNav' ;
import { default as InvestorRequest } from './screens/InvestorRequest' ;
import { default as OffersList } from './screens/OffersList' ;
import { default as profile } from './screens/profile' ;
import {default as InvestedProductIdea} from './screens/InvestedProductIdea' ;
import {default as Search} from './screens/Search';
import {default as SearchResult} from './screens/SearchResult';

import {useFonts} from 'expo-font';

export default function App() {

  const[isLoaded]=useFonts({
    AJannatLT: require('./assets/fonts/AJannatLT.otf'),
    AJannatLTBold: require('./assets/fonts/AJannatLT-Bold.otf'),
  });

if(!isLoaded){
  return null;
}


  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerTitle: "ابدأ"}}/> 

      <Stack.Screen name="splash" component={splash} />  

      <Stack.Screen name="welcome" component={welcome} options={{ headerTitle:'الصفحة الرئيسية', headerBackVisible: false, gestureEnabled: false, }}/>
      
      <Stack.Screen name="ViewIdea" component={ViewIdea} options={{ headerTitle: "قائمة المشاريع",
        headerStyle: { backgroundColor: '#7c98b3' }, headerBackTitleVisible: false, headerTintColor: 'white' }} />  
      
      <Stack.Screen name="ViewAccount" component={ViewAccount} options={{ headerTitle: "قائمة الحسابات", 
        headerStyle: { backgroundColor: '#7c98b3' }, headerBackTitleVisible: false, headerTintColor: 'white'}} />
      
      <Stack.Screen name="productIdea" component={productIdea} options={{ headerTitle: "تفاصيل المشروع",
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white'}} />
      
      <Stack.Screen name="investorAccount" component={investorAccount} options={{ headerTitle: "تفاصيل الحساب"}}/>         
      
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: "تسجيل الدخول"}} />
      
      <Stack.Screen name="SignUpEntr" component={SignUpEntr} options={{ headerTitle: "إنشاء حساب "}}/>
      
      <Stack.Screen name="conditionsPage" component={conditionsPage} options={{ headerTitle: "الشروط وسياسة الإفصاح "}}/>
      
      <Stack.Screen name="SignUpInvst" component={SignUpInvst} options={{ headerTitle: "إنشاء حساب "}} />
      
      <Stack.Screen name="PublishIdea" component={PublishIdea} options={{ headerTitle:'',
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white' }}/>
      
      <Stack.Screen name="Admin" component={Admin} options={{ headerTitle:'الصفحة الرئيسية',headerBackVisible: false , gestureEnabled: false,
        headerTintColor: 'white', headerStyle: { backgroundColor: '#7c98b3' } }}/>

      <Stack.Screen name="EntrepreneurAndInvestor" component={EntrepreneurAndInvestor} 
        options={{ headerTitle:'الصفحة الرئيسية', headerBackVisible: false, gestureEnabled: false, 
        headerTintColor: 'white', headerStyle: { backgroundColor: '#7c98b3' },}}/>        
      
      <Stack.Screen name="SignupOption" component={SignupOption} options={{ headerTitle: ""}}/>
      
      <Stack.Screen name="ResetPass" component={ResetPass} options={{ headerTitle: "إعادة تعيين كلمة المرور"}}/>
      
      <Stack.Screen name="PendingPage" component={PendingPage} options={{ headerTitle:'الصفحة الرئيسية',headerBackVisible: false ,gestureEnabled: false}}/>
      
      <Stack.Screen name="NotificationsNav" component={NotificationsNav} options={{ headerTitle:'الاشعارات',headerBackVisible: false ,gestureEnabled: false}}/>
      
      <Stack.Screen name="InvestorRequest" component={InvestorRequest} options={{ headerTitle:'',
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white'}}/>
      
      <Stack.Screen name="OffersList" component={OffersList} options={{ headerTitle: "عروض الإستثمار",
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white'}}/>
      
      <Stack.Screen name="InvestedProductIdea" component={InvestedProductIdea} options={{ headerTitle: "المشاريع المستثمرة" , headerBackVisible: false ,gestureEnabled: false}}/>
      
      <Stack.Screen name="profile" component={profile} options={{ headerTitle: "الملف الشخصي",
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackVisible: false, headerTintColor: 'white', gestureEnabled: false}}/>

      <Stack.Screen name="Search" component={Search} options={{ headerTitle: "البحث",
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackVisible: false, headerTintColor: 'white', gestureEnabled: false}}/>
        <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerTitle: "نتائج البحث",
        headerStyle: { backgroundColor: '#7c98b3'}, headerTintColor: 'white'}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}