import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/register">Register</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})