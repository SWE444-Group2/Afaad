import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
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
import { default as profileInv } from './screens/profileInv' ;
import {default as InvestedProductIdea} from './screens/InvestedProductIdea' ;
import {default as Search} from './screens/Search';
import {default as SearchResult} from './screens/SearchResult';
import { default as updateProductIdea } from './screens/updateProductIdea';
import { default as Favorites } from './screens/Favorites';
import { default as contactForm } from './screens/contactForm' ;
import { default as ContactMessages } from './screens/contactMessages' ;

import {useFonts} from 'expo-font';

export default function App() {

  const[isLoaded]=useFonts({
    AJannatLT: require('./assets/fonts/AJannatLT.otf'),
    AJannatLTBold: require('./assets/fonts/AJannatLT-Bold.otf'),
  });

if(!isLoaded){
  return null;
}


  const Stack = createStackNavigator();

  const animationOff = {
    animation: 'timing',
    config: {
      duration: 0,
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerTitle: "ابدأ"}}/> 

      <Stack.Screen name="splash" component={splash} />  

      <Stack.Screen name="welcome" component={welcome} options={{ headerTitle:'',
       headerBackVisible: false, gestureEnabled: false }}/>
      
      <Stack.Screen name="ViewIdea" component={ViewIdea} options={{ headerTitle: "قائمة المشاريع",
        headerStyle: { backgroundColor: '#7c98b3' }, headerBackTitleVisible: false, headerTintColor: 'white' }} />  
      
      <Stack.Screen name="ViewAccount" component={ViewAccount} options={{ headerTitle: "قائمة الحسابات", 
        headerStyle: { backgroundColor: '#7c98b3' }, headerBackTitleVisible: false, headerTintColor: 'white'}} />
      
      <Stack.Screen name="productIdea" component={productIdea} options={{ headerTitle: "",
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white'}} />
      
      <Stack.Screen name="investorAccount" component={investorAccount} options={{ headerTitle: "تفاصيل الحساب"}}/>         
      
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: ""}} />
      
      <Stack.Screen name="SignUpEntr" component={SignUpEntr} options={{ headerTitle: "إنشاء حساب "}}/>
      
      <Stack.Screen name="conditionsPage" component={conditionsPage} options={{ headerTitle: "الشروط وسياسة الإفصاح "}}/>
      
      <Stack.Screen name="SignUpInvst" component={SignUpInvst} options={{ headerTitle: "إنشاء حساب "}} />
      
      <Stack.Screen name="PublishIdea" component={PublishIdea}  options={{ presentation: 'modal', gestureEnabled: false, headerTitle:'',
        headerStyle: { backgroundColor: '#7c98b3'}, headerLeft: ()=> null, headerTintColor: 'white' }}/>
      
      <Stack.Screen name="Admin" component={Admin} options={{ headerTitle:'',
        gestureEnabled: false, headerTintColor: 'white', headerStyle: { backgroundColor: '#7c98b3' },
        headerLeft: ()=> null}}/>

      <Stack.Screen name="EntrepreneurAndInvestor" component={EntrepreneurAndInvestor} options={{ headerTitle:'',
        gestureEnabled: false, headerTintColor: 'white', headerStyle: { backgroundColor: '#7c98b3' },
        headerLeft: ()=> null,
        }}/>        
      
      <Stack.Screen name="SignupOption" component={SignupOption} options={{ headerTitle: ""}}/>
      
      <Stack.Screen name="ResetPass" component={ResetPass} options={{ headerTitle: "إعادة تعيين كلمة المرور"}}/>
      
      <Stack.Screen name="PendingPage" component={PendingPage} options={{ headerTitle:'الصفحة الرئيسية',headerBackVisible: false ,gestureEnabled: false}}/>
      
      <Stack.Screen name="NotificationsNav" component={NotificationsNav} options={{ headerTitle:'',headerBackVisible: false,
        gestureEnabled: false, headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white',
        transitionSpec: {
          open: animationOff,
          close: animationOff,
        },
        headerLeft: ()=> null
        }}/>
      
      <Stack.Screen name="InvestorRequest" component={InvestorRequest} options={{ presentation: 'modal', gestureEnabled: false,
        headerTitle:'', headerStyle: { backgroundColor: '#7c98b3'}, headerLeft: ()=> null,
       }}/>

      <Stack.Screen name="contactForm" component={contactForm} options={{ presentation: 'modal', gestureEnabled: false,
        headerTitle:'', headerStyle: { backgroundColor: '#7c98b3'}, headerLeft: ()=> null,
       }}/>
      
      <Stack.Screen name="OffersList" component={OffersList} options={{ headerTitle: "",
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white'}}/>
      
      <Stack.Screen name="InvestedProductIdea" component={InvestedProductIdea} options={{ headerTitle: "" ,
        gestureEnabled: false ,  headerStyle: { backgroundColor: '#7c98b3'}, headerTintColor: 'white',
        transitionSpec: {
          open: animationOff,
          close: animationOff,
        },
        headerLeft: ()=> null,}}/>
      
      <Stack.Screen name="profile" component={profile} options={{ headerTitle: "", headerStyle: { backgroundColor: '#7c98b3'},
        headerBackVisible: false, headerTintColor: 'white', gestureEnabled: false,
        transitionSpec: {
          open: animationOff,
          close: animationOff,
        },
        headerLeft: ()=> null,}}/>

<Stack.Screen name="profileInv" component={profileInv} options={{ headerTitle: "", headerStyle: { backgroundColor: '#7c98b3'},
        headerBackVisible: false, headerTintColor: 'white', gestureEnabled: false,
        transitionSpec: {
          open: animationOff,
          close: animationOff,
        },
        headerLeft: ()=> null,}}/>




      <Stack.Screen name="Search" component={Search} options={{ headerTitle: "", headerStyle: { backgroundColor: '#7c98b3'},
        headerBackVisible: false, headerTintColor: 'white', gestureEnabled: false,
        transitionSpec: {
          open: animationOff,
          close: animationOff,
        },
        headerLeft: ()=> null}}/>
     
      <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerTitle: "", headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#7c98b3'}, headerTintColor: 'white'}}/>

      <Stack.Screen name="Favorites" component={Favorites} options={{ headerTitle: "", headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#7c98b3'}, headerTintColor: 'white'}}/>

      <Stack.Screen name="updateProductIdea" component={updateProductIdea} options={{ headerTitle:'',
        headerStyle: { backgroundColor: '#7c98b3'}, headerBackTitleVisible: false, headerTintColor: 'white' }}/>
      
      <Stack.Screen name="ContactMessages" component={ContactMessages} options={{ headerTitle: "", headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#7c98b3'}, headerTintColor: 'white'}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}