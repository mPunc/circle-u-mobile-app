import { router } from 'expo-router'
import KeyboardScreen from '../../components/screen-wrappers/KeyboardScreen'

// themed components
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'

const Login = () => {
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
      />
      <Spacer className="h-5"/>
      <ThemedTextInput
        className="max-w-80"
        placeholder="password"
        secureTextEntry
      />

      <Spacer className="h-8"/>

      <ThemedButton
        className="w-1/2"
        label="Login"
        themed={true}
        onPress={() => console.log("Login button pressed")}
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
