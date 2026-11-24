
// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

const Test1 = () => {
  return <ThemedText>
    testing text
  </ThemedText>
}

const Chats = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedText>Chats</ThemedText>

      <Spacer/>
      
      <Test1/>
    </ThemedView>
  )
}

export default Chats
