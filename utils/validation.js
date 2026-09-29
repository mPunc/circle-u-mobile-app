// frontend validation functions

// validates email input, checks if empty, checks for "@", returns null if valid
export function validateEmail(email) {
  if (!email.trim()) return "Email is required."
  if (!email.includes("@") || email.endsWith("@") || (email.charAt(0) === "@")) return "Please enter a valid email address."
  return null
}

// validates password input, checks if empty, length > 8, returns null if valid
export function validatePassword(password) {
  if (!password) return "Please enter password."
  if (password.length < 8 ) return "Password must be at least 8 characters."
  return null
}

// validates username input, checks if empty, length > 4 and < 30, regex tests, return null if valid
export function validateUsername(username) {
  if (!username.trim()) return "Please enter username."
  if (username.length < 4 ) return "Username must be at least 4 characters long."
  if (username.length > 30 ) return "Username must be less than 31 characters long."

  const usernameRegex = /^[a-zA-Z0-9_.]+$/
  if (!usernameRegex.test(username)) return "Username can only contain letters, numbers, underscores and dots."

  const letterRegex = /[a-zA-z]/
  if (!letterRegex.test(username)) return "Username must contain at least one letter."

  const consecutiveDotsRegex = /\.{2,}/
  if (consecutiveDotsRegex.test(username)) return "Username cannot contain consecutive dots."

  return null
}
