import { useProfile } from '../../../hooks/useProfile'
import { router, useFocusEffect } from 'expo-router'
import { useCallback } from 'react'

// themed components
import ThemedText from '../../../components/ThemedText'
import Spacer from '../../../components/Spacer'
import ThemedButton from '../../../components/ThemedButton'
import ThemedView from '../../../components/ThemedView'
import ConversationList from '../../../components/conversations/ConversationList'

const Groups = () => {
  const { profile, groups, loadGroups, usernamesData } = useProfile()

  // Runs function every time screen comes to focus.
  useFocusEffect(
    useCallback(() => {
      loadGroups()
    }, [])
  )

  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <Spacer className="h-2"/>

      <ThemedButton
        label="New Group"
        onPress={() => router.push("/(dashboard)/groups/create")}
        className="w-48"
      />

      <Spacer className="h-5"/>

      <ThemedText>Hello, {profile.username}</ThemedText>

      <ThemedText>Your groups:</ThemedText>

      <Spacer/>

      <ConversationList
        data={groups}
        onItemPress={(item) => router.push(`/(dashboard)/groups/${item.id}`)}
        type="group"
        usernameMap={usernamesData.data}
      />

    </ThemedView>
  )
}

export default Groups
