import { UserProvider } from '../contexts/AuthContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useUser } from '../hooks/useUser'
// @ts-ignore: NativeWind resolves the global stylesheet at runtime.
import "../global.css"
import LoadingScreen from '../components/screen-wrappers/LoadingScreen'

const RootLayout = () => {
  return (
    <UserProvider>
      <RootNavigation/>
    </UserProvider>
  )
}

const RootNavigation = () => {
  const { user, authChecked } = useUser()

  if (!authChecked) {
    return <LoadingScreen />
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} >
        <Stack.Screen name="index" />

        <Stack.Protected guard={!user} >
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={!!user} >
          <Stack.Screen name="(dashboard)" />
        </Stack.Protected>
      </Stack>
    </>
  )
}

export default RootLayout
