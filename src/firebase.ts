// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export const firebaseConfig = {
  apiKey: "AIzaSyAi0uwD3r9o5_5aGMXFL02DhEuEMdszN5U",
  authDomain: "testing-44c76.firebaseapp.com",
  projectId: "testing-44c76",
  storageBucket: "testing-44c76.firebasestorage.app",
  messagingSenderId: "1085135749262",
  appId: "1:1085135749262:web:4b46d502f14a588f1089df",
  measurementId: "G-2NL6NRLW1B", // optional
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Automatically sign in anonymously
// firebase deploy --only hosting:invoice-generator-ae3c0
