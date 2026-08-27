import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBWH0fwiC00DV0RrpK_9xiENrUfSuFnmT0",
  authDomain: "circle-u-mobile-app.firebaseapp.com",
  projectId: "circle-u-mobile-app",
  storageBucket: "circle-u-mobile-app.firebasestorage.app",
  messagingSenderId: "210570878241",
  appId: "1:210570878241:web:82d7fc407136f9d3107260",
  measurementId: "G-8VCJF1VH00"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
