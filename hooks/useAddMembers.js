import { useState } from 'react'
import { searchForMembersByUsername, addMembersToGroupAsync } from '../services/groupsService'

/**
 * Returns functions and variables for searching and adding members from a modal
 * @param {string} groupId
 * @param {() => void | null} onSuccess
 * @param {string[] | null} [existingMembers]
 */
const useAddMembers = (groupId, onSuccess, existingMembers = null ) => {
  const [visible, setVisible] = useState(false)
  const [targetUsername, setTargetUsername] = useState("")
  const [foundMembers, setFoundMembers] = useState([])
  const [membersToAdd, setMembersToAdd] = useState([])

  const reset = () => {
    setVisible(false)
    setTargetUsername("")
    setFoundMembers([])
    setMembersToAdd([])
  }
  const handleSearch = async () => {
    if (!targetUsername.trim()) return
    const found =  await searchForMembersByUsername(targetUsername.trim(), existingMembers)
    // @ts-ignore
    setFoundMembers(found ?? [])
  }
  /** @param {string} uid */
  const handleSelectMember = (uid) => {
    // @ts-ignore
    setMembersToAdd(prev =>
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    )
  }
  const handleSubmit = async () => {
    if (membersToAdd.length === 0) return
    const success = await addMembersToGroupAsync(groupId, membersToAdd)
    if (success) {
      reset()
      onSuccess?.()
    }
  }

  return {
    visible,
    setVisible,
    targetUsername,
    setTargetUsername,
    foundMembers,
    membersToAdd,
    reset,
    handleSearch,
    handleSelectMember,
    handleSubmit
  }
}

export default useAddMembers
