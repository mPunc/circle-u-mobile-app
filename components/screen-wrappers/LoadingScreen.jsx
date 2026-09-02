import ThemedView from '../ThemedView'
import ThemedLogo from '../ThemedLogo'
import ThemedActivityIndicator from '../ThemedActivityIndicator'
import Spacer from '../Spacer'

const LoadingScreen = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center" safeArea>
      <ThemedLogo/>
      <Spacer className="h-5"/>
      <ThemedActivityIndicator/>
    </ThemedView>
  )
}

export default LoadingScreen
