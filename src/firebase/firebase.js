// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqvA49xOhgswWZpm3rEuYDdPKSi6oxalY",
  authDomain: "liongwang.firebaseapp.com",
  projectId: "liongwang",
  storageBucket: "liongwang.appspot.com",
  messagingSenderId: "729917860971",
  appId: "1:729917860971:web:b7afe06a2fc7d610ed552e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;