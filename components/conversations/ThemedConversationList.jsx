import { FlatList } from 'react-native'
import ThemedConversationListItem from './ThemedConversationListItem'

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
 * @param {ConversationData[]|import("../../services/groupsService").GroupPreviewData[]} props.data - Array of data to display, each object must have an id
 * @param {(item: ConversationData|import("../../services/groupsService").GroupPreviewData) => string} [props.keyExtractor=(item) => item.id] - FlatList keyExtractor override if needed
 * @param {(item: ConversationData|import("../../services/groupsService").GroupPreviewData) => void} props.onItemPress - Callback when an item is pressed
 * @param {"group" | "dm"} props.type - Conversation type, affects displayed data and default styling
 * @param {string} [props.className = ""]
 * @param {string} [props.rowHeight = "h-20"] - "h-20" by default, appends string to each row's parent element's className
 * @param {boolean} [props.selectMultiRows = "false"] - set true to enable selectable list rows
 * @param {(item: ConversationData|import("../../services/groupsService").GroupPreviewData) => boolean} [props.selectedCondition = () => false]
 */
const ThemedConversationList = ({
  data,
  keyExtractor = (item) => item.id ?? item.uid,
  onItemPress,
  type,
  className = "",
  rowHeight = "h-20",
  selectMultiRows = false,
  selectedCondition = () => false
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      className={`w-full ${className}`}
      renderItem={({ item }) => {
        return (
          <ThemedConversationListItem
            onPress={() => onItemPress(item)}
            rowHeight={rowHeight}
            item={item}
            type={type}
            selectableRows={selectMultiRows}
            selectedCondition={() => selectedCondition(item)}
          />
        )
      }}
    />
  )
}

export default ThemedConversationList
