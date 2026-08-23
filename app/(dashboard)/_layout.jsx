import { Tabs } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons"

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          height: 70,
          backgroundColor: '#FFFFFF'
        }
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{ title: "Chats", tabBarIcon: ({ focused }) => (
          <Ionicons 
            name={focused ? "chatbubble" : "chatbubble-outline"}
            size={24}
            color="#4DF0FF"
          />
        )}}
      />
      <Tabs.Screen name="groups" />
      <Tabs.Screen name="events" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}

export default DashboardLayout
