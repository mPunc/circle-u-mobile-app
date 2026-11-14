import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react'
import { getGroupByIdAsync } from '../../../services/groupsService'
import useAddMembers from '../../../hooks/useAddMembers'
import { getMessagesForGroupAsync, sendMessageForGroupAsync } from '../../../services/messageService'
import { useUser } from '../../../hooks/useUser'

import Ionicons from '@react-native-vector-icons/ionicons'
import { Colors } from '../../../constants/Colors'
import { useColorScheme } from 'nativewind'
import { FlatList, KeyboardAvoidingView, Platform, Pressable, View, TextInput } from 'react-native'

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

  const [message, setMessage] = useState("")
  const [messageInputHeight, setMessageInputHeight] = useState(46)
  const { user } = useUser()

  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme ?? "light"]

  async function loadMessages() {
    const messages = await getMessagesForGroupAsync(groupId)
    setGroupMessages(messages)
  }

  async function handleSendMessage() {
    if (message.trim().length !== 0) {
      const success = await sendMessageForGroupAsync(user.uid, groupId, message)
      if (success) {
        setMessage("")
        await loadMessages()
      } else {
        // message for user that sending failed or stg, error handle
      }
    }
  }

  async function loadGroupData() {
    const response = await getGroupByIdAsync(groupId)
    if (response !== null) setGroupData(response)
    else router.back()
    await loadMessages()
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

      <View
        className="flex-row items-center justify-between bg-lightSurface dark:bg-darkSurface w-[98%] my-2"
        style={{ borderRadius: (3860 / messageInputHeight) }}
      >
        <TextInput
          placeholder="Send a message..."
          placeholderTextColor={Colors.neutralText}
          className="flex-1 text-lightText dark:text-darkText text-lg ml-3"
          onChangeText={setMessage}
          value={message}
          multiline
          textAlignVertical="center"
          style={{ height: messageInputHeight }}
          onContentSizeChange={(e) => {
            const contentHeight = e.nativeEvent.contentSize.height
            setMessageInputHeight(Math.min(184, Math.max(46, contentHeight)))
            // adjust border radius of the parent View based on contentHeight
          }}
        />
        <Pressable
          className="
            active:opacity-60
            rounded-full bg-lightIcon dark:bg-darkIcon
            mr-2 size-11 justify-center items-center
          "
          onPress={handleSendMessage}
        >
          <Ionicons
            name="send"
            color={theme.surface}
            size={28}
          />
        </Pressable>
      </View>

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
