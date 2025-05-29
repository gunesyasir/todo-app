import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { Colors } from '@/utils/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.tab_active_tint }}>
      <Tabs.Screen
        name="index"
        options={({ route }) => ({
          tabBarLabel: 'Upcoming',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="calendar" color={color} />,
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
