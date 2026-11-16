import { FlatList } from 'react-native'
import ThemedText from '../ThemedText'

/**
 * Use with custom hook
 * @param {Object} props
 * @param {import('../../services/messageService').MessageData[]} props.messages
 */
const MessageFeed = ({ messages }) => {
  return (
    <FlatList
      data={messages}
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
  )
}

export default MessageFeed
