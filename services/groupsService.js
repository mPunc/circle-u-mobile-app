import { db } from '../lib/firebase'
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'

export async function createGroupAsync(uid, name) {
  const groupColl = collection(db, "groups")

  await addDoc(groupColl, {
    name: name,
    createdBy: uid,
    createdAt: serverTimestamp(),
    members: [uid]
  })
}

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

export async function addMembersToGroupAsync(groupId, memberIds) {
  try {
    const groupRef = doc(db, "groups", groupId)
    await updateDoc(groupRef, {
      members: arrayUnion(memberIds)
    })
  } catch (error) {
    console.log("Error adding members: ", error)
  }
  return null
}
