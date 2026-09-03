import { db } from '../lib/firebase'
import { doc, setDoc,      collection, addDoc, getDoc } from 'firebase/firestore'

export async function createProfile(uid, data) {
  try {
    const profileRef = doc(db, "profiles", uid)
    await setDoc(profileRef, data)
  } catch (error) {
    console.error('Error creating profile:', error)
  }
}

export async function getProfile(uid) {

}
