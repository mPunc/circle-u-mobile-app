import { useUser } from '../../../hooks/useUser'
import { useProfile } from '../../../hooks/useProfile'
import { router } from 'expo-router'
import { getGroupsByUserAsync } from '../../../services/groupsService'
import { useState } from 'react'
import { FlatList, View, Pressable } from 'react-native'

// themed components
import ThemedText from '../../../components/ThemedText'
import Spacer from '../../../components/Spacer'
import ThemedButton from '../../../components/ThemedButton'
import ThemedView from '../../../components/ThemedView'
import ThemedConversationList from '../../../components/wrappers/ThemedConversationList'


const Groups = () => {
  const { user } = useUser()
  const { profile } = useProfile()

  const [ groups, setGroups ] = useState([])

  const handleLoad = async () => {
    const g = await getGroupsByUserAsync(user.uid)
    setGroups(g)
  }

  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <Spacer className="h-2"/>

      <ThemedButton
        label="New Group"
        onPress={() => router.push("/(dashboard)/groups/create")}
        className="w-48"
      />

      <Spacer className="h-5"/>

      <ThemedText>Hello, {profile?.username ?? "user"}</ThemedText>

      <ThemedText>Your groups:</ThemedText>

      <Spacer className="h-2"/>

      <ThemedButton
        label="Get groups"
        onPress={handleLoad}
      />

      <Spacer/>

      {/** ok to delete this: */}
      <FlatList
        className="w-full"
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(dashboard)/groups/${item.id}`)}>
            <View className="bg-lightSurface dark:bg-darkSurface w-full border-t border-neutralText h-20">
              <ThemedText variant="large">
                {item.name}
              </ThemedText>
            </View>
          </Pressable>
        )}
      />

      <ThemedConversationList
        data={groups}
        onItemPress={(item) => router.push(`/(dashboard)/groups/${item.id}`)}
        type="group"
      />

    </ThemedView>
  )
}

export default Groups
