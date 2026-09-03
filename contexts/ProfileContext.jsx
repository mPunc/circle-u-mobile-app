import { createContext, useState } from 'react'

export const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)

  return (
    <ProfileContext.Provider value={{profile}}>
      {children}
    </ProfileContext.Provider>
  )
}
