import { Slot, Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ animation: 'none' }} >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AuthLayout
