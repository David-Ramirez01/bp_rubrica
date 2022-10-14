// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMIrswUCmPm6DX61LfRtmyIHT9oy_I28k",
  authDomain: "bp-rubrica.firebaseapp.com",
  projectId: "bp-rubrica",
  storageBucket: "bp-rubrica.appspot.com",
  messagingSenderId: "1072787854031",
  appId: "1:1072787854031:web:84ce1ee5f20484728cddba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const bd = getFirestore(app);
export {bd};