import { KeyboardAvoidingView, Modal, Pressable, Platform, View, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@react-native-vector-icons/ionicons'
import { Colors } from '../../constants/Colors'
import { useColorScheme } from 'nativewind'
import ThemedConversationList from '../wrappers/ThemedConversationList'
import ThemedButton from '../ThemedButton'

/**
 * Use with custom hook useAddMembers()
 * @param {Object} props
 * @param {boolean} props.visible
 * @param {string} props.targetUsername
 * @param {import('react').Dispatch<import('react').SetStateAction<string>>} props.setTargetUsername
 * @param {never[]} props.foundMembers
 * @param {() => void} props.onSearch
 * @param {string[]} props.membersToAdd
 * @param {(item: string) => void} props.onSelectMember
 * @param {() => void} props.onSubmit
 * @param {() => void} props.onClose
 */
const AddMembersModal = ({
  visible,
  targetUsername,
  setTargetUsername,
  foundMembers,
  onSearch,
  membersToAdd,
  onSelectMember,
  onSubmit,
  onClose
}) => {
  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme ?? "light"]
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 justify-end">
      <Pressable className="absolute inset-0 bg-black/30" onPress={onClose}/>
      <KeyboardAvoidingView
        className="
          h-[360px] rounded-t-3xl border-t-2 border-lightIcon dark:border-darkIcon
          bg-lightBackground dark:bg-darkBackground px-5 pt-6
          justify-between
        "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="rounded-full flex-row items-center justify-start bg-lightSurface dark:bg-darkSurface">
          <Pressable
            className="active:opacity-60 ml-2"
            onPress={onSearch}
          >
            <Ionicons
              name="search-circle"
              color={theme.icon}
              size={40}
            />
          </Pressable>
          <TextInput
            placeholder="Search by username"
            placeholderTextColor={Colors.neutralText}
            className="flex-1 text-lightText dark:text-darkText text-lg mx-1"
            onChangeText={setTargetUsername}
            value={targetUsername}
            onSubmitEditing={onSearch}
            returnKeyType="search"
            textAlignVertical="center"
          />
        </View>

        <ThemedConversationList
          data={foundMembers}
          onItemPress={(item) => onSelectMember(item.uid)}
          type="dm"
          className="mt-2"
          rowHeight="h-14"
          selectMultiRows={true}
          selectedCondition={(item) => membersToAdd.includes(item.uid)}
        />

        <ThemedButton
          label="Add selected"
          className="justify-self-end self-center"
          onPress={onSubmit}
          disabled={membersToAdd.length === 0}
        />
      </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  )
}

export default AddMembersModal
