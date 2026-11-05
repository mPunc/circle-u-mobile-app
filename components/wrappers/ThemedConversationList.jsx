import { FlatList, Pressable } from 'react-native'
import ThemedText from '../ThemedText'

/**
 * @typedef {Object} ConversationData
 * @property {string} id
 * @property {string} uid
 * @property {string} [name]
 * @property {string} [username]
 */
/**
 * Component that uses FlatList for displaying group or DM conversations
 * @param {Object} props
 * @param {ConversationData[]} props.data - Array of data to display, each object must have an id
 * @param {(item: ConversationData) => string} [props.keyExtractor=(item) => item.id] - FlatList keyExtractor override if needed
 * @param {(item: ConversationData) => void} props.onItemPress - Callback when an item is pressed
 * @param {"group" | "dm"} props.type - Conversation type, affects displayed data and default styling
 * @param {string} [props.rowHeight="h-20"] - "h-20" by default, appends string to each row's parent element's className
 * @param {boolean} [props.selectableRows="false"] - set true to enable selectable list rows
 */
const ThemedConversationList = ({ data, keyExtractor = (item) => item.id ?? item.uid, onItemPress, type, rowHeight = "h-20", selectableRows = false }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      className="w-full"
      renderItem={({ item }) => {
        let conversationName = ""
        if (type === "group") conversationName = item.name ?? ""
        else if (type === "dm") conversationName = item.username ?? ""

        return (
          <Pressable
            onPress={() => onItemPress(item)}
            className={`
              border-t border-neutralText
              bg-lightSurface dark:bg-darkSurface
              justify-center items-center
              ${rowHeight}
            `}
          >
            <ThemedText variant="large">
              {conversationName}
            </ThemedText>
          </Pressable>
        )
      }}
    />
  )
}

export default ThemedConversationList
