import { GetUserProvider } from '@/context/globalContext';
import { Stack } from 'expo-router/stack';
import 'expo-dev-client';

export default function Layout() {
  return (
    <GetUserProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GetUserProvider>
  );
}
