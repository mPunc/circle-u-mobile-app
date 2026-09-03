import { useUser } from '../../hooks/useUser'
import { useProfile } from '../../hooks/useProfile'
import { router } from 'expo-router'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {
  const { user, logout } = useUser()

  const { profile } = useProfile()

  const handleLogout = async () => {
    try {
      const success = await logout()
      if (success) {
        router.replace("/(auth)/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedText>Profile</ThemedText>

      <Spacer className="h-4"/>

      <ThemedText variant="subtitle">
        {user?.email ?? "No user logged in"}
      </ThemedText>

      <ThemedText variant="subtitle">
        {profile?.email ?? "No user logged in"}
      </ThemedText>

      <Spacer className="h-5" />

      <ThemedButton
        label="Logout"
        onPress={handleLogout}
      />

    </ThemedView>
  )
}

export default Profile
