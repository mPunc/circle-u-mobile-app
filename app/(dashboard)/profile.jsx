import { useUser } from '../../hooks/useUser'
import { useProfile } from '../../hooks/useProfile'
import { router } from 'expo-router'
import { View } from 'react-native'

// themed components
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ValueWithLabel from '../../components/wrappers/ValueWithLabel'
import ThemedScrollView from '../../components/ThemedScrollView'
import Avatar from '../../components/Avatar'

const Profile = () => {
  const { logout } = useUser()
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
    <ThemedView className="flex-1" safeArea>
    <ThemedScrollView className="flex-1" contentContainerClassName="flex-grow items-center justify-center">
      <Spacer className="h-4"/>

      <View className="flex-initial items-center justify-center">
        <Avatar username={profile?.username} size={156} imageUrl={profile?.profilePicture} />

        <Spacer className="h-4"/>

        <View className="flex-col items-start justify-center w-80 gap-4">
          <ValueWithLabel
            label="Username:"
            value={profile?.username ?? ""}
          />
          <ValueWithLabel
            label="Display name:"
            value={profile?.displayName ?? ""}
          />
          <ValueWithLabel
            label="Email:"
            value={profile?.email ?? "no email"}
          />
        </View>
      </View>

      <Spacer/>

      <ThemedButton
        label="Edit Profile"
        className="w-48"
      />

      <Spacer/>

      <ThemedButton
        label="Logout"
        variant="danger"
        onPress={handleLogout}
        className="w-48"
      />

      <Spacer className="h-4"/>
    </ThemedScrollView>
    </ThemedView>
  )
}

export default Profile
