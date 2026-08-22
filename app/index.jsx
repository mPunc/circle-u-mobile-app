import { Link } from 'expo-router'

// themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Home = () => {
  return (
    <ThemedView className="items-center justify-center">
      <ThemedText>
        Welcome to Circle U!
      </ThemedText>

      <Link href="/register">
        <ThemedText>
          Register
        </ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Home
