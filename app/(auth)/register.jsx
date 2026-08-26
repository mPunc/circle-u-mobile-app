import KeyboardScreen from '../../components/screen-wrappers/KeyboardScreen'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import InputWithLabel from '../../components/wrappers/InputWithLabel'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const Register = () => {
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
        />
        <InputWithLabel
          label="Last Name:"
          autoCapitalize="words"
          autoComplete="family-name"
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
      />
      <Spacer className="h-5"/>
      <InputWithLabel
        label="Password:"
        placeholder="password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
      />

      <Spacer className="h-8"/>

      <ThemedButton
        label="Register"
        themed={false}
        className="max-w-80 w-80"
        onPress={() => console.log("Register button pressed")}
      />
      <Spacer className="h-3"/>
    </KeyboardScreen>
  )
}

export default Register
