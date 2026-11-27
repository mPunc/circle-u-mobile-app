import { Pressable, View } from 'react-native'
import ThemedText from '../ThemedText'
import Avatar from '../Avatar'
import { formatTimestampForMessages } from '../../utils/formatter'

/**
 * One item row
 * @param {Object} props
 * @param {(item: Object) => void} props.onPress
 * @param {import('./ConversationList').ConversationData|import("../../services/groupsService").GroupPreviewData} props.item
 * @param {"group" | "dm"} props.type
 * @param {Object.<string, import('../../lib/caching').ProfileDataCached>} props.profiles
 * @param {string} props.rowHeight
 * @param {boolean} props.selectableRows
 * @param {(item: void) => boolean} props.selectedCondition
 */
const ConversationListItem = ({ onPress, item, type, profiles, rowHeight, selectableRows, selectedCondition }) => {
  const isSelected = selectableRows ? selectedCondition() : false

  let conversationName = ""
  if (type === "group") conversationName = item.name ?? ""
  // @ts-ignore
  else if (type === "dm") conversationName = item.username ?? ""

  const avatarSize = type === "dm" ? 40 : 48

  const ActivityRow = () => {
    if (item.lastActivity == null) return <ThemedText className="w-full">Be the first to send a message!</ThemedText>
    const username = profiles[item.lastActivity.senderId]?.username ?? item.lastActivity.senderId
    if (item.lastActivity.type === "message") return (
      <View className="w-full flex-row justify-between items-center">
        <ThemedText className="w-[60%]" numberOfLines={1} ellipsizeMode="tail">{username + ": " + item.lastActivity.content}</ThemedText>
        <ThemedText className="mr-1">{formatTimestampForMessages(item.lastActivity.createdAt)}</ThemedText>
      </View>
    )
    else return (
      <ThemedText>Nema ništa, promašaj</ThemedText>
    )
  }

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
      <View className="flex-1 items-start justify-center">
        <ThemedText className="font-semibold" variant="large">{conversationName}</ThemedText>
        {type === "group" && <ActivityRow/>}
      </View>
    </Pressable>
  )
}

export default ConversationListItem
