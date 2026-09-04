import { db } from '../lib/firebase'
import { doc, setDoc, getDoc, updateDoc,      collection, addDoc } from 'firebase/firestore'

// used in AuthContext
export async function createProfileAsync(uid, data) {
  try {
    const docRef = doc(db, "profiles", uid)
    await setDoc(docRef, data)
  } catch (error) {
    console.log('Error creating profile:', error)
  }
}

// used in ProfileContext
export async function getProfileAsync(uid) {
  try {
    const docRef = doc(db, "profiles", uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  } catch (error) {
    console.log('Error fetching profile:', error)
  }
  return null
}

// used in ProfileContext
// add validation for unique usernames (check firebase for this)
export async function editProfileAsync(uid, data) {
  try {
    const docRef = doc(db, "profiles", uid)
    await updateDoc(docRef, data)
  } catch (error) {
    console.log('Error updating profile:', error)
    throw error
  }
}
