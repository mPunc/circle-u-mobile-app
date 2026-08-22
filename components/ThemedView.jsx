import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ThemedView = ({ className = "", safeArea = false, ...props }) => {
  const Component = safeArea ? SafeAreaView : View
  
  return (
    <Component
      className={`flex-1 bg-lightBackground dark:bg-darkBackground ${className}`}
      {...props}
    />
  )
}

export default ThemedView
