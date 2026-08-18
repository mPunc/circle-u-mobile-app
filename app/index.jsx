import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href="/register">Register</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})