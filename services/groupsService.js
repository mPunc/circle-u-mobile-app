import { db } from '../lib/firebase'
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, updateDoc, arrayUnion, getDoc, orderBy, startAt, endAt } from 'firebase/firestore'

/**
 * creates a group
 * @param {string} uid 
 * @param {string} name 
 */
export async function createGroupAsync(uid, name) {
  const groupColl = collection(db, "groups")

  await addDoc(groupColl, {
    name: name,
    createdBy: uid,
    createdAt: serverTimestamp(),
    members: [uid]
  })
}

/**
 * fetches groups with data for current user
 * @param {string} uid
 * @returns {Promise<Object[]>}
 */
export async function getGroupsByUserAsync(uid) {
  try {
    const q = query(collection(db, "groups"), where("members", "array-contains", uid))
    const qSnap = await getDocs(q)
    const groups = qSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return groups
  } catch (error) {
    console.log("Error fetching profile: ", error)
  }
  return null
}

/**
 * fetches single group data
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getGroupByIdAsync(id) {
  try {
    const groupRef = doc(db, "groups", id)
    const groupSnap = await getDoc(groupRef)
    if (groupSnap.exists()) return groupSnap.data()
  } catch (error) {
    console.log("Error fetching group data: ", error)
  }
  return null
}

/**
 * used in groups to find users, returns array of {uid, username} or null, can exclude uids
 * @param {string} username 
 * @param {string[]} exclude 
 * @returns {Promise<{uid: string, username: string}[]|null>}
 */
export async function searchForMembersByUsername(username, exclude = []) {
  try {
    const q = query(
      collection(db, "profiles"),
      orderBy("username"),
      startAt(username.trim()),
      endAt(username.trim() + "\uf8ff")
    )
    const qSnap = await getDocs(q)
    // set for filtering
    const excludeUids = new Set(exclude)
    const foundUsers = qSnap.docs.map((doc) => ({
      uid: doc.id,
      username: doc.get("username")
    }))
    .filter((user) => !excludeUids.has(user.uid))
    return foundUsers
  } catch (error) {
    console.log("Error searching for members: ", error)
  }
  return null
}
/**
 * adds array of memberIds to target group
 * @param {string} groupId 
 * @param {string[]} memberIds 
 * @returns {Promise<boolean>}
 */
export async function addMembersToGroupAsync(groupId, memberIds) {
  try {
    const groupRef = doc(db, "groups", groupId)
    await updateDoc(groupRef, {
      members: arrayUnion(...memberIds)
    })
    return true
  } catch (error) {
    console.log("Error adding members: ", error)
    return false
  }
}
