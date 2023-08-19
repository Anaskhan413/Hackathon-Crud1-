// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHAs79e8LuxYt4emP6zrLPf2jR46PU8E4",
    authDomain: "foodapplicationn-38ed3.firebaseapp.com",
    projectId: "foodapplicationn-38ed3",
    storageBucket: "foodapplicationn-38ed3.appspot.com",
    messagingSenderId: "804404644867",
    appId: "1:804404644867:web:6bbe060e9dfa6471a2d236",
    measurementId: "G-JZKLJBG82G"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize AUTH
const auth = getAuth();


export {
    db,
    auth,

}