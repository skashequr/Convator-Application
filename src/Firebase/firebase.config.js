// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0RtJz-mU05oxgRDQy7HAFsbKiGqzHKL8",
  authDomain: "ours-conveter.firebaseapp.com",
  projectId: "ours-conveter",
  storageBucket: "ours-conveter.appspot.com",
  messagingSenderId: "778892249170",
  appId: "1:778892249170:web:0d816c84a5f798279f378b",
  measurementId: "G-0KSY2E4EWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;