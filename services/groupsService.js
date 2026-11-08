import { db } from '../lib/firebase'
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, updateDoc, arrayUnion, getDoc, orderBy, startAt, endAt } from 'firebase/firestore'

/**
 * Creates a simple group, used in groups/create
 * @param {string} uid 
 * @param {string} groupName 
 */
export async function createGroupAsync(uid, groupName) {
  const groupColl = collection(db, "groups")
  await addDoc(groupColl, {
    name: groupName,
    createdBy: uid,
    createdAt: serverTimestamp(),
    members: [uid]
  })
}

/**
 * Fetches groups with all data for user ID, used in groups/index
 * @param {string} uid
 * @returns {Promise<Object[] | null>}
 */
export async function getGroupsForUserAsync(uid) {
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
 * Fetches single group data by id, used in groups/[id] dynamic route
 * @param {string} id
 * @returns {Promise<Object | null>}
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
 * Returns array of {uid, username} or null, can exclude uids, used in useAddMembers()
 * @param {string} username
 * @param {string[] | null} [exclude]
 * @returns {Promise<{uid: string, username: string}[] | null>}
 */
export async function searchForMembersByUsername(username, exclude = null) {
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
 * Adds array of memberIds to target group, used in useAddMembers()
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
