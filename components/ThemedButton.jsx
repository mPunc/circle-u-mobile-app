import { Pressable, Text } from 'react-native'

const ThemedButton = ({ label = "Button", themed = true, variant = "default", className = "", ...props }) => {
  const variantsButton = {
    default: "border-lightText dark:border-darkText bg-lightAccent dark:bg-darkAccent",
    danger: "border-lightText dark:border-darkAccent bg-danger dark:bg-danger",
  }

  const variantsText = {
    default: "text-lightText dark:text-darkText",
    danger: "text-lightText dark:text-darkAccent",
  }
  return (
    <Pressable
      className={`px-6 py-3 rounded-md border border-solid
        ${
          themed ?
          variantsButton[variant] :
          "border-primaryText bg-primary dark:bg-primary"
        }
        active:opacity-60 ${className}
      `}
      {...props}
    >
      <Text className={`text-center font-semibold text-lg
        ${
          themed ?
          variantsText[variant] :
          "text-primaryText"
        }`}>
        {label}
      </Text>
    </Pressable>
  )
}

export default ThemedButton
