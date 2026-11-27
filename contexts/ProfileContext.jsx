import { createContext, useState, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { loadProfileAsync, editProfileAsync } from '../services/profileService'
import { getGroupsForUserAsync } from '../services/groupsService'
import { getUsernamesAsync } from '../services/storageService'

// @ts-ignore
export const ProfileContext = createContext()

/**
 * Component provider for ProfileContext, enables useProfile() hook.
 * @param {Object} props
 * @param {import('react').JSX.Element} props.children
 */
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({})
  const [groups, setGroups] = useState([])
  const [usernamesData, setUsernamesData] = useState({})

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
   * - Handles usernames data, reads or updates for given uid array
   * @param {string[]} [uids] 
   */
  async function handleUsernames(uids) {
    console.log("ProfileContext\t//\tHandling Usernames")
    const refreshedData = await getUsernamesAsync(uids)
    setUsernamesData(refreshedData)
  }

  /**
   * - Initial group preview data loading and refreshing for user
   */
  async function loadGroups() {
    console.log("ProfileContext\t//\tLoading groups...")
    const data = await getGroupsForUserAsync(user.uid)
    // add some exception handling for errors and data === []
    // @ts-ignore
    setGroups(data)
  }
  /**
   * - Loads profile whenever the user changes (logs in or out)
   */
  async function loadProfile() {
    console.log("ProfileContext\t//\tLoading current user profile...")
    const data = await loadProfileAsync(user.uid)
    // add exception handling for data == {} and errors
    setProfile(data)
  }
  useEffect(() => {
    if (!!user) {
      loadProfile()
      loadGroups()
      handleUsernames()
    } else {
      setProfile({})
      setGroups([])
    }
  }, [user])

  return (
    <ProfileContext.Provider value={{ profile, editProfile, groups, loadGroups, usernamesData, handleUsernames }}>
      {children}
    </ProfileContext.Provider>
  )
}
