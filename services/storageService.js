import { db } from '../lib/firebase'
import { query, where, documentId, collection, getDocs} from 'firebase/firestore'
import { readProfilesDataCacheAsync, updateProfilesDataCacheAsync } from '../lib/caching'

/**
 * - Returns other users' ProfileData, reads cache-first, updates from db if needed, used in ProfileContext
 * @param {string[]} [uids]
 * @returns {Promise<Object.<string, import('../lib/caching').ProfileDataCached>>}
 */
export async function getProfilesDataAsync(uids) {
  console.log("AS read")
  const profilesDataCache = await readProfilesDataCacheAsync()
  // Check if uids is not nullish and not an empty array
  if (uids != null && uids.length !== 0) {
    // Filter check if null or updated over an hour ago
    const needUpdates = uids.filter((uid) => 
      profilesDataCache == null
      || profilesDataCache[uid] == null
      || Date.now() - profilesDataCache[uid].updatedAt > 3600000
    )
    if (needUpdates.length > 0) {
      console.log("DB read")
      console.log("storageService\t:\tprofilesData update | needUpdates.length: ", needUpdates.length)
      const q = query(collection(db, "profiles"), where(documentId(), "in", needUpdates))
      const qSnap = await getDocs(q)
      const data = Object.fromEntries(
        qSnap.docs.map(doc => [doc.id, {
          updatedAt: Date.now(),
          username: doc.data().username,
          email: doc.data().email
        }])
      )
      await updateProfilesDataCacheAsync(data)
      // @ts-ignore never null here istg
      return readProfilesDataCacheAsync()
    }
  }
  if (profilesDataCache != null) {
    console.log("storageService\t:\tno profilesData update")
    return profilesDataCache
  }
  else {
    console.log("storageService\t:\tprofilesData == {}")
    return {}
  }
}
