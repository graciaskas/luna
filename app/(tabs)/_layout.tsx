import { Tabs } from 'expo-router';
import { Calendar, Chrome as Home, Settings, ChartLine as LineChart, User, Bell } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

export default function TabLayout() {
  const { isDark } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          zIndex: 1000,
          padding: 8,
          backgroundColor: isDark ? '#404040' : '#f0f0f0',
          borderRadius: 20,
        }}
        onPress={() => router.push('/notifications')}
      >
        <Bell size={24} color={isDark ? '#fff' : '#1A1A1A'} />
      </TouchableOpacity>

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDark ? '#2D2D2D' : '#fff',
            borderTopWidth: 1,
            borderTopColor: isDark ? '#404040' : '#f0f0f0',
          },
          tabBarActiveTintColor: '#FF6B81',
          tabBarInactiveTintColor: isDark ? '#B0B0B0' : '#8E8E93',
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: 'Insights',
            tabBarIcon: ({ color, size }) => <LineChart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}