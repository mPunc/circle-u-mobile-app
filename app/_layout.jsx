import { Slot, Stack } from 'expo-router'

// @ts-ignore: NativeWind resolves the global stylesheet at runtime.
import "../global.css"

// themed components
import ThemedText from '../components/ThemedText'

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#9FF7FF' }, animation: 'none' }} >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>

      <ThemedText className="">
        Footer
      </ThemedText>
    </>
  )
}

export default RootLayout
