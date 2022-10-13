// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMWLdAFI6vnAdoh8LoiCkEiSZaGFIuEUA",
  authDomain: "pagina-bp-rubrica.firebaseapp.com",
  projectId: "pagina-bp-rubrica",
  storageBucket: "pagina-bp-rubrica.appspot.com",
  messagingSenderId: "541479518770",
  appId: "1:541479518770:web:26c9dcc7c02ba2c989722b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const bd = getFirestore(app);
export {bd};