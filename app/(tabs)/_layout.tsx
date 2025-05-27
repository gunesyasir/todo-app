import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={({ route }) => ({
          tabBarLabel: 'Upcoming',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        })}
      />
      <Tabs.Screen
        name="lists"
        options={{
          tabBarLabel: 'Lists',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="bars" color={color} />,
        }}
      />
    </Tabs>
  );
}
