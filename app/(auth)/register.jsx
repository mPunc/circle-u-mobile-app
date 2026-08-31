import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { View, Text } from 'react-native'

// themed components
import KeyboardScreen from '../../components/screen-wrappers/KeyboardScreen'
import ThemedView from '../../components/ThemedView'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import InputWithLabel from '../../components/wrappers/InputWithLabel'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { register, authError } = useUser()

  const handleSubmit = async () => {
    await register(email, password)
  }

  return (
    <KeyboardScreen contentContainerClassName="items-center justify-center">
      <Spacer className="h-3"/>
      <ThemedLogo/>
      <ThemedText variant="subtitle">
        Welcome to Circle U!
      </ThemedText>
      <ThemedText className="text-lg">
        Please register for an account below
      </ThemedText>

      <Spacer/>

      <ThemedView className="flex-initial flex-row w-80 gap-2">
        <InputWithLabel
          label="First Name:"
          autoCapitalize="words"
          autoComplete="given-name"
          className="border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        />
        <InputWithLabel
          label="Last Name:"
          autoCapitalize="words"
          autoComplete="family-name"
          className="border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        />
      </ThemedView>

      <Spacer className="h-5"/>

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
          ? "border-danger focus:border-dangerLight"
          : "border-lightIconInactive dark:border-darkIconInactive focus:border-primary"
        }
      />
      {authError.type === "email" ? (
        <View className="flex-initial w-80 items-start justify-center mt-1">
          <Text className="text-danger h-6">{authError.message}</Text>
        </View>
      ) : (<Spacer className="h-7"/>)}
      <Spacer className="h-1"/>
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
      {(authError.type === "password" || authError.type === "generic") ? (
        <View className="flex-initial w-80 items-start justify-center mt-1">
          <Text className="text-danger h-6">{authError.message}</Text>
        </View>
      ) : (<Spacer className="h-7"/>)}

      <Spacer className="h-3"/>

      <ThemedButton
        label="Register"
        themed={false}
        className="max-w-80 w-80"
        onPress={handleSubmit}
      />
      <Spacer className="h-3"/>
    </KeyboardScreen>
  )
}

export default Register
