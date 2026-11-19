// formatter for timestamps and similar

/**
 * Returns string for messages
 * @param {import("firebase/firestore").Timestamp|null} timestamp from db
 * @param {Intl.LocalesArgument} [locale = "en-GB"]
 * @returns {string}
 */
export function formatTimestampForMessages(timestamp, locale = "en-GB") {
  // null or undefined
  if (timestamp == null) return ""
  
  const date = timestamp.toDate()
  const now = new Date()

  // check today
  if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
    return date.toLocaleString(locale, {hour: "2-digit", minute: "2-digit"})
  }

  // check yesterday
  now.setDate(now.getDate() - 1)
  if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
    return "Yesterday " + date.toLocaleString(locale, {hour: "2-digit", minute: "2-digit"})
  }

  return date.toLocaleString(locale, {weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"})
}
