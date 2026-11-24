import { FlatList, View } from 'react-native'
import ThemedText from '../ThemedText'
import { formatTimestampForMessages } from '../../utils/formatter'
import { useUser } from '../../hooks/useUser'

/**
 * Use with custom hook
 * @param {Object} props
 * @param {import('../../services/messageService').MessageData[]} props.messages
 * @param {string} [props.className = ""]
 */
const MessageFeed = ({ messages, className = "" }) => {
  const { user } = useUser()
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      className={`w-full ${className}`}
      inverted
      renderItem={({ item }) => {
        const me = item.senderId === user.uid
        return (
          <View
            className={`mx-6 my-1 justify-center
              ${me ? "items-end" : "items-start"}
            `}
          >
            <ThemedText
              className={`
                ${me ? "bg-primaryAccent" : "bg-lightSurface dark:bg-darkSurface"} text-lg
                px-3 py-1 rounded-full
            `}>{item.text}</ThemedText>
            <ThemedText className="mx-1 mt-[3px]" variant="small">{formatTimestampForMessages(item.createdAt)}</ThemedText>
          </View>
        )
      }}
    />
  )
}

export default MessageFeed
