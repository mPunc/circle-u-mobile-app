import { createContext, useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { createProfile } from '../services/profileService'

export const AuthContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState({type: null, message: ""})
  const [authChecked, setAuthChecked] = useState(false)

  async function register(email, password) {
    try {
      setAuthError({type: null, message: ""})
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await createProfile(userCredential.user.uid, {email: userCredential.user.email})
      return true
    } catch (error) {
      if (error.code === "auth/invalid-email") setAuthError({type: "email", message: "Please enter a valid email address."})
      else if (error.code === "auth/email-already-in-use") setAuthError({type: "email", message: "Email already in use."})
      else if (error.code === "auth/missing-password") setAuthError({type: "password", message: "Please enter password."})
      else if (error.code === "auth/weak-password") setAuthError({type: "password", message: "Password should be at least 6 characters."})
      else setAuthError({type: "generic", message: "Something went wrong. Please try again."})
      return false
    }
  }

  async function login(email, password) {
    try {
      setAuthError({type: null, message: ""})
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (error) {
      if (error.code === "auth/invalid-email") setAuthError({type: "email", message: "Please enter a valid email address."})
      else if (error.code === "auth/missing-password") setAuthError({type: "password", message: "Please enter password."})
      else if (error.code === "auth/invalid-credential") setAuthError({type: "generic", message: "Incorrect email or password."})
      else setAuthError({type: "generic", message: "Something went wrong. Please try again."})
      return false
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      throw error
      return false
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setAuthChecked(true)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, register, login, logout, authError, setAuthError, authChecked }}>
      {children}
    </AuthContext.Provider>
  )
}
