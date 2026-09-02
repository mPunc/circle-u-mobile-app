import { useUser } from '../../hooks/useUser'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

const Profile = () => {
  const { user } = useUser()

  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedText>Profile</ThemedText>

      <Spacer className="h-4"/>

      <ThemedText variant="subtitle">
        {user?.email ?? "No user logged in"}
      </ThemedText>

    </ThemedView>
  )
}

export default Profile
