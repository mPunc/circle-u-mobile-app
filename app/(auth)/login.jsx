import { router } from 'expo-router'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'

const Login = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedLogo/>
      <ThemedText variant="large">
        Please log into your account
      </ThemedText>

      <Spacer height={30}/>

      <ThemedTextInput
        className="max-w-80"
        placeholder="email"
        keyboardType="email-address"
      />
      <Spacer height={20}/>
      <ThemedTextInput
        className="max-w-80"
        placeholder="password"
        secureTextEntry
      />

      <Spacer height={30}/>

      <ThemedButton
        className="w-1/2"
        label="Login"
        themed={true}
        onPress={() => console.log("Login button pressed")}
      />
      <Spacer height={20}/>
      <ThemedButton
        className="w-1/2"
        label="Register here"
        themed={false}
        onPress={() => router.push("/register")}
      />
    </ThemedView>
  )
}

export default Login
