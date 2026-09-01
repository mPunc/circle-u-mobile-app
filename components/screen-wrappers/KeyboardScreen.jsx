import { KeyboardAvoidingView, Platform } from "react-native"

// themed components
import ThemedView from "../ThemedView"
import ThemedScrollView from "../ThemedScrollView"

const KeyboardScreen = ({ contentContainerClassName = "", children }) => {
  return (
    <ThemedView className="flex-1" safeArea>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ThemedScrollView
          className="flex-1"
          contentContainerClassName={`flex-grow ${contentContainerClassName}`}
        >
          {children}
        </ThemedScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  )
}

export default KeyboardScreen
