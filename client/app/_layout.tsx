import { GetUserProvider } from '@/context/globalContext';
import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <GetUserProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GetUserProvider>
  );
}
