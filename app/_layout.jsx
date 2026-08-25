import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// @ts-ignore: NativeWind resolves the global stylesheet at runtime.
import "../global.css"

const RootLayout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#9FF7FF' }, animation: 'none' }} >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false}} />
      </Stack>
    </>
  )
}

export default RootLayout
