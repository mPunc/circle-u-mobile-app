import { db } from '../lib/firebase'
import { collection, query, orderBy, getDocs, serverTimestamp, writeBatch, doc } from 'firebase/firestore'

/**
 * @typedef MessageData
 * @property {string} id
 * @property {string} text
 * @property {string} senderId
 * @property {import("firebase/firestore").Timestamp} createdAt
 */

/**
 * Fetches snapshot of messages for a group
 * @param {string} groupId
 * @returns {Promise<MessageData[]>}
 */
export async function getMessagesForGroupAsync(groupId) {
  try {
    const messagesRef = collection(db, "groups", groupId, "messages")
    const q = query(messagesRef, orderBy("createdAt", "asc"))

    const messagesSnap = await getDocs(q)
    return messagesSnap.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      senderId: doc.data().senderId,
      createdAt: doc.data().createdAt,
      ...doc.data()
    }))
  } catch (error) {
    console.log("Error fetching messages: ", error)
    return []
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
      const batch = writeBatch(db)
      const messageRef = doc(collection(db, "groups", groupId, "messages"))
      const groupRef = doc(db, "groups", groupId)
      const timestamp = serverTimestamp()
      batch.set(messageRef, {
        senderId: uid,
        text: text,
        createdAt: timestamp
      })
      batch.update(groupRef, {
        lastActivity: {
          senderId: uid,
          type: "message",
          content: text,
          createdAt: timestamp
        }
      })
      await batch.commit()
    }
    return true
  } catch (error) {
    console.log("Error sending message: ", error)
    return false
  }
}
