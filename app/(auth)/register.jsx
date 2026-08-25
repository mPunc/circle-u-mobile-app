import { KeyboardAvoidingView, Platform } from 'react-native'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedScrollView from '../../components/ThemedScrollView'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import InputWithLabel from '../../components/wrappers/InputWithLabel'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const Register = () => {
  return (
    <ThemedView className="flex-1" safeArea>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ThemedScrollView
          className="flex-1"
          contentContainerClassName="flex-grow items-center justify-center"
        >
          <Spacer height={10}/>
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
          <Spacer height={20}/>
          <InputWithLabel
            label="Email:"
            placeholder="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
          <Spacer height={20}/>
          <InputWithLabel
            label="Password:"
            placeholder="password"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
          />

          <Spacer height={30}/>

          <ThemedButton
            label="Register"
            themed={false}
            className="max-w-80 w-80"
            onPress={() => console.log("Register button pressed")}
          />
          <Spacer height={10}/>
        </ThemedScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  )
}

export default Register
