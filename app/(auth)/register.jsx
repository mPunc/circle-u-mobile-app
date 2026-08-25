
// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedTextInput from '../../components/ThemedTextInput'
import Spacer from '../../components/Spacer'

const Register = () => {
  return (
    <ThemedView className="items-center justify-center" safeArea>

      <ThemedLogo/>
      <ThemedText variant="subtitle">
        Welcome to Circle U!
      </ThemedText>
      <ThemedText className="text-lg">
        Please register for an account below
      </ThemedText>

      <Spacer/>

      <ThemedTextInput
        className="max-w-80"
        placeholder="e-mail"
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
        label="Register"
        themed={false}
        onPress={() => console.log("Register button pressed")}
      />
    </ThemedView>
  )
}

export default Register
