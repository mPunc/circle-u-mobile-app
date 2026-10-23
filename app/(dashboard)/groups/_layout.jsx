import { Stack } from 'expo-router'

const GroupsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="create"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default GroupsLayout
