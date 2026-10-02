import { db } from '../lib/firebase'
import { doc, setDoc, getDoc, updateDoc, runTransaction,     collection, addDoc } from 'firebase/firestore'

/**
 * used in AuthContext, creates a "profiles" doc in Firestore, checks if username is claimed in Firestore, then claims it if not, using a transaction to ensure atomicity
 * @param {string} uid user id
 * @param {Object} data object with "email" and "username"
 */
export async function createProfileAsync(uid, data) {
  const profileRef = doc(db, "profiles", uid)
  const usernameRef = doc(db, "usernames", data.username.toLowerCase())

  await runTransaction(db, async (transaction) => {
    const usernameSnap = await transaction.get(usernameRef)
    if (usernameSnap.exists()){
      const usernameError = new Error("Username already in use.")
      usernameError.code = "username-error"
      throw usernameError
    }
    transaction.set(usernameRef, {uid: uid})
    transaction.set(profileRef, data)
  })
}

/**
 * used in ProfileContext, loads profile data from "profiles" in Firestore
 * @param {string} uid user id
 * @returns {Promise<Object|null>} The users profile data or null
 */
export async function loadProfileAsync(uid) {
  try {
    const docRef = doc(db, "profiles", uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
  } catch (error) {
    console.log("Error fetching profile: ", error)
  }
  return null
}

/**
 * used in ProfileContext, updates profile data
 * @param {string} uid user id
 * @param {Record<string, any>} data object with relevant fields
 */
export async function editProfileAsync(uid, data) {
  try {
    const docRef = doc(db, "profiles", uid)
    await updateDoc(docRef, data)
  } catch (error) {
    console.log("Error updating profile: ", error)
    throw error
  }
}
