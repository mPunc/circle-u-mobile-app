import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { router } from 'expo-router'

// themed components
import KeyboardScreen from '../../components/screen-wrappers/KeyboardScreen'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useUser()

  const handleSubmit = async () => {
    try {
      await login(email, password)
    } catch (error) {
      console.log("Figure out what to do here soon!")
    }
  }

  return (
    <KeyboardScreen contentContainerClassName="items-center justify-center">
      <ThemedLogo/>
      <ThemedText variant="large">
        Please log into your account
      </ThemedText>

      <Spacer className="h-8"/>

      <ThemedTextInput
        className="max-w-80"
        placeholder="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Spacer className="h-5"/>
      <ThemedTextInput
        className="max-w-80"
        placeholder="password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Spacer className="h-8"/>

      <ThemedButton
        className="w-1/2"
        label="Login"
        themed={true}
        onPress={handleSubmit}
      />
      <Spacer className="h-5"/>
      <ThemedButton
        className="w-1/2"
        label="Register here"
        themed={false}
        onPress={() => router.push("/register")}
      />
    </KeyboardScreen>
  )
}

export default Login
