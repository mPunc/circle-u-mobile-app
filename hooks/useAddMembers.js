import { useState } from 'react'
import { searchForMembersByUsernameAsync, addMembersToGroupAsync } from '../services/groupsService'

/**
 * Returns functions and variables for searching and adding members from a modal
 * @param {string} groupId
 * @param {() => void | null} onSuccess
 * @param {string[] | null} [existingMembers]
 */
const useAddMembers = (groupId, onSuccess, existingMembers = null) => {
  const [visible, setVisible] = useState(false)
  const [targetUsername, setTargetUsername] = useState("")
  const [foundMembers, setFoundMembers] = useState([])
  const [membersToAdd, setMembersToAdd] = useState([])

  const handleSearch = async () => {
    if (!targetUsername.trim()) return
    const found =  await searchForMembersByUsernameAsync(targetUsername.trim(), existingMembers)
    // @ts-ignore
    setFoundMembers(found ?? [])
  }
  /** @param {string} uid */
  const handleSelectMember = (uid) => {
    // @ts-ignore
    setMembersToAdd(prev =>
      // @ts-ignore
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
  const reset = () => {
    setVisible(false)
    setTargetUsername("")
    setFoundMembers([])
    setMembersToAdd([])
  }

  return {
    visible,
    setVisible,
    targetUsername,
    setTargetUsername,
    foundMembers,
    handleSearch,
    membersToAdd,
    handleSelectMember,
    handleSubmit,
    reset
  }
}

export default useAddMembers
