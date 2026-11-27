
// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

// temp for testing
import ThemedButton from '../../components/ThemedButton'
import { removeUsernamesCacheAsync } from '../../lib/caching'

const Chats = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedText>Chats</ThemedText>

      <Spacer/>

      <ThemedButton
        label="Clear Usernames Cache"
        onPress={removeUsernamesCacheAsync}
      />
      
    </ThemedView>
  )
}

export default Chats
