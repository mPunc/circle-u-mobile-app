import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'

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
const persistence = getReactNativePersistence(ReactNativeAsyncStorage)

export const auth = initializeAuth(app, {
  persistence
})
export const db = getFirestore(app)
