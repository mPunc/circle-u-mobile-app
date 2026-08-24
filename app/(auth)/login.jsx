
// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const Login = () => {
  return (
    <ThemedView className="items-center justify-center" safeArea>
      <ThemedText>
        Login or not
      </ThemedText>

      <Spacer/>

      <ThemedButton
        label="Login"
        themed={false}
        onPress={() => console.log("Login button pressed")}
      />
    </ThemedView>
  )
}

export default Login
