import '../global.css';

import { Stack } from 'expo-router';

import DatabaseProvider from '@/providers/database-provider';

export default function Layout() {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DatabaseProvider>
  );
}
