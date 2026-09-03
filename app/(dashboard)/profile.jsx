import { useUser } from '../../hooks/useUser'
//import { useProfile } from '../../hooks/useProfile'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

const Profile = () => {
  const { user } = useUser()

  //const { profile } = useProfile()

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
