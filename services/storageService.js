import { db } from '../lib/firebase'
import { query, where, documentId, collection, getDocs} from 'firebase/firestore'
import { readUsernamesCacheAsync, updateUsernamesCacheAsync } from '../lib/caching'

/**
 * - Returns other users' username data, reads from cache first, updates from db if needed, used in ProfileContext
 * @param {string[]} [uids]
 * @returns {Promise<import('../lib/caching').Usernames | Object>}
 */
export async function getUsernamesAsync(uids) {
  const usernamesCache = await readUsernamesCacheAsync()
  // Check if uids is not nullish and not an empty array
  if (uids != null && uids.length !== 0) {
    // Check if not null or updated over an hour ago
    const needsUpdate = usernamesCache == null || Date.now() - usernamesCache.updatedAt > 3600000
    if (needsUpdate) {
      console.log("storageService\t//\tUpdating usernames cache")
      const q = query(collection(db, "profiles"), where(documentId(), "in", uids))
      const qSnap = await getDocs(q)
      const usernames = Object.fromEntries(
        qSnap.docs.map(doc => [doc.id, doc.data().username])
      )
      await updateUsernamesCacheAsync(usernames)
      // @ts-ignore never null here istg
      return readUsernamesCacheAsync()
    }
  }
  if (usernamesCache != null) {
    console.log("storageService\t//\tReturning usernames from cache")
    return usernamesCache
  }
  else {
    console.log("storageService\t//\tReturning empty object")
    return {}
  }
}
