// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmGVx3nXEoMekD2ZcL9SJcAGKxISzksfc",
  authDomain: "nua-auth-9634d.firebaseapp.com",
  projectId: "nua-auth-9634d",
  storageBucket: "nua-auth-9634d.appspot.com",
  messagingSenderId: "610643544902",
  appId: "1:610643544902:web:d94817c447d675f2523347",
  measurementId: "G-KNKT8JVPNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;