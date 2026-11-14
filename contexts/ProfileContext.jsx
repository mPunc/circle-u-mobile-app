import { createContext, useState, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { loadProfileAsync, editProfileAsync } from '../services/profileService'
import { getGroupsForUserAsync } from '../services/groupsService'

// @ts-ignore
export const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({})
  const [groups, setGroups] = useState([])

  const { user } = useUser()

  async function editProfile(data) {
    try {
      await editProfileAsync(user.uid, data)
      setProfile(prev => ({
        ...prev,
        ...data
      }))
    } catch (error) {
      throw error
    }
  }

  /**
   * Initial group preview data loading and refreshing for user
   * @param {string} uid 
   */
  async function loadGroups(uid) {
    const data = await getGroupsForUserAsync(uid)
    // add some exception handling for errors and data === []
    // @ts-ignore
    setGroups(data)
  }
  /**
   * Loads profile whenever the user changes (logs in or out)
   * @param {string} uid 
   */
  async function loadProfile(uid) {
    const data = await loadProfileAsync(uid)
    // add exception handling for data === null and errors
    setProfile(data)
  }
  useEffect(() => {
    if (!!user) {
      loadProfile(user.uid)
      loadGroups(user.uid)
    } else {
      setProfile({})
      setGroups([])
    }
  }, [user])

  return (
    <ProfileContext.Provider value={{ profile, editProfile, groups, loadGroups }}>
      {children}
    </ProfileContext.Provider>
  )
}
