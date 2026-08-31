import { createContext, useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  async function register(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  async function logout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AUTH STATE:", user?.email ?? "no user")
      setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
