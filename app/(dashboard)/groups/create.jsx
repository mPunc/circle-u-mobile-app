import { useUser } from '../../../hooks/useUser'
import { useProfile } from '../../../hooks/useProfile'
import { useState } from 'react'
import { createGroupAsync } from '../../../services/groupsService'
import { router } from 'expo-router'

// themed components
import KeyboardScreen from '../../../components/screen-wrappers/KeyboardScreen'
import Spacer from '../../../components/Spacer'
import InputWithLabel from '../../../components/wrappers/InputWithLabel'
import ThemedButton from '../../../components/ThemedButton'

const CreateGroup = () => {
  const { user } = useUser()
  const { profile } = useProfile()

  const [groupName, setGroupName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!groupName) return
    setIsSubmitting(true)
    try {
      console.log(user.uid, groupName)
      await createGroupAsync(user.uid, groupName)
      router.replace("/(dashboard)/groups")
    } catch (error) {
      console.log("There was an error!", error)
      return
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardScreen contentContainerClassName="items-center justify-center">
      <Spacer className="h-3"/>

      <InputWithLabel
        label="Group name:"
        onChangeText={setGroupName}
        value={groupName}
        className="border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
      />

      <Spacer/>

      <ThemedButton
        label="Create"
        className="w-48"
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </KeyboardScreen>
  )
}

export default CreateGroup
