import { Redirect } from 'expo-router'
import { useUser } from '../hooks/useUser'
import LoadingScreen from '../components/screen-wrappers/LoadingScreen'

const Index = () => {
  const { user, authChecked } = useUser()

  if (!authChecked) return <LoadingScreen/>

  return <Redirect href={user ? "/(dashboard)/events" : "/(auth)/login"} />
}

export default Index
