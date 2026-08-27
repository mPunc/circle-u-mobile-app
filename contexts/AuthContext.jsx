import { createContext, useState } from 'react'
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const AuthContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  async function register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user.email, "registered")
      setUser(userCredential.user)
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user.email, "logged in")
      setUser(userCredential.user)
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  async function logout() {
    
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
