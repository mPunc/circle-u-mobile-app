import ThemedText from "../ThemedText"
import ThemedTextInput from "../ThemedTextInput"
import ThemedView from "../ThemedView"


const InputWithLabel = ({label = "", ...props}) => {
  return (
    <ThemedView className="gap-2 w-80 flex-initial items-start justify-center">
      <ThemedText className="text-lg">
        {label}
      </ThemedText>

      <ThemedTextInput {...props}/>
    </ThemedView>
  )
}

export default InputWithLabel
