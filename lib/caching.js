import AsyncStorage from '@react-native-async-storage/async-storage'

// add avatar and other similar data
/**
 * @typedef ProfileDataCached
 * @property {number} updatedAt
 * @property {string} username
 * @property {string} email
 */

/**
 * - Caches ProfileData of other profiles to AS
 * @param {Object.<string, ProfileDataCached>} profilesData
 */
export async function updateProfilesDataCacheAsync(profilesData) {
  try {
    const jsonData = JSON.stringify(profilesData)
    AsyncStorage.mergeItem("profilesData", jsonData)
  } catch (e) {
    console.log(e)
  }
}
/**
 * - Reads cached ProfileData of other profiles from AS
 * @returns {Promise<Object.<string, ProfileDataCached> | null>}
 */
export async function readProfilesDataCacheAsync() {
  try {
    const jsonData = await AsyncStorage.getItem("profilesData")
    return jsonData != null ? JSON.parse(jsonData) : null
  } catch (e) {
    console.log(e)
  }
  return null
}
/**
 * - Clears "profilesData" values from AS
 */
export async function removeProfilesDataCacheAsync() {
  try {
    AsyncStorage.removeItem("profilesData")
  } catch (e) {
    console.log(e)
  }
}
