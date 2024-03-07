// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Dl5KYueXvp_VwULccj74pm9B7J_Z7UQ",
  authDomain: "react-task--1.firebaseapp.com",
  databaseURL: "https://react-task--1-default-rtdb.firebaseio.com",
  projectId: "react-task--1",
  storageBucket: "react-task--1.appspot.com",
  messagingSenderId: "941267584321",
  appId: "1:941267584321:web:5f253f98e6b1d5d643cdc0",
  measurementId: "G-4YV7SBHLR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };