import { TextInput } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedTextInput = ({ className = "", ...props }) => {
  return (
    <TextInput
      className={`
        rounded-md border
        border-lightIconInactive dark:border-darkIconInactive
        bg-lightSurface dark:bg-darkSurface
        text-lightText dark:text-darkText text-lg
        px-4 py-3 w-full
        focus:border-primary
        ${className}
      `}
      placeholderTextColor={Colors.neutralText}
      {...props}
    />
  )
}

export default ThemedTextInput
