import { Text } from 'react-native'

const ThemedText = ({ className = "", ...props }) => {
  return (
    <Text
      className={`text-lightText dark:text-darkText ${className}`}
      {...props}
    />
  )
}

export default ThemedText