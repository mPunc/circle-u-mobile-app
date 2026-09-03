import { Tabs } from 'expo-router'
import { Ionicons } from '@react-native-vector-icons/ionicons'
import { useColorScheme } from 'nativewind'
import { Colors } from '../../constants/Colors'
import { ProfileProvider } from '../../contexts/ProfileContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DashboardLayout = () => {
  const { colorScheme } = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const insets = useSafeAreaInsets()

  return (
    <ProfileProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          height: insets.bottom + 55,
          borderTopColor: theme.surface,
        },
        tabBarLabelStyle: {
          fontSize: 11
        },
        tabBarActiveBackgroundColor: theme.surface,
        tabBarInactiveBackgroundColor: theme.surface,
        tabBarActiveTintColor: theme.icon,
        tabBarInactiveTintColor: theme.iconInactive,
        tabBarBadgeStyle: {
          backgroundColor: Colors.danger,
          color: Colors.primaryLight
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={focused ? theme.icon : theme.iconInactive}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "people" : "people-outline"}
              color={focused ? theme.icon : theme.iconInactive}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? theme.icon : theme.iconInactive}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarBadge: 2,
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "notifications" : "notifications-outline"}
              color={focused ? theme.icon : theme.iconInactive}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"}
              color={focused ? theme.icon : theme.iconInactive}
              size={24}
            />
          )
        }}
      />
    </Tabs>
    </ProfileProvider>
  )
}

export default DashboardLayout
