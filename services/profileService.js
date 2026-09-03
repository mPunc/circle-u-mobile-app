import { db } from '../lib/firebase'
import { doc, setDoc, getDoc,      collection, addDoc } from 'firebase/firestore'

export async function createProfile(uid, data) {
  try {
    const docRef = doc(db, "profiles", uid)
    await setDoc(docRef, data)
  } catch (error) {
    console.error('Error creating profile:', error)
  }
}

export async function getProfile(uid) {
  try {
    const docRef = doc(db, "profiles", uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
  return null
}
