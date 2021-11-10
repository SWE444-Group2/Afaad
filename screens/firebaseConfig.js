import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/storage";
//firebase connection
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

//firebase initialization
let AfaadFirebase
if (firebase.apps.length === 0) {
    AfaadFirebase = firebase.initializeApp(firebaseConfig);
}

export default AfaadFirebase;