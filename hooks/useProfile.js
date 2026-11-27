import { useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

/**
 * Hook for ProfileContext, wraps whole (dashboard)
 * @returns {{
 * profile: import("../services/profileService").ProfileData,
 * editProfile: (data: object) => Promise<void>,
 * groups: import("../services/groupsService").GroupPreviewData[],
 * loadGroups: () => Promise<void>,
 * usernamesData: import('../lib/caching').Usernames
 * handleUsernames: (uid: string[]) => Promise<void>
 * }}
 */
export function useProfile() {
  const context = useContext(ProfileContext)
  
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  
  return context
}
