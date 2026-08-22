import { View, Text, useColorScheme } from 'react-native'
import { Slot, Stack } from 'expo-router'

// @ts-ignore: NativeWind resolves the global stylesheet at runtime.
import "../global.css"

const RootLayout = () => {
  const colorScheme = useColorScheme()

  return (
    <>
      <Stack screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#9FF7FF' } }} >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
      </Stack>

      <Text>Footer</Text>
    </>
  )
}

export default RootLayout
