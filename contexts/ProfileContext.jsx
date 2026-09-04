import { createContext, useState, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { getProfileAsync, editProfileAsync } from '../services/profileService'

export const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({})

  const { user } = useUser()

  async function editProfile(data) {
    try {
      await editProfileAsync(user.uid, data)
      setProfile(prev => ({
        ...prev,
        ...data
      }))
      return true
    } catch (error) {
      return false
    }
  }

  // loads profile whenever the user changes (logs in or out)
  async function loadProfile(uid) {
    const data = await getProfileAsync(uid)
    setProfile(data)
  }
  useEffect(() => {
    if (!!user) {
      loadProfile(user.uid)
    } else {
      setProfile({})
    }
  }, [user])

  return (
    <ProfileContext.Provider value={{profile, editProfile}}>
      {children}
    </ProfileContext.Provider>
  )
}
