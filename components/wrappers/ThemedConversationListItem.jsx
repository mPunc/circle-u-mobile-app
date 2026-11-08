import { Pressable } from 'react-native'
import ThemedText from '../ThemedText'
import Avatar from '../Avatar'

/**
 * @typedef {Object} ConversationData
 * @property {string} id
 * @property {string} uid
 * @property {string} [name]
 * @property {string} [username]
 * @property {string} [avatar]
 */
/**
 * One item row
 * @param {Object} props
 * @param {(item: Object) => void} props.onPress
 * @param {ConversationData} props.item
 * @param {"group" | "dm"} props.type
 * @param {string} props.rowHeight
 * @param {boolean} props.selectableRows
 * @param {(item: void) => boolean} props.selectedCondition
 */
const ThemedConversationListItem = ({ onPress, item, type, rowHeight, selectableRows, selectedCondition }) => {
  const isSelected = selectableRows ? selectedCondition() : false

  let conversationName = ""
  if (type === "group") conversationName = item.name ?? ""
  else if (type === "dm") conversationName = item.username ?? ""

  const avatarSize = type === "dm" ? 40 : 48

  return (
    <Pressable
      onPress={() => onPress(item)}
      className={`
        border-t border-neutralText
        flex-row justify-start items-center gap-4
        active:bg-neutralText
        ${rowHeight}
        ${isSelected ? "bg-lightAccent dark:bg-darkAccent" : "bg-lightSurface dark:bg-darkSurface"}
      `}
    >
      <Avatar username={conversationName} size={avatarSize} imageUrl={item.avatar}/>
      <ThemedText variant="large">
        {conversationName}
      </ThemedText>
    </Pressable>
  )
}

export default ThemedConversationListItem
