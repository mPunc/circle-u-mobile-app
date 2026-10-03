import { View, Text } from 'react-native'
import { useState, useCallback } from 'react'
import { useUser } from '../../hooks/useUser'
import { validateUsername, validateEmail, validatePassword } from '../../utils/validation'
import { router, useFocusEffect } from 'expo-router'

// themed components
import KeyboardScreen from '../../components/screen-wrappers/KeyboardScreen'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import InputWithLabel from '../../components/wrappers/InputWithLabel'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ThemedActivityIndicator from '../../components/ThemedActivityIndicator'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState("")
  const [username, setUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, authError, setAuthError } = useUser()

  const handleSubmit = async () => {
    // input validation
    const usernameError = validateUsername(username)
    if (usernameError) {
      setAuthError({type: "username", message: usernameError})
      return
    }
    const emailError = validateEmail(email)
    if (emailError) {
      setAuthError({type: "email", message: emailError})
      return
    }
    const passwordError = validatePassword(password)
    if (passwordError) {
      setAuthError({type: "password", message: passwordError})
      return
    }
    if (password !== passwordMatch) {
      setAuthError({type: "passwordRepeat", message: "Passwords must match."})
      return
    }
    // input validation passed
    setIsSubmitting(true)
    const success = await register(email.trim(), password, username.trim()) // add username here
    setIsSubmitting(false)
    if (success) router.replace("/(dashboard)/profile")
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
      <ThemedText variant="subtitle">
        Welcome to Circle U!
      </ThemedText>
      <ThemedText className="text-lg">
        Please register for an account below
      </ThemedText>

      <Spacer/>

      <InputWithLabel
        label="Username:"
        placeholder="username"
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        onChangeText={setUsername}
        value={username}
        className={authError.type === "username" || authError.type === "generic"
          ? "border-danger dark:border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        }
      />

      {authError.type === "username" ? (
      <View className="flex-initial flex-wrap w-80 items-start justify-center mt-1">
        <Text className="text-danger">{authError.message}</Text>
      </View>
      ) : (<Spacer className="h-3"/>)}

      <InputWithLabel
        label="Email:"
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        onChangeText={setEmail}
        value={email}
        className={authError.type === "email" || authError.type === "generic"
          ? "border-danger dark:border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        }
      />

      {authError.type === "email" ? (
      <View className="flex-initial flex-wrap w-80 items-start justify-center mt-1">
        <Text className="text-danger">{authError.message}</Text>
      </View>
      ) : (<Spacer className="h-3"/>)}

      <InputWithLabel
        label="Password:"
        placeholder="password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
        onChangeText={setPassword}
        value={password}
        className={authError.type === "password" || authError.type === "generic"
          ? "border-danger dark:border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        }
      />

      {(authError.type === "password") ? (
      <View className="flex-initial flex-wrap w-80 items-start justify-center mt-1">
        <Text className="text-danger">{authError.message}</Text>
      </View>
      ) : (<Spacer className="h-3"/>)}

      <InputWithLabel
        label="Repeat password:"
        placeholder="repeat password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
        onChangeText={setPasswordMatch}
        value={passwordMatch}
        className={authError.type === "passwordRepeat" || authError.type === "generic"
          ? "border-danger dark:border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        }
      />

      {(authError.type === "passwordRepeat" || authError.type === "generic") ? (
      <View className="flex-initial flex-wrap w-80 items-start justify-center mt-1">
        <Text className="text-danger h-6">{authError.message}</Text>
      </View>
      ) : (<Spacer className="h-3"/>)}

      <Spacer className="h-3"/>

      <ThemedButton
        label="Register"
        themed={false}
        className="max-w-80 w-80"
        onPress={handleSubmit}
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

export default Register
