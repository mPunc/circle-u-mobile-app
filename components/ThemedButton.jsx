import { Pressable, Text } from 'react-native'

const ThemedButton = ({ label = "Button", themed = true, className = "", ...props }) => {
  return (
    <Pressable
      className={`px-6 py-3 rounded-sm border border-solid 
        ${
          themed ?
          "border-lightText dark:border-darkText bg-lightAccent dark:bg-darkAccent" :
          "border-primaryText bg-primary dark:bg-primaryAccent"
        }
        active:opacity-60 ${className}`}
      {...props}
    >
      <Text className={`text-center font-semibold text-lg
        ${
          themed ?
          "text-lightText dark:text-darkText " :
          "text-primaryText"
        }`}>
        {label}
      </Text>
    </Pressable>
  )
}

export default ThemedButton
