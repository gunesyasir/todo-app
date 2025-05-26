import '../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DatabaseProvider from '@/providers/database-provider';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <DatabaseProvider>
          <Stack initialRouteName="(splash)">
            <Stack.Screen name="(splash)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </DatabaseProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
