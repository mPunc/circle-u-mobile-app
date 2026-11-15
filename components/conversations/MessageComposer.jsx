import { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@react-native-vector-icons/ionicons'

import { Colors } from '../../constants/Colors'
import { useColorScheme } from 'nativewind'

/**
 * Use with custom hook
 * @param {Object} props 
 * @param {import('react').Dispatch<import('react').SetStateAction<string>>} props.setMessage
 * @param {string} props.message
 * @param {() => void} props.handleSendMessage
 */
const MessageComposer = ({
  setMessage,
  message,
  handleSendMessage
}) => {
  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme ?? "light"]
  const [messageInputHeight, setMessageInputHeight] = useState(46)
  
  return (
    <View
      className="flex-row items-center justify-between bg-lightSurface dark:bg-darkSurface w-[98%] my-2"
      style={{ borderRadius: (3860 / messageInputHeight) }}
    >
      <TextInput
        placeholder="Message..."
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
  )
}

export default MessageComposer
