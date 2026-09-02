import { TextInput } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedTextInput = ({ className = "border-lightIconInactive dark:border-darkIconInactive focus:border-primary", ...props }) => {
  return (
    <TextInput
      className={`
        rounded-md border
        bg-lightSurface dark:bg-darkSurface
        text-lightText dark:text-darkText text-lg
        px-4 py-3 w-full
        ${className}
      `}
      placeholderTextColor={Colors.neutralText}
      {...props}
    />
  )
}

export default ThemedTextInput
