// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5ugPvp2Q9MW9qdB7vsJcIHExbZUSsKQg",
  authDomain: "checkmate-80161.firebaseapp.com",
  projectId: "checkmate-80161",
  storageBucket: "checkmate-80161.appspot.com",
  messagingSenderId: "1040686950298",
  appId: "1:1040686950298:web:e70724f4e41df6f5c47c23",
  measurementId: "G-21S53Z18T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
