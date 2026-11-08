import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react'
import { getGroupByIdAsync } from '../../../services/groupsService'
import useAddMembers from '../../../hooks/useAddMembers'

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
  const addMembers = useAddMembers(groupId, loadGroupData, groupData?.members)

  async function loadGroupData() {
    const response = await getGroupByIdAsync(groupId)
    if (response !== null) setGroupData(response)
    else router.back()
  }

  useEffect(() => {
    loadGroupData()
  }, [groupId])

  // for modal
  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme ?? "light"]

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
        onPress={() => addMembers.setVisible(true)}
      />


      <Modal
        visible={addMembers.visible}
        transparent
        animationType="fade"
        onRequestClose={addMembers.reset}
      >
        <SafeAreaView className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/30" onPress={addMembers.reset}/>
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
              onPress={addMembers.handleSearch}
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
              onChangeText={addMembers.setTargetUsername}
              value={addMembers.targetUsername}
              onSubmitEditing={addMembers.handleSearch}
              returnKeyType="search"
            />
          </View>

          <ThemedConversationList
            data={addMembers.foundMembers}
            onItemPress={(item) => addMembers.handleSelectMember(item.uid)}
            type="dm"
            className="mt-2"
            rowHeight="h-14"
            selectMultiRows={true}
            selectedCondition={(item) => addMembers.membersToAdd.includes(item.uid)}
          />

          <ThemedButton
            label="Add selected"
            className="justify-self-end self-center"
            onPress={addMembers.handleSubmit}
            disabled={addMembers.membersToAdd.length === 0}
          />
        </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      
    </KeyboardAvoidingView>
    </ThemedView>
  )
}

export default GroupWithId
