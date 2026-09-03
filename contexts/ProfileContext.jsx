import { createContext, useState, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { getProfile } from '../services/profileService'

export const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)

  const { user } = useUser()

  async function loadProfile(uid) {
    const data = await getProfile(uid)
    setProfile(data)
  }
  useEffect(() => {
    if (!!user) {
      loadProfile(user.uid)
    } else {
      setProfile(null)
    }
  }, [user])

  return (
    <ProfileContext.Provider value={{profile}}>
      {children}
    </ProfileContext.Provider>
  )
}
