import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react'
import { addMembersToGroupAsync, getGroupByIdAsync, searchForMembersByUsername } from '../../../services/groupsService'

import { View, Modal, TextInput, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@react-native-vector-icons/ionicons'
import { Colors } from '../../../constants/Colors'
import { useColorScheme } from 'nativewind'

// themed components
import ThemedText from '../../../components/ThemedText'
import ThemedView from '../../../components/ThemedView'
import Spacer from '../../../components/Spacer'
import LoadingScreen from '../../../components/screen-wrappers/LoadingScreen'
import ThemedButton from '../../../components/ThemedButton'
import ThemedConversationList from '../../../components/wrappers/ThemedConversationList'

const GroupWithId = () => {
  const { id: groupId } = useLocalSearchParams()
  const [groupData, setGroupData] = useState(null)

  // for modal
  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme ?? "light"]

  // adding members, also for modal
  const [membersModal, setMembersModal] = useState(false)
  const [targetUsername, setTargetUsername] = useState("")
  const [foundMembers, setFoundMembers] = useState(new Array())
  const [membersToAdd, setMembersToAdd] = useState(new Array())
  const handleSearch = async () => {
    if (targetUsername.trim().length !== 0) {
      const found = await searchForMembersByUsername(targetUsername, groupData.members)
      setFoundMembers(found ?? [])
    }
  }
  const resetMembersModal = () => {
    setMembersModal(false)
    setTargetUsername("")
    setFoundMembers([])
    setMembersToAdd([])
  }
  /**@param {string} uid*/
  const handleAddMember = (uid) => {
    setMembersToAdd((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    )
  }
  const handleModalSubmit = async () => {
    if (membersToAdd.length !== 0) {
      const success = await addMembersToGroupAsync(groupId, membersToAdd)
      if (success) {
        resetMembersModal()
        loadGroupData()
      }
    }
  }

  async function loadGroupData() {
    const response = await getGroupByIdAsync(groupId)
    if (response !== null) setGroupData(response)
    else router.back()
  }
  useEffect(() => {
    loadGroupData()
  }, [groupId])

  // loading screen if data not yet loaded, needs better error handling
  if(!groupData) return <LoadingScreen/>

  return (
    <ThemedView className="flex-1" safeArea>
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ThemedText variant="subtitle">{groupData.name}</ThemedText>
      <Spacer/>
      <ThemedText variant="large">{groupData.createdBy}</ThemedText>
      <ThemedText variant="large">{groupData.members}</ThemedText>
      <ThemedText variant="large">{groupData.createdAt.toDate().toDateString()}</ThemedText>

      <Spacer/>

      <ThemedButton
        label="Add Members"
        onPress={() => setMembersModal(true)}
      />


      <Modal
        visible={membersModal}
        transparent
        animationType="fade"
        onRequestClose={resetMembersModal}
      >
        <SafeAreaView className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/30" onPress={resetMembersModal}/>
        <KeyboardAvoidingView
          className="
            h-[360px] rounded-t-3xl border-t-2 border-lightIcon dark:border-darkIcon
            bg-lightBackground dark:bg-darkBackground px-5 pt-6
            justify-between
          "
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="rounded-full flex-row items-center justify-start bg-lightSurface dark:bg-darkSurface h-12">
            <Pressable
              className="active:opacity-60 ml-2"
              onPress={handleSearch}
            >
              <Ionicons
                name="search-circle"
                color={theme.icon}
                size={36}
              />
            </Pressable>
            <TextInput
              placeholder="Search by username"
              placeholderTextColor={Colors.neutralText}
              className="text-lightText dark:text-darkText text-lg px-1 py-3 w-full"
              onChangeText={setTargetUsername}
              value={targetUsername}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>

          <ThemedConversationList
            data={foundMembers}
            onItemPress={(item) => handleAddMember(item.uid)}
            type="dm"
            className="mt-2"
            rowHeight="h-14"
            selectMultiRows={true}
            selectedCondition={(item) => membersToAdd.includes(item.uid)}
          />

          <ThemedButton
            label="Add selected"
            className="justify-self-end self-center"
            onPress={handleModalSubmit}
            disabled={membersToAdd.length === 0}
          />
        </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      
    </KeyboardAvoidingView>
    </ThemedView>
  )
}

export default GroupWithId
