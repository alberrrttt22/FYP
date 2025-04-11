// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, limit } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsKndPpqdyrvabVSVgP1SGuAY1Sb70-Bg",
  authDomain: "fyp-project-d6e01.firebaseapp.com",
  projectId: "fyp-project-d6e01",
  storageBucket: "fyp-project-d6e01.firebasestorage.app",
  messagingSenderId: "1082778817275",
  appId: "1:1082778817275:web:4c139ff02478e9ceaf965e",
  measurementId: "G-HETFPCYWHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app
const db = getFirestore(app);

export { db, doc, setDoc, getDoc, collection, query, orderBy, limit };