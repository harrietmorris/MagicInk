import { GetUserProvider } from '@/context/globalContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <GetUserProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#333233',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GetUserProvider>
  );
}
