
// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedLogo from '../../components/ThemedLogo'
import Spacer from '../../components/Spacer'
import InputWithLabel from '../../components/wrappers/InputWithLabel'

const Register = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
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
          className="max-w-80"
          />
        <InputWithLabel
          label="Last Name:"
          className="max-w-80"
        />
      </ThemedView>
      <Spacer height={20}/>
      <InputWithLabel
        label="Email:"
        className="max-w-80"
        placeholder="email"
        keyboardType="email-address"
      />
      <Spacer height={20}/>
      <InputWithLabel
        label="Password:"
        className="max-w-80"
        placeholder="password"
        secureTextEntry
      />

      <Spacer height={30}/>

      <ThemedButton
        label="Register"
        themed={false}
        className="max-w-80 w-80"
        onPress={() => console.log("Register button pressed")}
      />
    </ThemedView>
  )
}

export default Register
