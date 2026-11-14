import { db } from '../lib/firebase'
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp} from 'firebase/firestore'

/**
 * Fetches snapshot of messages for a group
 * @param {string} groupId
 * @returns {Promise<Object[]|null>}
 */
export async function getMessagesForGroupAsync(groupId) {
  try {
    const messagesRef = collection(db, "groups", groupId, "messages")
    const q = query(messagesRef, orderBy("createdAt", "asc"))

    const messagesSnap = await getDocs(q)
    return messagesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.log("Error fetching messages: ", error)
    return null
  }
}

/**
 * Sends a message in a group chat
 * @param {string} uid
 * @param {string} groupId
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function sendMessageForGroupAsync(uid, groupId, text) {
  try {
    if (text.trim().length !== 0) {
      const groupMessColl = collection(db, "groups", groupId, "messages")
      await addDoc(groupMessColl, {
        text: text,
        senderId: uid,
        createdAt: serverTimestamp()
      })
    }
    return true
  } catch (error) {
    console.log("Error sending message: ", error)
    return false
  }
}
