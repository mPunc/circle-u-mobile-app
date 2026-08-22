import { View } from 'react-native'

const ThemedView = ({ className = "", ...props }) => {
  return (
    <View
      className={`flex-1 bg-lightBackground dark:bg-darkBackground ${className}`}
      {...props}
    />
  )
}

export default ThemedView
