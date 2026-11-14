import { useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

/**
 * @typedef ProfileData
 * @property {string} email
 * @property {string} username
 * @property {string} [displayName]
 * @property {string} [avatar]
 */
/**
 * Hook for ProfileContext, wraps whole (dashboard)
 * @returns {{
 *  profile: ProfileData,
 *  editProfile: (data: object) => Promise<void>,
 *  groups: import("../services/groupsService").GroupPreviewData[],
 *  loadGroups: (uid: sting) => Promise<void>
 * }}
 */
export function useProfile() {
  const context = useContext(ProfileContext)
  
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  
  return context
}
