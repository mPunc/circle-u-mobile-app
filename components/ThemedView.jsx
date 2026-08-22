import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ThemedView = ({ className = "", safeArea = false, ...props }) => {
  if (!safeArea) return (
    <View
      className={`flex-1 bg-lightBackground dark:bg-darkBackground ${className}`}
      {...props}
    />
  )
  
  return (
    <SafeAreaView
      className={`flex-1 bg-lightBackground dark:bg-darkBackground ${className}`}
      {...props}
    />
  )
}

export default ThemedView
