import { ActivityIndicator } from 'react-native'

const ThemedActivityIndicator = ({className = "text-lightIcon dark:text-darkIcon", ...props}) => {
  return (
    <ActivityIndicator 
      className={className}
      size="large"
      {...props}
    />
  )
}

export default ThemedActivityIndicator
