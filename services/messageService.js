import { db } from '../lib/firebase'
import { collection, query, orderBy, getDocs} from 'firebase/firestore'

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
    console.log("Error fetching messages:", groupId, error)
    return null
  }
}
