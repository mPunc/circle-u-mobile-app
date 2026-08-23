import { Link } from 'expo-router'

// themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import Spacer from '../components/Spacer'

const Home = () => {
  return (
    <ThemedView className="items-center justify-center" safeArea>
      <ThemedText variant="xlarge">
        Circle U
      </ThemedText>

      <Spacer />

      <ThemedButton>
        <Link href="/register">
          Register
        </Link>
      </ThemedButton>

      <Spacer height={20} />

      <ThemedButton>
        <Link href="/login">
          Login
        </Link>
      </ThemedButton>

      <Spacer height={20} />

      <ThemedButton>
        <Link href="/profile">
          Dashboard
        </Link>
      </ThemedButton>

    </ThemedView>
  )
}

export default Home
