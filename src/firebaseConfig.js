// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo_KiK9ylRdyxVZLe__Bcf83ryxzHL72k",
  authDomain: "fir-auth-project-25be4.firebaseapp.com",
  projectId: "fir-auth-project-25be4",
  storageBucket: "fir-auth-project-25be4.appspot.com",
  messagingSenderId: "33510708473",
  appId: "1:33510708473:web:d3de6dffb3ba1631b03e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };