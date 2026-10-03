import { useProfile } from '../../../hooks/useProfile'
import { View, Text } from 'react-native'
import { useState } from 'react'
import { validateUsername } from '../../../utils/validation'
import { router } from 'expo-router'

// themed components
import KeyboardScreen from '../../../components/screen-wrappers/KeyboardScreen'
import Spacer from '../../../components/Spacer'
import ThemedButton from '../../../components/ThemedButton'
import Avatar from '../../../components/Avatar'
import InputWithLabel from '../../../components/wrappers/InputWithLabel'
import ThemedActivityIndicator from '../../../components/ThemedActivityIndicator'
import { type } from 'firebase/firestore/pipelines'

const EditProfile = () => {
  const { profile, editProfile } = useProfile()

  const [username, setUsername] = useState(profile?.username ?? "")
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState({type: null, message: ""})

  const handleSubmit = async () => {
    setValidationError({type: null, message: ""})
    // input validation
    const usernameError = validateUsername(username)
    if (usernameError) {
      setValidationError({type: "username", message: usernameError})
      return
    }
    // input validation passed
    setIsSubmitting(true)
    try {
      await editProfile({
        username: username.trim(),
        displayName: displayName.trim()
      })
      router.replace("/(dashboard)/profile")
    } catch (error) {
      if (error.code === "username-error") setValidationError({type: "username", message: error.message})
      else setValidationError({type: "generic", message: "Something went wrong. Please try again."})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardScreen contentContainerClassName="items-center justify-center">
      <Spacer className="h-5"/>

      <View className="flex-initial items-center justify-center">
        <Avatar username={profile?.username} size={156} imageUrl={profile?.profilePicture} />

        <Spacer className="h-4"/>

        <View className="flex-col items-start justify-center w-80">
          <InputWithLabel
            label="Username:"
            placeholder="new username"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setUsername}
            value={username}
            className={validationError.type === "username"
              ? "border-danger dark:border-danger focus:border-dangerLight"
              : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
            }
          />

          {validationError.type === "username" ? (
          <View className="flex-initial flex-wrap w-80 items-start justify-center mt-1">
            <Text className="text-danger">{validationError.message}</Text>
          </View>
          ) : (<Spacer className="h-3"/>)}

          <InputWithLabel
            label="Display name:"
            placeholder="display name"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setDisplayName}
            value={displayName}
            className="border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
          />
        </View>
      </View>

      {validationError.type === "generic" ? (
      <View className="flex-initial flex-wrap w-80 items-start justify-center mt-1">
        <Text className="text-danger">{validationError.message}</Text>
      </View>
      ) : (<Spacer className="h-6"/>)}

      <Spacer className="h-3"/>

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
