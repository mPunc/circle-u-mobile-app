import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUser } from '../hooks/useUser'

// themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import Spacer from '../components/Spacer'

const Home = () => {
  const { colorScheme, setColorScheme } = useColorScheme()

  const { logout } = useUser()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  const insets = useSafeAreaInsets()

  // Log the safe area insets to the console
  // console.log(insets);

  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedText variant="xlarge">
        Circle U
      </ThemedText>

      <Spacer />

      <ThemedButton
        label="Register"
        onPress={() => router.push("/register")}
      />

      <Spacer className="h-5" />

      <ThemedButton
        label="Login"
        onPress={() => router.push("/login")}
      />

      <Spacer className="h-5" />

      <ThemedButton
        label="Logout"
        onPress={handleLogout}
      />

      <Spacer className="h-5" />

      <ThemedButton
        label="Dashboard"
        onPress={() => router.push("/profile")}
      />

      <Spacer className="h-5" />

      {/** this breaks the safeArea and scroll, idk why, it's just for testing visuals anyways */}
      <ThemedButton
        label={`Color Scheme: ${colorScheme}`}
        onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      />

    </ThemedView>
  )
}

export default Home
