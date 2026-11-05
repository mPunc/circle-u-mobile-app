import { Pressable } from 'react-native'
import ThemedText from '../ThemedText'

/**
 * @typedef {Object} ConversationData
 * @property {string} id
 * @property {string} uid
 * @property {string} [name]
 * @property {string} [username]
 */
/**
 * One item row
 * @param {Object} props
 * @param {(item: Object) => void} props.onPress
 * @param {string} props.rowHeight
 * @param {string} props.conversationName
 * @param {boolean} props.selectableRows
 * @param {(item: void) => boolean} props.selectedCondition
 */
const ThemedConversationListItem = ({ onPress, rowHeight, conversationName, selectableRows, selectedCondition }) => {
  const isSelected = selectableRows ? selectedCondition() : false

  return (
    <Pressable
      onPress={(item) => onPress(item)}
      className={`
        border-t border-neutralText
        justify-center items-center
        active:bg-neutralText
        ${rowHeight}
        ${isSelected ? "bg-lightAccent dark:bg-darkAccent" : "bg-lightSurface dark:bg-darkSurface"}
      `}
    >
      <ThemedText variant="large">
        {conversationName}
      </ThemedText>
    </Pressable>
  )
}

export default ThemedConversationListItem
