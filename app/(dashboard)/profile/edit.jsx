import { useProfile } from '../../../hooks/useProfile'
import { View } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'

// themed components
import KeyboardScreen from '../../../components/screen-wrappers/KeyboardScreen'
import Spacer from '../../../components/Spacer'
import ThemedButton from '../../../components/ThemedButton'
import Avatar from '../../../components/Avatar'
import InputWithLabel from '../../../components/wrappers/InputWithLabel'
import ThemedActivityIndicator from '../../../components/ThemedActivityIndicator'

const EditProfile = () => {
  const { profile, editProfile } = useProfile()

  const [username, setUsername] = useState(profile?.username ?? "")
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const success = await editProfile({
      username: username.trim().toLowerCase(),
      displayName: displayName.trim()
    })
    setIsSubmitting(false)
    if (success) {
      router.replace("/(dashboard)/profile")
    }
  }

  return (
    <KeyboardScreen contentContainerClassName="items-center justify-center">
      <Spacer className="h-5"/>

      <View className="flex-initial items-center justify-center">
        <Avatar username={profile?.username} size={156} imageUrl={profile?.profilePicture} />

        <Spacer className="h-4"/>

        <View className="flex-col items-start justify-center w-80 gap-4">
          <InputWithLabel
            label="Username:"
            value={username}
            onChangeText={setUsername}
          />
          <InputWithLabel
            label="Display name:"
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>
      </View>

      <Spacer/>

      <ThemedButton
        label="Save Changes"
        className="w-48"
        onPress={handleSubmit}
        disabled={isSubmitting}
      />

      <Spacer className="h-3"/>
      {isSubmitting
        ? <ThemedActivityIndicator/>
        : <Spacer/>
      }

      <Spacer className="h-3"/>
    </KeyboardScreen>
  )
}

export default EditProfile
