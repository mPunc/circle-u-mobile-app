import { FlatList } from 'react-native'
import ConversationListItem from './ConversationListItem'

/**
 * @typedef {Object} ConversationData
 * @property {string} [id]
 * @property {string} [uid]
 * @property {string} [name]
 * @property {string} [username]
 * @property {string} avatar
 * @property {import('../../services/groupsService').LastActivityData} lastActivity
 */

/**
 * - Component that uses FlatList for displaying group or DM conversations.
 * @param {Object} props
 * @param {ConversationData[]|import("../../services/groupsService").GroupPreviewData[]} props.data - Array of data to display, each object must have an id.
 * @param {(item: ConversationData|import("../../services/groupsService").GroupPreviewData) => string} [props.keyExtractor=(item) => item.id] - FlatList keyExtractor override if needed.
 * @param {(item: ConversationData|import("../../services/groupsService").GroupPreviewData) => void} props.onItemPress - Callback when an item is pressed.
 * @param {"group" | "dm"} props.type - Conversation type, affects displayed data and default styling.
 * @param {Object.<string, import('../../lib/caching').ProfileDataCached>} [props.profiles = {}] - Give profilesData when using "group" type to display other users' usernames.
 * @param {string} [props.className = ""]
 * @param {string} [props.rowHeight = "h-20"] - "h-20" by default, appends string to each row's parent element's className.
 * @param {boolean} [props.selectMultiRows = "false"] - Set true to enable selectable list rows.
 * @param {(item: ConversationData|import("../../services/groupsService").GroupPreviewData) => boolean} [props.selectedCondition = () => false]
 */
const ConversationList = ({
  data,
  // @ts-ignore
  keyExtractor = (item) => item.id ?? item.uid,
  onItemPress,
  type,
  profiles = {},
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
          <ConversationListItem
            onPress={() => onItemPress(item)}
            rowHeight={rowHeight}
            item={item}
            type={type}
            profiles={profiles}
            selectableRows={selectMultiRows}
            selectedCondition={() => selectedCondition(item)}
          />
        )
      }}
    />
  )
}

export default ConversationList
