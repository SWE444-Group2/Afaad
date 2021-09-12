import * as firebase from 'firebase';

const firebaseCinfig={
    apiKey: "AIzaSyDydIA4REfXXi-8SIOnf_FY7FiPTIVDHOI",
    authDomain: "afaad-33081.firebaseapp.com",
    projectId: "afaad-33081",
    storageBucket: "afaad-33081.appspot.com",
    messagingSenderId: "1045712481556",
    appId: "1:1045712481556:web:a0fe1ef9083f1ae3e62601",
    measurementId: "G-JP05EGXNHZ"
}
if(!firebase.apps.length){
// Initialize Firebase
firebase.initializeApp(firebaseCinfig);
}

export {firebase}
//