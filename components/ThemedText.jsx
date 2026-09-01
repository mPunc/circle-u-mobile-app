import { Text } from 'react-native'

const ThemedText = ({ className = "", themed = true, variant = "default", ...props }) => {
  const variants = {
    xlarge: "text-4xl font-bold",
    title: "text-3xl font-bold",
    subtitle: "text-2xl font-semibold",
    large: "text-xl",
    default: "text-base",
    small: "text-sm"
  }

  return (
    <Text
      className={`
        ${
          themed ?
          "text-lightText dark:text-darkText bg-lightBackground dark:bg-darkBackground" :
          "text-primaryText"
        }
        ${variants[variant]}
        ${className}`}
      {...props}
    />
  )
}

export default ThemedText