import { View, Text } from 'react-native'
import { useState, useCallback } from 'react'
import { useUser } from '../../hooks/useUser'
import { router, useFocusEffect } from 'expo-router'

// themed components
import KeyboardScreen from '../../components/screen-wrappers/KeyboardScreen'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedActivityIndicator from '../../components/ThemedActivityIndicator'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, authError, setAuthError } = useUser()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const success = await login(email, password)
    setIsSubmitting(false)
    if (success) {
      router.replace("/(dashboard)/events")
    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setAuthError({type: null, message: ""})
      }
    }, [])
  )

  return (
    <KeyboardScreen contentContainerClassName="items-center justify-center">
      <Spacer className="h-5"/>
      <ThemedLogo/>
      <ThemedText variant="large">
        Please log into your account
      </ThemedText>

      <Spacer className="h-8"/>

      <ThemedTextInput
        className={`max-w-80
          ${authError.type === "email" || authError.type === "generic"
          ? "border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"}
        `}
        placeholder="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      {authError.type === "email" ? (
      <View className="flex-initial w-80 items-start justify-center mt-1">
        <Text className="text-danger h-6">{authError.message}</Text>
      </View>
      ) : (<Spacer className="h-4"/>)}
      <Spacer className="h-2"/>
      <ThemedTextInput
        className={`max-w-80
          ${authError.type === "password" || authError.type === "generic"
          ? "border-danger dark:border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"}
        `}
        placeholder="password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {(authError.type === "password" || authError.type === "generic") ? (
      <View className="flex-initial w-80 items-start justify-center mt-1">
        <Text className="text-danger h-6">{authError.message}</Text>
      </View>
      ) : (<Spacer className="h-7"/>)}

      <Spacer className="h-3"/>

      <ThemedButton
        className="w-1/2"
        label="Login"
        themed={true}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
      <Spacer className="h-5"/>
      <ThemedButton
        className="w-1/2"
        label="Register here"
        themed={false}
        onPress={() => router.push("/register")}
        disabled={isSubmitting}
      />
      <Spacer className="h-3"/>
      {isSubmitting
        ? <ThemedActivityIndicator/>
        : <Spacer/>
      }
      <Spacer className="h-3"/>
    </KeyboardScreen>
  )
}

export default Login
