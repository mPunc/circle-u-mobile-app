
// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const Register = () => {
  return (
    <ThemedView className="items-center justify-center" safeArea>
      <ThemedText>
        Register pls
      </ThemedText>

      <Spacer/>

      <ThemedButton
        label="Register"
        themed={false}
        onPress={() => console.log("Register button pressed")}
      />
    </ThemedView>
  )
}

export default Register
