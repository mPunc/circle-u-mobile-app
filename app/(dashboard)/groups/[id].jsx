import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react'
import { getGroupByIdAsync } from '../../../services/groupsService'
import useAddMembers from '../../../hooks/useAddMembers'

import { KeyboardAvoidingView, Platform } from 'react-native'

// themed components
import ThemedText from '../../../components/ThemedText'
import ThemedView from '../../../components/ThemedView'
import Spacer from '../../../components/Spacer'
import LoadingScreen from '../../../components/screen-wrappers/LoadingScreen'
import ThemedButton from '../../../components/ThemedButton'
import AddMembersModal from '../../../components/modals/AddMembersModal'

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
