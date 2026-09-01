import { ScrollView } from "react-native";

const ThemedScrollView = ({ className = "", contentContainerClassName = "", ...props }) => {
  return (
    <ScrollView
      className={`bg-lightBackground dark:bg-darkBackground ${className}`}
      contentContainerClassName={`${contentContainerClassName}`}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  )
}

export default ThemedScrollView
