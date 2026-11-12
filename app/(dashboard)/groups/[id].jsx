import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react'
import { getGroupByIdAsync } from '../../../services/groupsService'
import useAddMembers from '../../../hooks/useAddMembers'
import { getMessagesForGroupAsync } from '../../../services/messageService'

import Ionicons from '@react-native-vector-icons/ionicons'
import { Colors } from '../../../constants/Colors'
import { useColorScheme } from 'nativewind'
import { FlatList, KeyboardAvoidingView, Platform, Pressable, View } from 'react-native'

// themed components
import ThemedText from '../../../components/ThemedText'
import ThemedView from '../../../components/ThemedView'
import Spacer from '../../../components/Spacer'
import LoadingScreen from '../../../components/screen-wrappers/LoadingScreen'
import AddMembersModal from '../../../components/modals/AddMembersModal'
import Avatar from '../../../components/Avatar'

const GroupWithId = () => {
  const { id: groupId } = useLocalSearchParams()
  const [groupData, setGroupData] = useState(null)
  const [groupMessages, setGroupMessages] = useState([])
  const addMembers = useAddMembers(groupId, loadGroupData, groupData?.members)

  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme ?? "light"]

  async function loadGroupData() {
    const response = await getGroupByIdAsync(groupId)
    if (response !== null) setGroupData(response)
    else router.back()
    const messages = await getMessagesForGroupAsync(groupId)
    setGroupMessages(messages)
  }
  useEffect(() => {
    loadGroupData()
  }, [groupId])
  // loading screen if data not yet loaded, needs better error handling
  if(!groupData) return <LoadingScreen/>

  return (
    <ThemedView className="flex-1" safeArea>
    <KeyboardAvoidingView
      className="flex-1 items-center justify-start"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <View className="
        flex-row justify-center items-center w-full gap-2
        border-b border-lightText dark:border-darkText pb-2 pt-2 bg-lightSurface dark:bg-darkSurface
      ">
        <Avatar
          username={groupData.name}
          size={40}
          imageUrl={groupData.avatar}
        />
        <ThemedText variant="large">{groupData.name}</ThemedText>
        <Spacer className="w-[48%]"/>
        <Pressable
          className="active:opacity-60"
          onPress={() => addMembers.setVisible(true)}
        >
          <Ionicons
            name="person-add-sharp"
            color={theme.icon}
            size={30}
          />
        </Pressable>
      </View>

      <FlatList
        data={groupMessages}
        keyExtractor={(item) => item.id}
        className=""
        renderItem={({ item }) => {
          return (
            <>
              <ThemedText>{item.text}</ThemedText>
              <ThemedText>Sent by: {item.senderId}</ThemedText>
              <ThemedText>Sent at: {item.createdAt.toDate().toDateString()}</ThemedText>
            </>
          )
        }}
      />

      <AddMembersModal
        visible={addMembers.visible}
        targetUsername={addMembers.targetUsername}
        setTargetUsername={addMembers.setTargetUsername}
        foundMembers={addMembers.foundMembers}
        onSearch={addMembers.handleSearch}
        membersToAdd={addMembers.membersToAdd}
        onSelectMember={addMembers.handleSelectMember}
        onSubmit={addMembers.handleSubmit}
        onClose={addMembers.reset}
      />
      
    </KeyboardAvoidingView>
    </ThemedView>
  )
}

export default GroupWithId
