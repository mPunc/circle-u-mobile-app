import { useState } from 'react'
import { sendMessageForGroupAsync, getMessagesForGroupAsync } from '../services/messageService'
import { useUser } from './useUser'

/**
 * Returns messaging functions and variables
 * @param {string} groupId
 */
const useMessaging = (groupId) => {
  const { user } = useUser()

  const [messageDraft, setMessageDraft] = useState("")

  async function handleSendMessage() {
    if (messageDraft.trim().length === 0) return
    const success = await sendMessageForGroupAsync(user.uid, groupId, messageDraft)
    if (success) {
      setMessageDraft("")
      refreshMessages()
    }
  }

  const [messages, setMessages] = useState(new Array)

  // adjust how messages are refreshed in the future
  async function refreshMessages() {
    const updatedMessages = await getMessagesForGroupAsync(groupId)
    setMessages(updatedMessages.reverse())
  }

  return ({
    messageDraft,
    setMessageDraft,
    handleSendMessage,
    messages,
    refreshMessages
  })
}

export default useMessaging
