import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * @typedef Usernames
 * @property {number} updatedAt
 * @property {Object.<string, string>} data
 */

/**
 * - Caches usernames of other users to AS
 * @param {Object.<string, string>} usernames
 */
export async function updateUsernamesCacheAsync(usernames) {
  try {
    const usernamesData = {
      "updatedAt": Date.now(),
      "data": usernames
    }
    const jsonData = JSON.stringify(usernamesData)
    await AsyncStorage.mergeItem("usernames", jsonData)
  } catch (e) {
    console.log(e)
  }
}
/**
 * - Reads cached "usernames" from AS
 * @returns {Promise<Usernames|null>}
 */
export async function readUsernamesCacheAsync() {
  try {
    const jsonData = await AsyncStorage.getItem("usernames")
    return jsonData != null ? JSON.parse(jsonData) : null
  } catch (e) {
    console.log(e)
  }
  return null
}
/**
 * - Clears "usernames" values from AS
 */
export async function removeUsernamesCacheAsync() {
  try {
    await AsyncStorage.removeItem("usernames")
  } catch (e) {
    console.log(e)
  }
}
