import { Text } from 'react-native'

const ThemedText = ({ className = "", ...props }) => {
  return (
    <Text
      className={`text-lightText dark:text-darkText bg-lightBackground dark:bg-darkBackground ${className}`}
      {...props}
    />
  )
}

export default ThemedText